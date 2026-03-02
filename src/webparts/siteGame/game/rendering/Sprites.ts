// All sprites are drawn programmatically via DrawCommand arrays.
// No external images required.

export type DrawCommand =
  | { op: 'fillRect'; color: string; x: number; y: number; w: number; h: number }
  | { op: 'circle'; color: string; cx: number; cy: number; r: number }
  | { op: 'text'; color: string; text: string; x: number; y: number; size: number; font?: string }
  | { op: 'arc'; color: string; cx: number; cy: number; r: number; start: number; end: number };

// T = tile size (scaled); all coordinates are fractions of 1 tile unit
// Actual sizes will be multiplied by TILE_SIZE at render time

// ---- Player ----
// A simple pixel-art character: hat, head, body, legs, arms
export const PLAYER_SPRITE: DrawCommand[] = [
  // Hat
  { op: 'fillRect', color: '#2255aa', x: 10, y: 2, w: 12, h: 4 },
  // Head
  { op: 'circle', color: '#f5c29a', cx: 16, cy: 11, r: 7 },
  // Eyes
  { op: 'circle', color: '#222', cx: 13, cy: 10, r: 1.5 },
  { op: 'circle', color: '#222', cx: 19, cy: 10, r: 1.5 },
  // Body
  { op: 'fillRect', color: '#2255aa', x: 9, y: 18, w: 14, h: 8 },
  // Arms
  { op: 'fillRect', color: '#2255aa', x: 4, y: 18, w: 5, h: 6 },
  { op: 'fillRect', color: '#2255aa', x: 23, y: 18, w: 5, h: 6 },
  // Hands
  { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
  // Legs
  { op: 'fillRect', color: '#334466', x: 9, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#334466', x: 17, y: 26, w: 6, h: 6 },
];

// Leg walk animation frame 1 (legs spread) — override leg rects
export const PLAYER_WALK1: DrawCommand[] = [
  ...PLAYER_SPRITE.slice(0, 9),
  { op: 'fillRect', color: '#334466', x: 7, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#334466', x: 19, y: 26, w: 6, h: 6 },
];

// ---- User NPC variants ----
function makeUserNPC(bodyColor: string, hatColor: string): DrawCommand[] {
  return [
    { op: 'fillRect', color: hatColor, x: 10, y: 2, w: 12, h: 4 },
    { op: 'circle', color: '#f5c29a', cx: 16, cy: 11, r: 7 },
    { op: 'circle', color: '#222', cx: 13, cy: 10, r: 1.5 },
    { op: 'circle', color: '#222', cx: 19, cy: 10, r: 1.5 },
    { op: 'fillRect', color: bodyColor, x: 9, y: 18, w: 14, h: 8 },
    { op: 'fillRect', color: bodyColor, x: 4, y: 18, w: 5, h: 6 },
    { op: 'fillRect', color: bodyColor, x: 23, y: 18, w: 5, h: 6 },
    { op: 'circle', color: '#f5c29a', cx: 6, cy: 25, r: 3 },
    { op: 'circle', color: '#f5c29a', cx: 26, cy: 25, r: 3 },
    { op: 'fillRect', color: '#334466', x: 9, y: 26, w: 6, h: 6 },
    { op: 'fillRect', color: '#334466', x: 17, y: 26, w: 6, h: 6 },
  ];
}

export const USER_NPC_OWNER: DrawCommand[] = makeUserNPC('#c8960a', '#8b6500');
export const USER_NPC_MEMBER: DrawCommand[] = makeUserNPC('#1a5faa', '#0e3d77');
export const USER_NPC_VISITOR: DrawCommand[] = makeUserNPC('#2a8a3a', '#1a5a24');

// ---- PnP Rabbit (PnPjs mascot) ----
export const PNP_RABBIT: DrawCommand[] = [
  // Ears
  { op: 'fillRect', color: '#fff', x: 10, y: 0, w: 5, h: 12 },
  { op: 'fillRect', color: '#fff', x: 17, y: 0, w: 5, h: 12 },
  { op: 'fillRect', color: '#ffaabb', x: 11, y: 1, w: 3, h: 9 },
  { op: 'fillRect', color: '#ffaabb', x: 18, y: 1, w: 3, h: 9 },
  // Head
  { op: 'circle', color: '#fff', cx: 16, cy: 16, r: 9 },
  // Eyes
  { op: 'circle', color: '#cc3366', cx: 12, cy: 14, r: 2 },
  { op: 'circle', color: '#cc3366', cx: 20, cy: 14, r: 2 },
  // Nose
  { op: 'circle', color: '#ff88aa', cx: 16, cy: 18, r: 1.5 },
  // Body
  { op: 'circle', color: '#fff', cx: 16, cy: 26, r: 6 },
  // PnP text on chest
  { op: 'text', color: '#cc3366', text: 'PnP', x: 11, y: 29, size: 6 },
];

// ---- Vesa NPC ----
export const VESA_NPC: DrawCommand[] = [
  // Hair
  { op: 'fillRect', color: '#7a6040', x: 9, y: 2, w: 14, h: 5 },
  // Head
  { op: 'circle', color: '#f0c898', cx: 16, cy: 11, r: 7 },
  // Beard
  { op: 'fillRect', color: '#8a7050', x: 12, y: 15, w: 8, h: 3 },
  // Eyes
  { op: 'circle', color: '#333', cx: 13, cy: 10, r: 1.5 },
  { op: 'circle', color: '#333', cx: 19, cy: 10, r: 1.5 },
  // Smile
  { op: 'arc', color: '#8a5030', cx: 16, cy: 14, r: 3, start: 0.1, end: Math.PI - 0.1 },
  // Body (Microsoft blue)
  { op: 'fillRect', color: '#0078d4', x: 9, y: 18, w: 14, h: 8 },
  // Arms
  { op: 'fillRect', color: '#0078d4', x: 4, y: 18, w: 5, h: 6 },
  { op: 'fillRect', color: '#0078d4', x: 23, y: 18, w: 5, h: 6 },
  // Hands
  { op: 'circle', color: '#f0c898', cx: 6, cy: 25, r: 3 },
  { op: 'circle', color: '#f0c898', cx: 26, cy: 25, r: 3 },
  // Scroll in right hand
  { op: 'fillRect', color: '#f5e8c0', x: 24, y: 22, w: 4, h: 5 },
  // Star badge
  { op: 'text', color: '#ffd700', text: '★', x: 13, y: 25, size: 8 },
  // Legs
  { op: 'fillRect', color: '#334466', x: 9, y: 26, w: 6, h: 6 },
  { op: 'fillRect', color: '#334466', x: 17, y: 26, w: 6, h: 6 },
];

// ---- Horse (natural bay, no armour) ----
export const WARRIOR_HORSE: DrawCommand[] = [
  // ── Tail (flowing black) ──
  { op: 'fillRect', color: '#1c0e04', x: 25, y: 11, w: 4, h: 17 },
  { op: 'fillRect', color: '#2c1808', x: 26, y: 13, w: 3, h: 13 },
  { op: 'fillRect', color: '#3c2810', x: 27, y: 17, w: 2, h: 7 },
  // ── Body (chestnut bay) ──
  { op: 'circle', color: '#a05020', cx: 20, cy: 18, r: 7 },
  { op: 'circle', color: '#9a4c1c', cx: 10, cy: 19, r: 6 },
  { op: 'fillRect', color: '#a05020', x: 10, y: 11, w: 11, h: 13 },
  // Belly shading
  { op: 'fillRect', color: '#7a3c14', x: 11, y: 21, w: 10, h: 3 },
  // ── Neck ──
  { op: 'fillRect', color: '#9a4c1c', x: 6, y: 8, w: 6, h: 12 },
  { op: 'circle', color: '#9a4c1c', cx: 9, cy: 10, r: 4 },
  // ── Head ──
  { op: 'fillRect', color: '#9a4c1c', x: 1, y: 5, w: 10, h: 9 },
  // Muzzle
  { op: 'fillRect', color: '#7a3c14', x: 0, y: 9, w: 6, h: 7 },
  // Nostril
  { op: 'circle', color: '#2a1408', cx: 2, cy: 14, r: 1.2 },
  // Mouth line
  { op: 'fillRect', color: '#5a2c0a', x: 1, y: 15, w: 4, h: 1 },
  // Eye with glint
  { op: 'circle', color: '#151510', cx: 8, cy: 7, r: 2.5 },
  { op: 'circle', color: '#fff', cx: 9, cy: 6, r: 0.9 },
  // Ear
  { op: 'fillRect', color: '#9a4c1c', x: 9, y: 2, w: 2, h: 5 },
  { op: 'fillRect', color: '#d09090', x: 10, y: 3, w: 1, h: 3 },
  // White star on forehead
  { op: 'circle', color: '#e8e0d8', cx: 5, cy: 7, r: 1.5 },
  // ── Mane (black, flowing) ──
  { op: 'fillRect', color: '#1c0e04', x: 6, y: 4, w: 3, h: 15 },
  { op: 'fillRect', color: '#2c1808', x: 7, y: 6, w: 2, h: 10 },
  // ── Legs ──
  // Front pair
  { op: 'fillRect', color: '#8a3c14', x: 8,  y: 24, w: 4, h: 8 },
  { op: 'fillRect', color: '#8a3c14', x: 13, y: 24, w: 4, h: 8 },
  // Back pair
  { op: 'fillRect', color: '#7a3010', x: 19, y: 24, w: 4, h: 7 },
  { op: 'fillRect', color: '#7a3010', x: 23, y: 24, w: 3, h: 6 },
  // Cannon-bone darkening
  { op: 'fillRect', color: '#2c1408', x: 8,  y: 27, w: 4, h: 5 },
  { op: 'fillRect', color: '#2c1408', x: 13, y: 27, w: 4, h: 5 },
  { op: 'fillRect', color: '#2c1408', x: 19, y: 27, w: 4, h: 4 },
  { op: 'fillRect', color: '#2c1408', x: 23, y: 27, w: 3, h: 3 },
  // Hooves
  { op: 'fillRect', color: '#0c0804', x: 8,  y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#0c0804', x: 13, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#0c0804', x: 19, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#0c0804', x: 23, y: 29, w: 3, h: 2 },
];

// ---- Campfire ----
export const CAMPFIRE: DrawCommand[] = [
  // Logs
  { op: 'fillRect', color: '#6b4020', x: 8, y: 22, w: 16, h: 4 },
  { op: 'fillRect', color: '#5a3010', x: 6, y: 24, w: 20, h: 3 },
  // Inner flame (orange/yellow)
  { op: 'circle', color: 'rgba(255,180,0,0.9)', cx: 16, cy: 20, r: 8 },
  { op: 'circle', color: 'rgba(255,100,0,0.8)', cx: 16, cy: 18, r: 6 },
  { op: 'circle', color: 'rgba(255,240,0,0.95)', cx: 16, cy: 16, r: 4 },
  { op: 'circle', color: '#fff', cx: 16, cy: 15, r: 2 },
  // Ember sparks
  { op: 'circle', color: '#ff8800', cx: 11, cy: 12, r: 1 },
  { op: 'circle', color: '#ffcc00', cx: 21, cy: 10, r: 1 },
  { op: 'circle', color: '#ff4400', cx: 14, cy: 8, r: 1 },
];

export type SpriteKey =
  | 'player'
  | 'player_walk1'
  | 'user_npc_owner'
  | 'user_npc_member'
  | 'user_npc_visitor'
  | 'pnp_rabbit'
  | 'vesa_npc'
  | 'warrior_horse'
  | 'campfire';

export const SPRITES: Record<SpriteKey, DrawCommand[]> = {
  player: PLAYER_SPRITE,
  player_walk1: PLAYER_WALK1,
  user_npc_owner: USER_NPC_OWNER,
  user_npc_member: USER_NPC_MEMBER,
  user_npc_visitor: USER_NPC_VISITOR,
  pnp_rabbit: PNP_RABBIT,
  vesa_npc: VESA_NPC,
  warrior_horse: WARRIOR_HORSE,
  campfire: CAMPFIRE,
};

export function renderSprite(
  ctx: CanvasRenderingContext2D,
  key: string,
  worldX: number,
  worldY: number,
  flip = false,
  scale = 1
): void {
  const commands = SPRITES[key as SpriteKey];
  if (!commands) return;

  ctx.save();
  ctx.translate(Math.round(worldX), Math.round(worldY));
  if (flip) {
    ctx.scale(-1, 1);
    ctx.translate(-32 * scale, 0);
  }
  if (scale !== 1) ctx.scale(scale, scale);

  for (const cmd of commands) {
    if (cmd.op === 'fillRect') {
      ctx.fillStyle = cmd.color;
      ctx.fillRect(cmd.x, cmd.y, cmd.w, cmd.h);
    } else if (cmd.op === 'circle') {
      ctx.beginPath();
      ctx.arc(cmd.cx, cmd.cy, cmd.r, 0, Math.PI * 2);
      ctx.fillStyle = cmd.color;
      ctx.fill();
    } else if (cmd.op === 'text') {
      ctx.fillStyle = cmd.color;
      ctx.font = `bold ${cmd.size}px monospace`;
      ctx.fillText(cmd.text, cmd.x, cmd.y);
    } else if (cmd.op === 'arc') {
      ctx.beginPath();
      ctx.arc(cmd.cx, cmd.cy, cmd.r, cmd.start, cmd.end);
      ctx.strokeStyle = cmd.color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
  ctx.restore();
}
