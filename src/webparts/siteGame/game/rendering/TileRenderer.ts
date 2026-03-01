import { IMapTile } from '../types/IMapTile';
import { ICamera } from '../types/IGameState';
import { TileType, TILE_COLORS } from '../constants/TileTypes';
import { GameConfig } from '../constants/GameConfig';

function hashTile(row: number, col: number): number {
  return ((row * 92821 + col * 6271) ^ (row * 34543)) & 0xffffff;
}

export class TileRenderer {
  public render(
    ctx: CanvasRenderingContext2D,
    camera: ICamera,
    tileMap: IMapTile[][]
  ): void {
    const ts = GameConfig.TILE_SIZE;
    const startCol = Math.max(0, Math.floor(camera.x / ts));
    const endCol = Math.min(
      (tileMap[0]?.length ?? 0) - 1,
      Math.ceil((camera.x + camera.viewportW) / ts)
    );
    const startRow = Math.max(0, Math.floor(camera.y / ts));
    const endRow = Math.min(
      tileMap.length - 1,
      Math.ceil((camera.y + camera.viewportH) / ts)
    );

    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        const tile = tileMap[r]?.[c];
        if (!tile) continue;

        let color = TILE_COLORS[tile.tileType];

        // Scatter dark grass deterministically
        if (tile.tileType === TileType.GRASS && hashTile(r, c) % 5 === 0) {
          color = TILE_COLORS[TileType.GRASS_DARK];
        }
        // Water shimmer
        if (tile.tileType === TileType.WATER && hashTile(r, c) % 7 === 0) {
          color = TILE_COLORS[TileType.WATER_DARK];
        }

        const sx = Math.round(c * ts - camera.x);
        const sy = Math.round(r * ts - camera.y);

        ctx.fillStyle = color;
        ctx.fillRect(sx, sy, ts, ts);

        // Tree tile gets drawn as a circle on top
        if (tile.tileType === TileType.TREE) {
          ctx.fillStyle = '#2d6e1a';
          ctx.beginPath();
          ctx.arc(sx + ts / 2, sy + ts / 2, ts / 2 - 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#1e5210';
          ctx.beginPath();
          ctx.arc(sx + ts / 2, sy + ts / 2, ts / 2 - 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }
}
