# Tech Spec: UFO Random NPC Abduction

**PRD:** `docs/ufo-random-npc-abduction-prd.md`
**Status:** Draft
**Date:** 2026-03-10

---

## 1. Architecture Overview

The UFO feature is a periodic transient event managed entirely within `GameEngine.ts`. It introduces:

- **New state fields** on `GameEngine` — a nullable `IUfo` object, a countdown timer, and an RNG.
- **A phase-based state machine** (`approaching → picking-up → carrying → dropping → departing → done`) that drives UFO position, NPC attachment, and cleanup within the existing `update(delta)` method.
- **A new `'ufo'` sprite** registered in `Sprites.ts` + a programmatic tractor-beam effect drawn directly on the canvas.
- **Rendering** via a new `renderUfo()` private method called at the end of `GameEngine.render()`, after `characterRenderer.render()`, so the UFO and carried NPC always appear on top.
- **A property pane toggle** (`enableUfoAbductions`) following the exact same propagation path as `enableEasterEggs` and `enableM365EasterEggs`:
  `SiteGameWebPart.ts` → `ISiteGameProps` → `SiteGame.tsx` → `GameEngine`.

No new classes or files are needed. The UFO is ~120 lines of engine logic + ~30 lines of sprite data + ~60 lines of rendering + minor wiring in the property/props chain.

---

## 2. New Types

### 2.1 `UfoPhase` (add to `src/webparts/siteGame/game/types/IUfo.ts` — new file)

```ts
export type UfoPhase =
  | 'approaching'
  | 'picking-up'
  | 'carrying'
  | 'dropping'
  | 'departing'
  | 'done';
```

### 2.2 `IUfo` (same file)

```ts
import { INPC } from './INPC';

export interface IUfo {
  x: number;                 // current world-pixel X
  y: number;                 // constant world-pixel Y (altitude)
  direction: 1 | -1;         // +1 = flying right, -1 = flying left
  phase: UfoPhase;
  targetNpc: INPC | null;    // pre-selected NPC (null = fly-over only)
  pickupX: number;           // world X where pick-up occurs (NPC's X at schedule time)
  dropX: number;             // world X of drop tile centre
  dropY: number;             // world Y of drop tile centre (ground level)
  lerpTimer: number;         // ms elapsed during pick-up / drop lerp
  npcOriginalY: number;      // NPC's Y at start of pick-up (ground position)
}
```

### 2.3 Additions to `INPC` — none

The NPC's movement is suppressed during abduction by checking if it is the `targetNpc` of the active UFO inside the existing NPC movement loop. No new fields are added to `INPC`.

---

## 3. New Constants (add to `GameConfig.ts`)

```ts
UFO_SPEED: 120,                      // px/s — ~3× NPC_SPEED
UFO_ALTITUDE_ROW: 2,                 // tile row for flight altitude (above tree border row 0)
UFO_LERP_DURATION_MS: 500,           // pick-up and drop vertical lerp time
UFO_FIRST_DELAY_MIN_MS: 30000,       // 30 s
UFO_FIRST_DELAY_MAX_MS: 60000,       // 60 s
UFO_REPEAT_DELAY_MIN_MS: 45000,      // 45 s
UFO_REPEAT_DELAY_MAX_MS: 90000,      // 90 s
UFO_DROP_MIN_TILE_DISTANCE: 5,       // minimum tile distance between pick-up and drop
```

All values are added to the existing `GameConfig` const object.

---

## 4. UFO Sprite Design

### 4.1 Sprite (`Sprites.ts`)

A `DrawCommand[]` array registered under `'ufo'`. The sprite is ~48 × 24 px (1.5 tiles wide × 0.75 tiles tall), depicting a classic retro flying saucer:

