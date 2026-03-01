import { IBuilding } from '../types/IBuilding';
import { ICamera } from '../types/IGameState';
import { BUILDING_CONFIG } from '../constants/BuildingTypes';

export class BuildingRenderer {
  public render(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    buildings: IBuilding[],
    gameTimeMs: number
  ): void {
    for (const b of buildings) {
      const sx = Math.round(b.x - camera.x);
      const sy = Math.round(b.y - camera.y);

      // Cull off-screen
      if (
        sx + b.width < 0 ||
        sy + b.height < 0 ||
        sx > camera.viewportW ||
        sy > camera.viewportH
      ) {
        continue;
      }

      const cfg = BUILDING_CONFIG[b.buildingType];

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(sx + 4, sy + 4, b.width, b.height);

      // Base walls
      ctx.fillStyle = cfg.baseColor;
      ctx.fillRect(sx, sy, b.width, b.height);

      // Roof strip
      ctx.fillStyle = cfg.roofColor;
      ctx.fillRect(sx, sy, b.width, 8);

      // Decorative stripe detail
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fillRect(sx + 2, sy + 8, b.width - 4, 2);

      // Door
      const doorW = 10;
      const doorH = 14;
      const doorX = sx + Math.floor((b.width - doorW) / 2);
      const doorY = sy + b.height - doorH;
      ctx.fillStyle = cfg.doorColor;
      ctx.fillRect(doorX, doorY, doorW, doorH);
      // Door knob
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(doorX + doorW - 3, doorY + doorH / 2, 2, 0, Math.PI * 2);
      ctx.fill();

      // Windows
      this.drawWindow(ctx, sx + 5, sy + 12, cfg.baseColor);
      this.drawWindow(ctx, sx + b.width - 15, sy + 12, cfg.baseColor);

      // Podcast Tower special: radio wave animation
      if (b.buildingType === 'PODCAST_TOWER' as never) {
        const alpha = 0.3 + 0.3 * Math.sin(gameTimeMs / 400);
        ctx.strokeStyle = `rgba(100,180,255,${alpha})`;
        ctx.lineWidth = 2;
        for (let i = 1; i <= 3; i++) {
          ctx.beginPath();
          ctx.arc(sx + b.width / 2, sy + 6, i * 8, -Math.PI * 0.7, -Math.PI * 0.3);
          ctx.stroke();
        }
      }

      // Clock Tower: clock face
      if (b.buildingType === 'CLOCK_TOWER' as never) {
        const cx = sx + b.width / 2;
        const cy = sy + b.height / 2 - 4;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(cx, cy, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Clock hands
        const seconds = (gameTimeMs / 1000) % 60;
        const angle = (seconds / 60) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 7, cy + Math.sin(angle) * 7);
        ctx.stroke();
      }

      // Building name label
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      const labelW = Math.min(b.name.length * 6 + 8, b.width + 10);
      const labelH = 13;
      const labelX = sx + (b.width - labelW) / 2;
      const labelY = sy - labelH - 2;
      ctx.fillRect(labelX, labelY, labelW, labelH);
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(b.name, sx + b.width / 2, sy - 5, b.width + 10);
      ctx.textAlign = 'left';
    }
  }

  private drawWindow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    bgColor: string
  ): void {
    ctx.fillStyle = '#aad4f5';
    ctx.fillRect(x, y, 10, 8);
    ctx.fillStyle = bgColor;
    ctx.fillRect(x + 4, y, 2, 8);
    ctx.fillRect(x, y + 3, 10, 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, 10, 8);
  }
}
