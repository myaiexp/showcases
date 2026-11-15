// A GridLayer subclass whose createTile() draws a <canvas> for each tile from its coords
import { GridLayer, LeafletMap, type Coords } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

/** Circles that grow with zoom, coloured from the tile's x and y. */
class CanvasCirclesGridLayer extends GridLayer {
  override createTile(coords: Coords): HTMLElement {
    const tile = document.createElement('canvas');
    // getTileSize() reads the tileSize option (a number or a Point).
    const size = this.getTileSize();
    tile.width = size.x;
    tile.height = size.y;

    const ctx = tile.getContext('2d');
    if (ctx) {
      const hue = (coords.x * 47 + coords.y * 83) % 360;
      ctx.fillStyle = `hsl(${hue} 70% 55% / 0.35)`;
      ctx.beginPath();
      ctx.arc(size.x / 2, size.y / 2, 4 + coords.z * 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = `hsl(${hue} 80% 70%)`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${coords.z}/${coords.x}/${coords.y}`, size.x / 2, size.y / 2 + 4);
    }
    return tile;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tile is a <canvas> drawn once by createTile(). Zoom: the circle radius is 4 + 8 × zoom.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [40, 10], zoom: 3 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let layer: CanvasCirclesGridLayer | undefined;
  const use = (tileSize: number): void => {
    layer?.remove();
    layer = new CanvasCirclesGridLayer({ tileSize }).addTo(map);
  };
  use(256);
  stage.select('tileSize', [128, 256].map((v) => ({ value: String(v), label: String(v) })), '256', (v) => use(Number(v)));

  if (stage.preview) {
    stage.cycle([{ run: () => map.setView([40, 10], 4) }, { run: () => map.setView([25, 80], 5) }, { run: () => map.setView([40, 10], 3) }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