```ts
export const UFO_SPRITE: DrawCommand[] = [
  // Dome (glass bubble on top)
  { op: 'circle', color: 'rgba(180,220,255,0.7)', cx: 24, cy: 6, r: 7 },
  { op: 'circle', color: 'rgba(220,240,255,0.5)', cx: 22, cy: 4, r: 3 },  // glint

  // Body (metallic oval — built from rects for pixel-art feel)
  { op: 'fillRect', color: '#b0b0b0', x: 4,  y: 10, w: 40, h: 6 },        // main hull
  { op: 'fillRect', color: '#d0d0d0', x: 8,  y: 9,  w: 32, h: 2 },        // top highlight
  { op: 'fillRect', color: '#888888', x: 8,  y: 16, w: 32, h: 2 },        // bottom shadow
  { op: 'fillRect', color: '#909090', x: 2,  y: 11, w: 4,  h: 4 },        // left edge round
  { op: 'fillRect', color: '#909090', x: 42, y: 11, w: 4,  h: 4 },        // right edge round

  // Rim lights (coloured dots along the equator)
  { op: 'circle', color: '#ff4444', cx: 10, cy: 13, r: 1.5 },
  { op: 'circle', color: '#44ff44', cx: 18, cy: 13, r: 1.5 },
  { op: 'circle', color: '#4488ff', cx: 26, cy: 13, r: 1.5 },
  { op: 'circle', color: '#ffff44', cx: 34, cy: 13, r: 1.5 },
  { op: 'circle', color: '#ff44ff', cx: 42, cy: 13, r: 1.5 },

  // Bottom disc (darker underside)
  { op: 'fillRect', color: '#707070', x: 14, y: 18, w: 20, h: 3 },
];
```

### 4.2 SpriteKey / SPRITES registry additions

Add `'ufo'` to the `SpriteKey` union and `SPRITES` map:

```ts
// In SpriteKey union:
| 'ufo';

// In SPRITES record:
ufo: UFO_SPRITE,
```

### 4.3 Tractor Beam (programmatic, not a sprite)

The tractor beam is drawn directly on the canvas during `picking-up` and `dropping` phases. It is a semi-transparent trapezoid (narrow at UFO, widening toward ground):

```ts
// pseudocode — drawn inside renderUfo()
ctx.save();
ctx.globalAlpha = 0.25;
ctx.fillStyle = '#88ccff';
ctx.beginPath();
ctx.moveTo(ufoScreenX + 16, ufoScreenY + 21);       // top-left of beam (under UFO)
ctx.lineTo(ufoScreenX + 32, ufoScreenY + 21);       // top-right of beam
ctx.lineTo(npcScreenX + TILE_SIZE, npcScreenY + TILE_SIZE); // bottom-right at NPC feet
ctx.lineTo(npcScreenX, npcScreenY + TILE_SIZE);              // bottom-left at NPC feet
ctx.closePath();
ctx.fill();
ctx.restore();
```

---

## 5. GameEngine Changes

### 5.1 New Private Fields

```ts
private enableUfoAbductions = false;
private ufo: IUfo | null = null;
private ufoTimerMs = 0;           // countdown until next UFO spawn
private ufoRng: () => number;     // seeded RNG for UFO logic
```

`ufoRng` is initialised in the constructor with `seededRandom(777)` (arbitrary fixed seed).

### 5.2 Public Setter

```ts
public setUfoAbductions(enabled: boolean): void {
  this.enableUfoAbductions = enabled;
  if (!enabled) {
    this.ufo = null;
    this.ufoTimerMs = 0;
  } else {
    // Schedule first event
    this.ufoTimerMs = randomBetween(this.ufoRng,
      GameConfig.UFO_FIRST_DELAY_MIN_MS,
      GameConfig.UFO_FIRST_DELAY_MAX_MS);
  }
}
```

Called from `SiteGame.tsx` in the same pattern as `setSoundEnabled`.

### 5.3 Update Logic — `updateUfo(delta: number)`

A new private method called at the end of the existing `update(delta)`, after NPC movement and before camera lerp. The full state machine:

1. **No active UFO, timer counting down:**
   - Decrement `ufoTimerMs` by `delta`.
   - When it hits 0: call `spawnUfo()`.

2. **`approaching`:**
   - Move `ufo.x` by `UFO_SPEED * direction * (delta / 1000)`.
   - If the UFO's X passes `pickupX` (or there's no target NPC), transition:
     - If `targetNpc !== null` → phase = `picking-up`, reset `lerpTimer = 0`, snapshot `npcOriginalY`.
     - If `targetNpc === null` → phase = `departing`.

