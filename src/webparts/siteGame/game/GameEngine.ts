import { IGameState } from './types/IGameState';
import { IInfoTarget } from './types/IInfoTarget';
import { IBuilding } from './types/IBuilding';
import { INPC, NPCFacing } from './types/INPC';
import { GameConfig } from './constants/GameConfig';
import { CollisionDetector, IAABB } from './CollisionDetector';
import { InputController } from './InputController';
import { TileRenderer } from './rendering/TileRenderer';
import { BuildingRenderer } from './rendering/BuildingRenderer';
import { CharacterRenderer } from './rendering/CharacterRenderer';
import { UIRenderer } from './rendering/UIRenderer';

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function randomBetween(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

function seededRandom(seed: number): () => number {
  let s = Math.abs(seed) || 1;
  return function (): number {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

export class GameEngine {
  private animFrameId = 0;
  private lastTimestamp = 0;
  private gameTimeMs = 0;
  private ctx: CanvasRenderingContext2D;
  private input: InputController;
  private collision: CollisionDetector;
  private tileRenderer = new TileRenderer();
  private buildingRenderer = new BuildingRenderer();
  private characterRenderer = new CharacterRenderer();
  private uiRenderer = new UIRenderer();
  private currentInfoTarget: IInfoTarget | null = null;
  private proximityTarget: IBuilding | INPC | undefined = undefined;
  private discoveredEggs = new Set<string>();
  private discoveredBuildings = new Set<string>();
  private discoveredUsers = new Set<string>();
  private discoveredM365Eggs = new Set<string>();
  private totalEggs = 0;
  private totalBuildings = 0;
  private totalUsers = 0;
  private totalM365Eggs = 0;
  private npcRngs: Map<string, () => number> = new Map();

  constructor(
    private canvas: HTMLCanvasElement,
    private state: IGameState,
    private onInfoTarget: (target: IInfoTarget | null) => void,
    private onEggDiscovered: (eggId: string, name: string) => void
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    this.ctx = ctx;
    this.input = new InputController(window);
    this.collision = new CollisionDetector(state.tileMap, GameConfig.TILE_SIZE);

    // Pre-seed per-NPC rngs
    state.npcs.forEach((npc, idx) => {
      this.npcRngs.set(npc.id, seededRandom(idx * 1337 + 42));
    });

    // Cache totals for score display
    this.totalEggs = state.npcs.filter(n => n.kind === 'easteregg').length;
    this.totalM365Eggs = state.npcs.filter(n => n.kind === 'm365egg').length;
    this.totalBuildings = state.buildings.length;
    this.totalUsers = state.npcs.filter(n => n.kind === 'user').length;
  }

  public start(): void {
    this.lastTimestamp = performance.now();
    this.animFrameId = requestAnimationFrame(this.loop);
  }

  public stop(): void {
    cancelAnimationFrame(this.animFrameId);
    // NOTE: input is NOT disposed here — keyboard listeners stay active for resume
  }

  public destroy(): void {
    cancelAnimationFrame(this.animFrameId);
    this.input.dispose();
  }

  /** Called when the InfoPanel is dismissed externally (X button / light dismiss) so
   *  the engine knows to allow re-opening the same target on next interact. */
  public clearInfoTarget(): void {
    this.currentInfoTarget = null;
  }

  public resizeViewport(w: number, h: number): void {
    this.state.camera.viewportW = w;
    this.state.camera.viewportH = h;
    this.canvas.width = w;
    this.canvas.height = h;
  }

  private loop = (timestamp: number): void => {
    const delta = Math.min(timestamp - this.lastTimestamp, GameConfig.DELTA_CAP_MS);
    this.lastTimestamp = timestamp;
    this.gameTimeMs += delta;
    this.update(delta);
    this.render();
    this.animFrameId = requestAnimationFrame(this.loop);
  };

  private update(delta: number): void {
    const input = this.input.getSnapshot();

    // ── Player movement ───────────────────────────────────────────────────────
    const p = this.state.player;
    const s = p.speed;
    const ts = GameConfig.TILE_SIZE;

    let dvx = 0;
    let dvy = 0;
    if (input.up) dvy = -1;
    else if (input.down) dvy = 1;
    if (input.left) dvx = -1;
    else if (input.right) dvx = 1;

    // Normalise diagonal
    if (dvx !== 0 && dvy !== 0) {
      const inv = 1 / Math.SQRT2;
      dvx *= inv;
      dvy *= inv;
    }

    p.vx = dvx * s;
    p.vy = dvy * s;

    if (p.vx < 0) p.facing = 'left';
    else if (p.vx > 0) p.facing = 'right';
    else if (p.vy < 0) p.facing = 'up';
    else if (p.vy > 0) p.facing = 'down';

    const hitbox: IAABB = { x: 0, y: 0, w: ts - 12, h: ts - 12 };

    // X movement
    const newX = p.x + p.vx * (delta / 1000);
    hitbox.x = newX - hitbox.w / 2;
    hitbox.y = p.y - hitbox.h / 2;
    if (!this.collision.collidesWithMap(hitbox)) {
      p.x = clamp(newX, ts, (this.state.mapCols - 1) * ts);
    } else {
      p.vx = 0;
    }

    // Y movement
    const newY = p.y + p.vy * (delta / 1000);
    hitbox.x = p.x - hitbox.w / 2;
    hitbox.y = newY - hitbox.h / 2;
    if (!this.collision.collidesWithMap(hitbox)) {
      p.y = clamp(newY, ts, (this.state.mapRows - 1) * ts);
    } else {
      p.vy = 0;
    }

    // ── NPC movement ─────────────────────────────────────────────────────────
    for (const npc of this.state.npcs) {
      if (npc.spriteKey === 'campfire') continue; // static

      const rng = this.npcRngs.get(npc.id)!;
      const distToPlayer = this.collision.distance(npc.x, npc.y, p.x, p.y);
      const nearPlayer = distToPlayer < GameConfig.PROXIMITY_RADIUS;

      if (nearPlayer) {
        // Face player
        const dx = p.x - npc.x;
        const dy = p.y - npc.y;
        npc.facing = Math.abs(dx) > Math.abs(dy)
          ? (dx > 0 ? 'right' : 'left')
          : (dy > 0 ? 'down' : 'up');
        npc.vx = 0;
        npc.vy = 0;
      } else {
        const npcSpeed = GameConfig.NPC_SPEED * npc.speedMultiplier;
        const isEasterEgg = npc.kind === 'easteregg';

        if (npc.pauseTimer > 0) {
          // ── Pausing: stay still, count down ──────────────────────────────
          npc.pauseTimer -= delta;
          npc.vx = 0;
          npc.vy = 0;
          if (npc.pauseTimer <= 0) {
            // Pause just ended — pick direction and start walking immediately
            const dirs: Array<[number, number, NPCFacing]> = isEasterEgg
              ? [
                  [-npcSpeed, 0, 'left'],
                  [npcSpeed, 0, 'right'],
                ]
              : [
                  [0, -npcSpeed, 'up'],
                  [0, npcSpeed, 'down'],
                  [-npcSpeed, 0, 'left'],
                  [npcSpeed, 0, 'right'],
                ];
            const [newVx, newVy, newFacing] = dirs[Math.floor(rng() * dirs.length)];
            npc.vx = newVx;
            npc.vy = newVy;
            npc.facing = newFacing;
            npc.walkTimer = randomBetween(rng, GameConfig.WALK_DURATION_MIN_MS, GameConfig.WALK_DURATION_MAX_MS);
          }
        } else {
          // ── Walking: count down, then enter pause ─────────────────────────
          npc.walkTimer -= delta;
          if (npc.walkTimer <= 0) {
            npc.vx = 0;
            npc.vy = 0;
            npc.walkTimer = 0;
            npc.pauseTimer = randomBetween(rng, GameConfig.PAUSE_DURATION_MIN_MS, GameConfig.PAUSE_DURATION_MAX_MS);
          }
        }

        // Apply velocity (zero while pausing, set while walking)
        const maxW = (this.state.mapCols - 1) * GameConfig.TILE_SIZE;
        const maxH = (this.state.mapRows - 1) * GameConfig.TILE_SIZE;
        const npcHitbox: IAABB = { x: npc.x + npc.vx * (delta / 1000) - 10, y: npc.y - 10, w: 20, h: 20 };
        if (!this.collision.collidesWithMap(npcHitbox)) {
          npc.x = clamp(npc.x + npc.vx * (delta / 1000), ts, maxW);
        } else {
          npc.vx = 0;
          npc.walkTimer = 0;
          npc.pauseTimer = randomBetween(rng, GameConfig.PAUSE_DURATION_MIN_MS, GameConfig.PAUSE_DURATION_MAX_MS);
        }
        const npcHitboxY: IAABB = { x: npc.x - 10, y: npc.y + npc.vy * (delta / 1000) - 10, w: 20, h: 20 };
        if (!this.collision.collidesWithMap(npcHitboxY)) {
          npc.y = clamp(npc.y + npc.vy * (delta / 1000), ts, maxH);
        } else {
          npc.vy = 0;
          npc.walkTimer = 0;
          npc.pauseTimer = randomBetween(rng, GameConfig.PAUSE_DURATION_MIN_MS, GameConfig.PAUSE_DURATION_MAX_MS);
        }
      }
    }

    // ── Camera lerp ───────────────────────────────────────────────────────────
    const cam = this.state.camera;
    const targetCamX = p.x - cam.viewportW / 2;
    const targetCamY = p.y - cam.viewportH / 2;
    const worldW = this.state.mapCols * GameConfig.TILE_SIZE;
    const worldH = this.state.mapRows * GameConfig.TILE_SIZE;
    cam.x = clamp(lerp(cam.x, targetCamX, GameConfig.CAMERA_LERP), 0, worldW - cam.viewportW);
    cam.y = clamp(lerp(cam.y, targetCamY, GameConfig.CAMERA_LERP), 0, worldH - cam.viewportH);

    // ── Proximity / interaction ───────────────────────────────────────────────
    this.checkProximity(input.interact, input.escape);
  }

  private checkProximity(interact: boolean, escape: boolean): void {
    if (escape) {
      if (this.currentInfoTarget !== null) {
        this.currentInfoTarget = null;
        this.onInfoTarget(null);
      }
      return;
    }

    // Find nearest entity within interact radius
    let nearest: IBuilding | INPC | undefined = undefined;
    let nearestDist = Infinity;
    const p = this.state.player;

    for (const b of this.state.buildings) {
      const bCx = b.x + b.width / 2;
      const bCy = b.y + b.height / 2;
      const d = this.collision.distance(p.x, p.y, bCx, bCy);
      if (d < GameConfig.PROXIMITY_RADIUS && d < nearestDist) {
        nearestDist = d;
        nearest = b;
      }
    }

    for (const npc of this.state.npcs) {
      const d = this.collision.distance(p.x, p.y, npc.x, npc.y);
      if (d < GameConfig.PROXIMITY_RADIUS && d < nearestDist) {
        nearestDist = d;
        nearest = npc;
      }
    }

    this.proximityTarget = nearest;

    if (interact && nearest !== undefined) {
      let newTarget: IInfoTarget;
      if ('listId' in nearest) {
        newTarget = { kind: 'building', data: nearest as IBuilding };
        // Record building visit for Site score
        this.discoveredBuildings.add(nearest.id);
      } else {
        const npc = nearest as INPC;
        newTarget = { kind: 'npc', data: npc };
        // Record easter egg discovery
        if (npc.kind === 'easteregg' && !this.discoveredEggs.has(npc.id)) {
          this.discoveredEggs.add(npc.id);
          this.onEggDiscovered(npc.id, npc.name);
        }
        if (npc.kind === 'm365egg' && !this.discoveredM365Eggs.has(npc.id)) {
          this.discoveredM365Eggs.add(npc.id);
          this.onEggDiscovered(npc.id, npc.name);
        }
        // Record user NPC conversation for Site score
        if (npc.kind === 'user') {
          this.discoveredUsers.add(npc.id);
        }
      }

      const prev = this.currentInfoTarget;
      const changed =
        prev === null ||
        prev.kind !== newTarget.kind ||
        prev.data.id !== newTarget.data.id;

      if (changed) {
        this.currentInfoTarget = newTarget;
        this.onInfoTarget(newTarget);
      }
    }
  }

  private render(): void {
    const { ctx, state, gameTimeMs } = this;
    const { camera, tileMap, buildings, npcs, player, mapRows, mapCols } = state;

    ctx.clearRect(0, 0, camera.viewportW, camera.viewportH);

    // Background sky colour
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, camera.viewportW, camera.viewportH);

    this.tileRenderer.render(ctx, camera, tileMap);
    this.buildingRenderer.render(ctx, camera, buildings, gameTimeMs);
    this.characterRenderer.render(ctx, camera, player, npcs, gameTimeMs);
    this.uiRenderer.render(
      ctx,
      camera,
      player,
      npcs,
      buildings,
      gameTimeMs,
      this.proximityTarget,
      this.discoveredEggs,
      this.discoveredBuildings,
      this.discoveredUsers,
      this.discoveredM365Eggs,
      this.totalEggs,
      this.totalBuildings,
      this.totalUsers,
      this.totalM365Eggs,
      gameTimeMs < GameConfig.HUD_FADE_TIME_MS,
      mapRows,
      mapCols,
      tileMap
    );
  }
}
