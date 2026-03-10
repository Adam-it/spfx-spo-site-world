# PRD: UFO Random NPC Abduction

## 1. Overview

A UFO periodically flies across the game map, picks up a random NPC character (never the player), carries them through the sky, and drops them at a new walkable outdoor location. The feature adds a fun, unpredictable element to the game world that rewards observation and keeps the map feeling dynamic.

The UFO event is controlled by a new **Enable UFO Abductions** toggle in the web part property pane. It is **OFF by default**.

---

## 2. User Stories

### US-1: Witness a UFO fly-by
**As a** player,
**I want** to occasionally see a UFO fly across the visible game world,
**so that** the game feels alive and surprising.

#### Acceptance Criteria
- A UFO sprite appears at one edge of the full map and travels in a straight horizontal line across the entire map width at a constant altitude (sky-level, above buildings and NPCs).
- The UFO is drawn on top of all other game elements (tiles, buildings, NPCs, player).
- The UFO has a retro pixel-art style consistent with the existing `DrawCommand[]` sprite system (no external images).
- The UFO movement is smooth (interpolated per tick, not tile-snapping).
- A subtle tractor-beam glow or shadow is rendered beneath the UFO while it is carrying an NPC.

---

### US-2: NPC gets abducted
**As a** player,
**I want** to see the UFO pick up a random NPC from the ground,
**so that** I notice emergent, entertaining interactions in the game world.

#### Acceptance Criteria
- When the UFO reaches a position directly above a randomly pre-selected NPC, the NPC visually rises from the ground into the UFO (vertical lerp over ~0.5 s).
- Only NPCs are eligible for abduction — the **player character is never abducted**.
- NPCs of any kind (`user`, `easteregg`, `m365egg`) may be abducted.
- Static/non-walking NPCs (e.g. `campfire`) are excluded from the eligible pool.
- While an NPC is being carried, they are rendered attached beneath the UFO sprite (slightly below), travelling with it.
- A carried NPC does not participate in normal NPC movement logic, proximity detection, or info-panel interactions until dropped.

---

### US-3: NPC gets dropped at a new location
**As a** player,
**I want** the abducted NPC to be dropped at a different valid outdoor location,
**so that** the game map layout shifts over time.

#### Acceptance Criteria
- The UFO selects a random **walkable tile that is not inside a building** as the drop target. Eligible tile types: `GRASS`, `GRASS_DARK`, `PATH`, `PATH_EDGE`, `PLAZA`.
- The drop location must be at least **5 tiles** away from the pick-up location to make the relocation noticeable.
- When the UFO reaches the drop point's X coordinate, the NPC is lowered from the UFO to the ground (vertical lerp over ~0.5 s).
- After being dropped, the NPC resumes normal behaviour (walking, facing, interaction) at their new position.
- The NPC's `x` and `y` are updated to the drop tile's world-pixel centre.
- The UFO continues flying off-screen after the drop and is then cleaned up.

---

### US-4: Configure UFO feature via property pane
**As a** site owner / web part editor,
**I want** a toggle in the property pane to enable or disable UFO abductions,
**so that** I can control whether this effect appears on my site.

#### Acceptance Criteria
- A new `PropertyPaneToggle` labelled **"Enable UFO Abductions"** is added to the **Town Settings** group in the property pane, below the existing "Enable Microsoft 365 Easter Eggs" toggle.
- The toggle maps to a new web part property `enableUfoAbductions` (type `boolean`).
- Default value is `false` (OFF).
- Toggling the property re-renders the game; no page reload is required.
- When disabled, no UFO events are scheduled or rendered.
- The toggle label uses `onText: 'Yes'` / `offText: 'No'` to match existing toggles.

---

### US-5: UFO events repeat on a timer
**As a** player,
**I want** UFO abductions to happen periodically (not just once),
**so that** the feature stays entertaining over a longer play session.

#### Acceptance Criteria
- After the feature is enabled, the first UFO event fires after a random delay between **30–60 seconds** of game time.
- Subsequent UFO events fire every **45–90 seconds** (randomised per cycle).
- Only one UFO is active at any given time; a new event is not scheduled until the current one finishes.
- If no eligible NPC can be found (e.g. all are static), the UFO simply flies across without abducting anyone.
- The timer resets when the feature is toggled off and back on.

---

## 3. Functional Requirements