3. **`picking-up`:**
   - `lerpTimer += delta`. Compute `t = clamp(lerpTimer / UFO_LERP_DURATION_MS, 0, 1)`.
   - Lerp NPC's render Y from `npcOriginalY` to `ufo.y` (UFO altitude world Y).
   - NPC's world `x` tracks `ufo.x` (moves with the UFO during lift).
   - When `t >= 1` → phase = `carrying`.

4. **`carrying`:**
   - `ufo.x` continues advancing. NPC `x` = `ufo.x`, NPC render Y = `ufo.y`.
   - When `ufo.x` passes `dropX` → phase = `dropping`, reset `lerpTimer = 0`.

5. **`dropping`:**
   - `lerpTimer += delta`. `t = clamp(lerpTimer / UFO_LERP_DURATION_MS, 0, 1)`.
   - Lerp NPC Y from `ufo.y` to `dropY`.
   - NPC `x` = `dropX` (fixed while lowering).
   - When `t >= 1`:
     - Set NPC `x = dropX`, `y = dropY`, `vx = 0`, `vy = 0`, `pauseTimer = 500`.
     - Phase = `departing`.

6. **`departing`:**
   - `ufo.x` continues advancing.
   - When `ufo.x` exits map bounds → phase = `done`.

7. **`done`:**
   - Set `ufo = null`.
   - Schedule next event: `ufoTimerMs = randomBetween(UFO_REPEAT_DELAY_MIN_MS, UFO_REPEAT_DELAY_MAX_MS)`.

### 5.4 NPC Movement Suppression

Inside the existing NPC movement `for` loop, add a guard at the top:

```ts
if (this.ufo?.targetNpc === npc && this.ufo.phase !== 'approaching') continue;
```

This skips all walk/pause logic for the carried NPC. The NPC's position is directly controlled by `updateUfo`.

### 5.5 NPC Proximity Suppression

Inside `checkProximity`, skip the carried NPC so it doesn't trigger info-panel interactions while abducted:

```ts
if (this.ufo?.targetNpc === npc && this.ufo.phase !== 'approaching') continue;
```

### 5.6 `spawnUfo()` — Private Method

```
spawnUfo():
  1. Pick direction: rng() > 0.5 ? 1 : -1
  2. Compute altitudeY = UFO_ALTITUDE_ROW * TILE_SIZE + TILE_SIZE / 2
  3. Compute startX:
     - direction = 1 (right): startX = -48 (off left edge)
     - direction = -1 (left): startX = mapCols * TILE_SIZE + 48 (off right edge)
  4. Select eligible NPCs:
     - Filter state.npcs where spriteKey !== 'campfire'
     - kind is 'user' | 'easteregg' | 'm365egg' (guaranteed by type, but explicit for safety)
  5. If no eligible NPCs → targetNpc = null, pickupX = midpoint of map, dropX/dropY = 0
  6. Else:
     - Pick random NPC from eligible list
     - pickupX = npc.x
     - Find drop tile:
       a. Collect all (row, col) where tileMap[row][col].walkable === true
       b. Exclude tiles inside any building bounding box:
          for each building b: row >= b.row && row < b.row + b.heightTiles && col >= b.col && col < b.col + b.widthTiles
       c. Compute pick-up tile: pickupTileCol = floor(npc.x / TILE_SIZE), pickupTileRow = floor(npc.y / TILE_SIZE)
       d. Exclude tiles within 5 tiles (Manhattan or Euclidean, Euclidean preferred) of pick-up tile
       e. Pick random tile from remaining set
       f. dropX = col * TILE_SIZE + TILE_SIZE / 2
       g. dropY = row * TILE_SIZE + TILE_SIZE / 2
     - If direction = 1 (right) and dropX <= pickupX → swap so drop is always ahead of pickup in travel direction. If no valid tile ahead, just pick the best available.
  7. Create IUfo { x: startX, y: altitudeY, direction, phase: 'approaching', targetNpc, pickupX, dropX, dropY, lerpTimer: 0, npcOriginalY: 0 }
  8. Assign to this.ufo
```

**Important constraint:** `dropX` must be in the same travel direction from `pickupX` as the UFO is flying, so pick-up happens before drop. If no valid tile is found ahead, the UFO flies over without abducting (set `targetNpc = null`).

---

## 6. Rendering Changes

### 6.1 New Private Method: `renderUfo()`

