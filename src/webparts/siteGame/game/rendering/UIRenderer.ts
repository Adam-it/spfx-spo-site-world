import { IPlayer } from '../types/IPlayer';
import { INPC } from '../types/INPC';
import { IBuilding } from '../types/IBuilding';
import { ICamera } from '../types/IGameState';
import { GameConfig } from '../constants/GameConfig';

export class UIRenderer {
  public render(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    player: IPlayer,
    npcs: INPC[],
    buildings: IBuilding[],
    gameTimeMs: number,
    proximityTarget: IBuilding | INPC | undefined,
    discoveredEggs: Set<string>,
    showHints: boolean,
    mapRows: number,
    mapCols: number,
    tileMap: { walkable: boolean }[][]
  ): void {
    this.renderMinimap(ctx, camera, player, npcs, buildings, discoveredEggs, mapRows, mapCols, tileMap);
    if (proximityTarget !== undefined) {
      this.renderProximityHint(ctx, camera, proximityTarget, gameTimeMs);
    }
    if (showHints) {
      this.renderControlHints(ctx, camera.viewportW, camera.viewportH, gameTimeMs);
    }
  }

  private renderMinimap(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    player: IPlayer,
    npcs: INPC[],
    buildings: IBuilding[],
    discoveredEggs: Set<string>,
    mapRows: number,
    mapCols: number,
    tileMap: { walkable: boolean }[][]
  ): void {
    const ts = GameConfig.TILE_SIZE;
    const scale = GameConfig.MINIMAP_SCALE;
    const mmW = Math.round(mapCols * ts * scale);
    const mmH = Math.round(mapRows * ts * scale);
    const mmX = camera.viewportW - mmW - 10;
    const mmY = 10;

    // Background
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(mmX - 2, mmY - 2, mmW + 4, mmH + 4);

    // Walkable tiles
    for (let r = 0; r < tileMap.length; r++) {
      for (let c = 0; c < (tileMap[r]?.length ?? 0); c++) {
        const tile = tileMap[r][c];
        ctx.fillStyle = tile.walkable ? 'rgba(120,180,80,0.4)' : 'rgba(80,60,40,0.6)';
        ctx.fillRect(
          mmX + Math.round(c * ts * scale),
          mmY + Math.round(r * ts * scale),
          Math.max(1, Math.round(ts * scale)),
          Math.max(1, Math.round(ts * scale))
        );
      }
    }

    // Buildings
    for (const b of buildings) {
      ctx.fillStyle = 'rgba(200,160,80,0.85)';
      ctx.fillRect(
        mmX + Math.round(b.x * scale),
        mmY + Math.round(b.y * scale),
        Math.max(2, Math.round(b.width * scale)),
        Math.max(2, Math.round(b.height * scale))
      );
    }

    // NPCs
    for (const npc of npcs) {
      const dotColor =
        npc.kind === 'easteregg'
          ? discoveredEggs.has(npc.id)
            ? '#ffd700'
            : '#888'
          : npc.groupColor || '#44aaff';
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(
        mmX + Math.round(npc.x * scale),
        mmY + Math.round(npc.y * scale),
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Player dot
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(
      mmX + Math.round(player.x * scale),
      mmY + Math.round(player.y * scale),
      3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Viewport rect
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(
      mmX + Math.round(camera.x * scale),
      mmY + Math.round(camera.y * scale),
      Math.round(camera.viewportW * scale),
      Math.round(camera.viewportH * scale)
    );
  }

  private renderProximityHint(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    target: IBuilding | INPC,
    gameTimeMs: number
  ): void {
    const alpha = 0.6 + 0.4 * Math.sin(gameTimeMs / 300);
    const text =
      'listId' in target
        ? `Press [E] to enter ${(target as IBuilding).name}`
        : `Press [E] to talk to ${(target as INPC).name}`;

    const bw = text.length * 7 + 20;
    const bh = 22;
    const bx = (camera.viewportW - bw) / 2;
    const by = camera.viewportH - 60;

    ctx.fillStyle = `rgba(0,0,0,${alpha * 0.75})`;
    ctx.beginPath();
    ctx.roundRect(bx, by, bw, bh, 6);
    ctx.fill();

    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, camera.viewportW / 2, by + 15);
    ctx.textAlign = 'left';
  }

  private renderControlHints(
    ctx: CanvasRenderingContext2D,
    vpW: number,
    vpH: number,
    gameTimeMs: number
  ): void {
    const fadeMs = GameConfig.HUD_FADE_TIME_MS;
    const alpha = Math.max(0, 1 - gameTimeMs / fadeMs);
    if (alpha <= 0) return;

    ctx.fillStyle = `rgba(0,0,0,${alpha * 0.6})`;
    ctx.fillRect(10, vpH - 38, 220, 28);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.font = '10px sans-serif';
    ctx.fillText('WASD / Arrow keys: Move   E / Enter: Interact', 16, vpH - 20);
  }

}
