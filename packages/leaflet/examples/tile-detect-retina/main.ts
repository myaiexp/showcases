// detectRetina: at a device pixel ratio of 1.5 or more, four half-size tiles one zoom deeper replace each tile
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { coordsLabel, onRequest, shortUrl } from '../../shared/tile-urls.ts';

/**
 * Leaflet reads window.devicePixelRatio when the layer is constructed. To show both outcomes on
 * any screen, this sets it for that one call and puts the original property back straight after.
 */
function withPixelRatio<T>(ratio: number, build: () => T): T {
  const saved = Object.getOwnPropertyDescriptor(window, 'devicePixelRatio');
  Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: ratio });
  try {
    return build();
  } finally {
    if (saved) Object.defineProperty(window, 'devicePixelRatio', saved);
    else delete (window as { devicePixelRatio?: number }).devicePixelRatio;
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The select sets the pixel ratio the layer sees while it is built. Below 1.5 detectRetina does nothing.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [37, 15], zoom: 3 }));
  const info = stage.side('What the layer did');
  const log = stage.log('Tile requests', 6);

  let layer: LocalTileLayer | undefined;
  const use = (ratio: number): void => {
    layer?.remove();
    const l = withPixelRatio(ratio, () =>
      new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { detectRetina: true, attribution: LAND_ATTRIBUTION }),
    );
    layer = l;
    const o = l.options;
    const summary = `pixel ratio ${ratio}\ntileSize ${String(o.tileSize)}\nzoomOffset ${o.zoomOffset}\nmaxZoom ${o.maxZoom}`;
    if (info) info.textContent = summary;
    else stage.say(`pixel ratio ${ratio}: tileSize ${String(o.tileSize)}, zoomOffset ${o.zoomOffset}`);
    onRequest(l, (u, c) => log(`${coordsLabel(c)}  ${shortUrl(u)}`));
    l.addTo(map);
  };
  use(1);
  stage.select('devicePixelRatio', [1, 1.25, 1.5, 2, 3].map((v) => ({ value: String(v), label: String(v) })), '1', (v) => use(Number(v)));

  if (stage.preview) {
    const order = [1, 2, 1, 3];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] ?? 1) }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
