// A GridLayer of <div> tiles that print their coords: the way to see how tile coordinates work
import { GridLayer, LeafletMap, Point, type Coords } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

class DebugCoordsGridLayer extends GridLayer {
  override createTile(coords: Coords): HTMLElement {
    const tile = document.createElement('div');
    tile.textContent = [coords.x, coords.y, coords.z].join(', ');
    tile.style.outline = '1px solid red';
    tile.style.color = '#fff';
    tile.style.font = '14px sans-serif';
    tile.style.padding = '4px';
    return tile;
  }
}

type Size = '256' | '128' | 'wide';
const SIZES: Record<Size, { label: string; tileSize: number | Point }> = {
  '256': { label: 'tileSize 256 (default)', tileSize: 256 },
  '128': { label: 'tileSize 128', tileSize: 128 },
  wide: { label: 'tileSize Point(300, 120)', tileSize: new Point(300, 120) },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tile reads "x, y, z". Pan: y grows downward, x to the right.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [20, 0], zoom: 2 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let layer: DebugCoordsGridLayer | undefined;
  const use = (size: Size): void => {
    layer?.remove();
    layer = new DebugCoordsGridLayer({ tileSize: SIZES[size].tileSize }).addTo(map);
    stage.say(SIZES[size].label);
  };
  use('256');
  stage.select('tileSize', Object.entries(SIZES).map(([value, s]) => ({ value: value as Size, label: s.label })), '256', use);

  if (stage.preview) {
    const order: Size[] = ['256', '128', 'wide'];
    let i = 0;
    stage.cycle([{ run: () => (use(order[i++ % order.length] ?? '256'), map.panBy([100, 60], { animate: false })) }], 2400);
  }
  return () => stage.dispose();
};

export default mount;