Called at the end of `GameEngine.render()`, after `this.characterRenderer.render(...)`:

```
renderUfo():
  if (!this.ufo) return;

  const ufo = this.ufo;
  const cam = this.state.camera;
  const ts = GameConfig.TILE_SIZE;

  // UFO screen position (sprite is 48×24, centre it on ufo.x)
  const ufoSx = Math.round(ufo.x - cam.x - 24);
  const ufoSy = Math.round(ufo.y - cam.y - 12);

  // Off-screen culling (generous bounds for beam)
  if (ufoSx > cam.viewportW + 100 || ufoSx < -100) return;

  // ── Tractor beam (picking-up / dropping phases) ──
  if (ufo.targetNpc && (ufo.phase === 'picking-up' || ufo.phase === 'dropping')) {
    const npc = ufo.targetNpc;
    const npcSx = Math.round(npc.x - cam.x - ts / 2);
    const npcSy = Math.round(npc.y - cam.y - ts);

    ctx.save();
    ctx.globalAlpha = 0.22;
    ctx.fillStyle = '#88ccff';
    ctx.beginPath();
    ctx.moveTo(ufoSx + 16, ufoSy + 21);
    ctx.lineTo(ufoSx + 32, ufoSy + 21);
    ctx.lineTo(npcSx + ts, npcSy + ts);
    ctx.lineTo(npcSx, npcSy + ts);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // ── UFO sprite ──
  renderSprite(ctx, 'ufo', ufoSx, ufoSy, false);

  // ── Carried NPC (render attached beneath UFO while carrying) ──
  if (ufo.targetNpc && ufo.phase !== 'approaching' && ufo.phase !== 'done') {
    const npc = ufo.targetNpc;
    const npcSx = Math.round(npc.x - cam.x - ts / 2);
    const npcSy = Math.round(npc.y - cam.y - ts);
    const flip = npc.facing === 'left';
    renderSprite(ctx, npc.spriteKey, npcSx, npcSy, flip);
  }
```

### 6.2 CharacterRenderer — NPC Skip

In `CharacterRenderer.render()`, the carried NPC should still be rendered by `renderUfo` (on top), not by the normal NPC loop. Two options:

- **Option A (preferred):** `GameEngine` passes an `excludeNpcId` to `CharacterRenderer.render()` so it skips that NPC. This keeps rendering consistent.
- **Option B:** Let the NPC render twice (once in normal loop, once in `renderUfo`). Because the UFO renders last, the UFO layer covers the duplicate. This is simpler but slightly wasteful.

**Decision: Option A.** Add an optional `excludeNpcId?: string` parameter to `CharacterRenderer.render()`. When set, skip that NPC in the normal loop. This is a one-line change.

---

## 7. Property Pane Changes

### 7.1 `ISiteGameWebPartProps` (in `SiteGameWebPart.ts`)

Add:
```ts
enableUfoAbductions: boolean;
```

### 7.2 `ISiteGameProps` (in `ISiteGameProps.ts`)

Add:
```ts
enableUfoAbductions: boolean;
```

### 7.3 `SiteGameWebPart.ts` — `render()`

Add to the props object passed to `React.createElement(SiteGame, { ... })`:

```ts
enableUfoAbductions: this.properties.enableUfoAbductions === true,
```

(Default `false` — same pattern as `enableMusic`.)

### 7.4 `SiteGameWebPart.ts` — `getPropertyPaneConfiguration()`

Add after the `enableM365EasterEggs` toggle in the **Town Settings** group:

```ts
PropertyPaneToggle('enableUfoAbductions', {
  label: 'Enable UFO Abductions',
  onText: 'Yes',
  offText: 'No',
}),
```

### 7.5 `SiteGame.tsx` — Prop Flow to Engine

In `componentDidMount` / `initializeGame` after `engine.setSoundEnabled(...)`:

```ts
this.engine.setUfoAbductions(this.props.enableUfoAbductions);
```

In `componentDidUpdate`:

```ts
if (prevProps.enableUfoAbductions !== this.props.enableUfoAbductions) {
  this.engine?.setUfoAbductions(this.props.enableUfoAbductions);
}
```

This follows the exact same pattern as `setSoundEnabled` / `enableMusic`.

---

## 8. Step-by-Step Implementation Plan

