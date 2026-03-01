export type PlayerFacing = 'up' | 'down' | 'left' | 'right';

export interface IPlayer {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: PlayerFacing;
  speed: number;
  animFrame: number;
  animTimer: number;
  name: string;
  spriteKey: 'player';
}
