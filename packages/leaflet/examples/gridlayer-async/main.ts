// An asynchronous GridLayer: createTile(coords, done) finishes tiles later, and one in seven fails
import { GridLayer, LeafletMap, type Coords, type DoneCallback } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { coordsLabel } from '../../shared/tile-urls.ts';

/** Tiles that take `delay` ms to "load". Declaring `done` is what makes createTile asynchronous. */
class SlowGridLayer extends GridLayer {
  delay = 1200;
  private timers = new Set<ReturnType<typeof setTimeout>>();

  override createTile(coords: Coords, done: DoneCallback): HTMLElement {
    const tile = document.createElement('div');
    tile.style.cssText = 'outline:1px solid #6cf;color:#9cf;font:13px sans-serif;padding:6px;box-sizing:border-box';
    tile.textContent = 'loading…';

    const id = setTimeout(() => {
      this.timers.delete(id);
      if ((coords.x + coords.y) % 7 === 0) {
        tile.style.background = 'rgb(160 40 40 / 0.5)';
        tile.textContent = `${coordsLabel(coords)}: failed`;
        done(new Error(`tile ${coordsLabel(coords)} failed`), tile);
      } else {
        tile.style.background = 'rgb(40 120 200 / 0.35)';
        tile.textContent = coordsLabel(coords);
        done(null, tile);
      }
    }, 300 + Math.random() * this.delay);
    this.timers.add(id);
    return tile;
  }

  override onRemove(map: LeafletMap): void {
    for (const id of this.timers) clearTimeout(id);
    this.timers.clear();
    super.onRemove(map);
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each tile appears when its own done(error, tile) runs. A tile passed an error fires tileerror; the layer fires load once the last one is done.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 20], zoom: 3 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new SlowGridLayer();
  const log = stage.log('Layer events', 10);
  layer.on('loading', () => log('loading'));
  layer.on('tileerror', (e) => log(`tileerror ${coordsLabel(e.coords)}`));
  layer.on('load', () => log(`load (isLoading() ${layer.isLoading()})`));
  layer.addTo(map);

  stage.slider('slowest tile (ms)', 0, 3000, 100, 1200, (v) => (layer.delay = v));

  if (stage.preview) {
    stage.cycle([{ run: () => map.setView([30, 20], 3) }, { run: () => map.panBy([300, 80], { duration: 1 }) }, { run: () => map.setView([10, -30], 4) }], 3200);
  }
  return () => stage.dispose();
};

export default mount;
