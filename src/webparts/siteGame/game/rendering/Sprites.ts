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

// ---- M365 Chilli ----
export const M365_CHILLI: DrawCommand[] = [
  // Green stalk
  { op: 'fillRect', color: '#2a8a3a', x: 14, y: 0, w: 4, h: 8 },
  // Glow
  { op: 'circle', color: 'rgba(255,100,0,0.18)', cx: 16, cy: 20, r: 14 },
  // Body
  { op: 'circle', color: '#cc2200', cx: 16, cy: 18, r: 11 },
  { op: 'fillRect', color: '#cc2200', x: 12, y: 22, w: 8, h: 6 },
  { op: 'circle', color: '#aa1800', cx: 16, cy: 28, r: 4 },
  // Face
  { op: 'circle', color: '#fff', cx: 12, cy: 16, r: 3 },
  { op: 'circle', color: '#fff', cx: 20, cy: 16, r: 3 },
  { op: 'circle', color: '#222', cx: 12, cy: 16, r: 1.5 },
  { op: 'circle', color: '#222', cx: 20, cy: 16, r: 1.5 },
  { op: 'arc', color: '#444', cx: 16, cy: 21, r: 3, start: 0.1, end: Math.PI - 0.1 },
  // M365 text
  { op: 'text', color: '#fff', text: 'M365', x: 8, y: 21, size: 6 },
];

// ---- Warrior Horse ----
export const WARRIOR_HORSE: DrawCommand[] = [
  // Body
  { op: 'fillRect', color: '#8b5e3c', x: 4, y: 14, w: 22, h: 12 },
  // Head
  { op: 'fillRect', color: '#8b5e3c', x: 2, y: 8, w: 10, h: 10 },
  // Eye
  { op: 'circle', color: '#222', cx: 5, cy: 11, r: 1.5 },
  // Mane
  { op: 'fillRect', color: '#5a2e0a', x: 4, y: 8, w: 4, h: 14 },
  // Tail
  { op: 'fillRect', color: '#5a2e0a', x: 24, y: 10, w: 4, h: 12 },
  // Legs
  { op: 'fillRect', color: '#6b4a2e', x: 6, y: 26, w: 4, h: 6 },
  { op: 'fillRect', color: '#6b4a2e', x: 12, y: 26, w: 4, h: 6 },
  { op: 'fillRect', color: '#6b4a2e', x: 18, y: 26, w: 4, h: 6 },
  // Hooves
  { op: 'fillRect', color: '#222', x: 6, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#222', x: 12, y: 30, w: 4, h: 2 },
  { op: 'fillRect', color: '#222', x: 18, y: 30, w: 4, h: 2 },
  // Armour
  { op: 'fillRect', color: '#aaa', x: 6, y: 14, w: 20, h: 8 },
  // Lance
  { op: 'fillRect', color: '#c8a040', x: 0, y: 10, w: 3, h: 20 },
  // Lance tip
  { op: 'fillRect', color: '#ddd', x: 0, y: 8, w: 3, h: 3 },
];

// ---- CLI Robot ----
export const CLI_ROBOT: DrawCommand[] = [
  // Head
  { op: 'fillRect', color: '#4a8a8a', x: 8, y: 2, w: 16, h: 14 },
  // Antenna
  { op: 'fillRect', color: '#6ababa', x: 15, y: 0, w: 3, h: 3 },
  { op: 'circle', color: '#66ffee', cx: 16, cy: 0, r: 2 },
  // Eyes (screen)
  { op: 'fillRect', color: '#001a1a', x: 10, y: 5, w: 5, h: 4 },
  { op: 'fillRect', color: '#001a1a', x: 17, y: 5, w: 5, h: 4 },
  { op: 'fillRect', color: '#00ffcc', x: 11, y: 6, w: 3, h: 2 },
  { op: 'fillRect', color: '#00ffcc', x: 18, y: 6, w: 3, h: 2 },
  // Mouth (>_ terminal)
  { op: 'fillRect', color: '#001a1a', x: 10, y: 11, w: 12, h: 4 },
  { op: 'text', color: '#00ffcc', text: '>_', x: 11, y: 14, size: 5 },
  // Body
  { op: 'fillRect', color: '#3a7a7a', x: 7, y: 16, w: 18, h: 10 },
  // CLI text on chest
  { op: 'text', color: '#fff', text: 'CLI', x: 10, y: 24, size: 7 },
  // Arms
  { op: 'fillRect', color: '#3a7a7a', x: 2, y: 16, w: 5, h: 7 },
  { op: 'fillRect', color: '#3a7a7a', x: 25, y: 16, w: 5, h: 7 },
  // Hands
  { op: 'fillRect', color: '#4a8a8a', x: 2, y: 22, w: 5, h: 3 },
  { op: 'fillRect', color: '#4a8a8a', x: 25, y: 22, w: 5, h: 3 },
  // Legs
  { op: 'fillRect', color: '#2a5a5a', x: 9, y: 26, w: 5, h: 6 },
  { op: 'fillRect', color: '#2a5a5a', x: 18, y: 26, w: 5, h: 6 },
];

// ---- Podcast Host ----
export const PODCAST_HOST: DrawCommand[] = [
  // Microphone stand
  { op: 'fillRect', color: '#888', x: 14, y: 20, w: 4, h: 8 },
  { op: 'fillRect', color: '#888', x: 10, y: 28, w: 12, h: 2 },
  // Mic head
  { op: 'circle', color: '#555', cx: 16, cy: 14, r: 8 },
  { op: 'circle', color: '#333', cx: 16, cy: 14, r: 6 },
  // Headphones
  { op: 'arc', color: '#222', cx: 16, cy: 14, r: 10, start: Math.PI, end: 0 },
  { op: 'circle', color: '#333', cx: 6, cy: 14, r: 3 },
  { op: 'circle', color: '#333', cx: 26, cy: 14, r: 3 },
  // Sound waves
  { op: 'arc', color: 'rgba(255,100,0,0.5)', cx: 16, cy: 14, r: 13, start: -0.5, end: 0.5 },
  { op: 'arc', color: 'rgba(255,100,0,0.3)', cx: 16, cy: 14, r: 16, start: -0.7, end: 0.7 },
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
  | 'm365_chilli'
  | 'warrior_horse'
  | 'cli_robot'
  | 'podcast_host'
  | 'campfire';

export const SPRITES: Record<SpriteKey, DrawCommand[]> = {
  player: PLAYER_SPRITE,
  player_walk1: PLAYER_WALK1,
  user_npc_owner: USER_NPC_OWNER,
  user_npc_member: USER_NPC_MEMBER,
  user_npc_visitor: USER_NPC_VISITOR,
  pnp_rabbit: PNP_RABBIT,
  vesa_npc: VESA_NPC,
  m365_chilli: M365_CHILLI,
  warrior_horse: WARRIOR_HORSE,
  cli_robot: CLI_ROBOT,
  podcast_host: PODCAST_HOST,
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