### Step 1: Add UFO constants to `GameConfig.ts`

**File:** `src/webparts/siteGame/game/constants/GameConfig.ts`

Add 7 new entries to the `GameConfig` const object:
- `UFO_SPEED: 120`
- `UFO_ALTITUDE_ROW: 2`
- `UFO_LERP_DURATION_MS: 500`
- `UFO_FIRST_DELAY_MIN_MS: 30000`
- `UFO_FIRST_DELAY_MAX_MS: 60000`
- `UFO_REPEAT_DELAY_MIN_MS: 45000`
- `UFO_REPEAT_DELAY_MAX_MS: 90000`
- `UFO_DROP_MIN_TILE_DISTANCE: 5`

---

### Step 2: Create `IUfo.ts` types file

**File:** `src/webparts/siteGame/game/types/IUfo.ts` (new file)

Define `UfoPhase` type alias and `IUfo` interface as described in Section 2.

---

### Step 3: Add UFO sprite to `Sprites.ts`

**File:** `src/webparts/siteGame/game/rendering/Sprites.ts`

1. Add the `UFO_SPRITE: DrawCommand[]` constant (see Section 4.1).
2. Add `'ufo'` to the `SpriteKey` union type.
3. Add `ufo: UFO_SPRITE` to the `SPRITES` record.

---

### Step 4: Add `enableUfoAbductions` to the property chain

Four files, small changes each:

#### 4a. `src/webparts/siteGame/SiteGameWebPart.ts`
- Add `enableUfoAbductions: boolean` to `ISiteGameWebPartProps`.
- Add `enableUfoAbductions: this.properties.enableUfoAbductions === true` to the props object in `render()`.
- Add a `PropertyPaneToggle('enableUfoAbductions', ...)` in `getPropertyPaneConfiguration()` inside the **Town Settings** group, after the `enableM365EasterEggs` toggle.

#### 4b. `src/webparts/siteGame/components/ISiteGameProps.ts`
- Add `enableUfoAbductions: boolean` to the `ISiteGameProps` interface.

#### 4c. `src/webparts/siteGame/components/SiteGame.tsx`
- After `this.engine.setSoundEnabled(...)` in `initializeGame()`, call `this.engine.setUfoAbductions(this.props.enableUfoAbductions)`.
- Add the same call in the `handleRefresh()` method after engine setup.
- In `componentDidUpdate`, add a check: if `prevProps.enableUfoAbductions !== this.props.enableUfoAbductions`, call `this.engine?.setUfoAbductions(this.props.enableUfoAbductions)`.

---

### Step 5: Update `CharacterRenderer.render()` to accept `excludeNpcId`

**File:** `src/webparts/siteGame/game/rendering/CharacterRenderer.ts`

Change the `render()` method signature to add an optional parameter:

```ts
public render(
  ctx: CanvasRenderingContext2D,
  camera: ICamera,
  player: IPlayer,
  npcs: INPC[],
  gameTimeMs: number,
  excludeNpcId?: string
): void {
```

Inside the NPC loop, add at the top:

```ts
if (excludeNpcId && npc.id === excludeNpcId) continue;
```

---

### Step 6: Implement UFO logic in `GameEngine.ts`

**File:** `src/webparts/siteGame/game/GameEngine.ts`

#### 6a. Add imports
- Import `IUfo, UfoPhase` from `./types/IUfo`.
- Import `renderSprite` from `./rendering/Sprites` (already used by CharacterRenderer, but GameEngine may need it for `renderUfo`; check — if not already imported, add it).
- Import `TileType` from `./constants/TileTypes` (for drop-tile eligibility check if not already imported).

#### 6b. Add private fields
After the existing field declarations, add:
```ts
private enableUfoAbductions = false;
private ufo: IUfo | null = null;
private ufoTimerMs = 0;
private ufoRng = seededRandom(777);
```

#### 6c. Add `setUfoAbductions(enabled: boolean)` public method
As described in Section 5.2.

#### 6d. Add `spawnUfo()` private method
As described in Section 5.6. This method:
1. Picks a random direction.
2. Computes altitude Y.
3. Filters eligible NPCs (`spriteKey !== 'campfire'`).
4. Picks a random NPC (or sets `targetNpc = null` if none eligible).
5. Finds a valid outdoor walkable drop tile at least 5 tiles from pickup, ahead in travel direction.
6. Constructs the `IUfo` object and assigns it to `this.ufo`.