### FR-1: UFO Entity & Lifecycle
| Aspect | Detail |
|---|---|
| **Spawn edge** | Left or right map edge (random). Y position is a constant altitude band: row 1–3 (above tree border) in world pixels. |
| **Travel speed** | ~120 px/s (roughly 3× NPC speed of 40 px/s), tuneable via a constant `UFO_SPEED`. |
| **Direction** | Horizontal only. If spawn is left, fly right; if right, fly left. |
| **Phases** | `approaching` → `picking-up` → `carrying` → `dropping` → `departing` → `done` |
| **Pick-up duration** | ~500 ms vertical lerp of NPC from ground to UFO altitude. |
| **Drop duration** | ~500 ms vertical lerp of NPC from UFO altitude to ground. |
| **Cleanup** | Entity is removed from the update loop once it exits the opposite map edge. |

### FR-2: NPC Selection
- When a UFO event is scheduled, a target NPC is pre-selected randomly from `state.npcs` where:
  - `npc.spriteKey !== 'campfire'` (not static)
  - The NPC kind is `'user'`, `'easteregg'`, or `'m365egg'`
- The pick-up X coordinate is the NPC's current X position at the moment the UFO's X reaches it (NPC may have moved slightly; use their position at intercept time).

### FR-3: Drop Location Selection
- Scan `state.tileMap` for tiles where `tile.walkable === true`.
- Exclude any tile whose (row, col) falls within the bounding box of any building in `state.buildings`.
- From the remaining set, exclude tiles within 5 tiles of the pick-up tile.
- Select one at random; convert (row, col) to world pixel coordinates using `col * TILE_SIZE + TILE_SIZE / 2` (centred).

### FR-4: UFO Sprite
- Defined as a `DrawCommand[]` array in `Sprites.ts`, registered under the key `'ufo'`.
- The sprite should depict a classic retro flying saucer: oval metallic body, dome on top, coloured lights along the rim.
- Size: approximately 48×24 px (1.5 tiles wide × 0.75 tiles tall) to be visually distinct but not overwhelming.
- A tractor-beam effect (semi-transparent triangle or gradient beneath the UFO) is drawn only during `picking-up` and `dropping` phases.

### FR-5: Rendering Order
- The UFO and any carried NPC are rendered **after** all other entities in `CharacterRenderer.render()` (or a dedicated `UfoRenderer`) so they appear above everything else.
- The tractor beam is rendered between the UFO body and the NPC being lifted/lowered.

### FR-6: Property Propagation
- `enableUfoAbductions` flows through the same path as existing toggles:
  `SiteGameWebPart.ts` → `ISiteGameProps` → `SiteGame.tsx` → `GameEngine` (or via `IBuildWorldOptions` / a separate config object).

### FR-7: Sound (Optional Enhancement)
- If the `SoundEngine` is enabled, a short sci-fi "whoosh" or hum can play when the UFO enters the viewport. This is a nice-to-have and not required for the initial implementation.

---

## 4. Non-Functional Requirements

| ID | Requirement |
|---|---|
| **NFR-1** | The UFO update logic must complete within **1 ms per tick** to avoid frame drops (game targets 60 fps). |
| **NFR-2** | No external image assets; the UFO sprite must use the existing `DrawCommand[]` system. |
| **NFR-3** | The feature must not affect game performance when disabled (`enableUfoAbductions === false`); zero per-tick cost. |
| **NFR-4** | The UFO feature must work with all existing game themes (`village`, `space`, `retro2013`, `bigcity`). The sprite colours may optionally adapt to the theme palette. |
| **NFR-5** | The UFO state must be self-contained and not mutate unrelated game state beyond the carried NPC's position and movement flags. |
| **NFR-6** | The implementation should follow the existing architecture: constants in `GameConfig.ts`, types in `types/`, rendering in `rendering/`, engine logic in `GameEngine.ts`. |

---

## 5. Out of Scope

- **Player abduction** — the player is never affected by the UFO.
- **Multiple simultaneous UFOs** — only one UFO can be active at a time.
- **UFO interactions** — the player cannot interact with, shoot at, or otherwise engage the UFO.
- **Persistent relocation** — NPC positions are not saved between page loads; the game regenerates the map fresh each time.
- **UFO as a separate NPC kind** — the UFO is a transient event entity, not a permanent NPC.
- **Mobile / touch-specific handling** — follows the same input model as the rest of the game.
- **Abduction animation particles or screen shake** — keep the visual simple and retro-consistent.
- **Configurable timing / speed sliders** — the initial implementation uses fixed constants; tuning can come later.