#### 6e. Add `updateUfo(delta: number)` private method
Implements the phase state machine described in Section 5.3.

#### 6f. Call `updateUfo(delta)` in `update(delta)`
Insert `if (this.enableUfoAbductions) this.updateUfo(delta);` after the NPC movement loop and before the camera lerp section.

#### 6g. Add NPC movement suppression
At the top of the NPC movement `for` loop (the `for (const npc of this.state.npcs)` block), add:
```ts
if (this.ufo?.targetNpc === npc && this.ufo.phase !== 'approaching') continue;
```

#### 6h. Add NPC proximity suppression
In `checkProximity`, inside the `for (const npc of this.state.npcs)` loop, add the same guard to skip the carried NPC.

#### 6i. Add `renderUfo()` private method
As described in Section 6.1. Uses `renderSprite` for the UFO sprite and direct canvas calls for the tractor beam.

#### 6j. Call `renderUfo()` in `render()`
After the `this.characterRenderer.render(...)` call, insert `this.renderUfo()`.

#### 6k. Pass `excludeNpcId` to `CharacterRenderer.render()`
Change the `characterRenderer.render(...)` call to pass the carried NPC's ID:

```ts
const excludeId = (this.ufo?.targetNpc && this.ufo.phase !== 'approaching')
  ? this.ufo.targetNpc.id
  : undefined;
this.characterRenderer.render(ctx, camera, player, npcs, gameTimeMs, excludeId);
```

---

### Step 7: Test

1. **Toggle off (default):** Verify no UFO appears, no timer overhead, no console errors.
2. **Toggle on:** Verify UFO spawns after 30–60 s, flies across the map, picks up an NPC, drops it at a new location, NPC resumes walking.
3. **No eligible NPCs:** Disable easter eggs + M365 eggs, set maxBots to 0. UFO should fly across without picking anyone up.
4. **Toggle off mid-flight:** UFO should vanish immediately, carried NPC should remain at its last position (or revert to ground — acceptable either way since this is an edge case).
5. **Property pane re-render:** Toggle on/off in the property pane and verify the game responds without a full page reload.
6. **Performance:** Verify no noticeable frame drops during UFO events (< 1 ms overhead in `updateUfo`).

---

## 9. Files Changed Summary

| File | Change |
|---|---|
| `src/webparts/siteGame/game/constants/GameConfig.ts` | Add 8 UFO constants |
| `src/webparts/siteGame/game/types/IUfo.ts` | **New file** — `UfoPhase`, `IUfo` |
| `src/webparts/siteGame/game/rendering/Sprites.ts` | Add `UFO_SPRITE`, update `SpriteKey`, update `SPRITES` |
| `src/webparts/siteGame/game/rendering/CharacterRenderer.ts` | Add optional `excludeNpcId` param |
| `src/webparts/siteGame/game/GameEngine.ts` | Add UFO fields, `setUfoAbductions()`, `spawnUfo()`, `updateUfo()`, `renderUfo()`, NPC skip guards |
| `src/webparts/siteGame/SiteGameWebPart.ts` | Add `enableUfoAbductions` prop + toggle |
| `src/webparts/siteGame/components/ISiteGameProps.ts` | Add `enableUfoAbductions` to interface |
| `src/webparts/siteGame/components/SiteGame.tsx` | Wire `setUfoAbductions()` calls |

---

## 10. Assumptions

- The `renderSprite` function from `Sprites.ts` can be imported directly into `GameEngine.ts` for rendering the UFO and carried NPC. (It is already a plain exported function.)
- The seeded RNG (`seededRandom`) already exists as a private function in `GameEngine.ts` and can be reused for UFO randomization.
- Buildings expose `row`, `col`, `widthTiles`, `heightTiles` on `IBuilding`, which is sufficient for the bounding-box exclusion when finding drop tiles.
- The `ufo.y` world position is constant for the entire flight (same altitude). The visual interest comes from the NPC vertical lerp, not from UFO altitude changes.
- When the feature is toggled off mid-flight, the carried NPC is left at whatever position it was at. The NPC movement loop will resume it naturally on the next tick.
