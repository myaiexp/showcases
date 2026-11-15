// Tile layer events: loading, tileloadstart, tileload, tileerror, tileabort, tileunload and load
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { coordsLabel } from '../../shared/tile-urls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pan and zoom. The button zooms to 19, where the server has no tiles, for tileerror.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [51, 9], zoom: 5, maxZoom: 20 }));
  const layer = new LocalTileLayer('https://tiles.example/light/{z}/{x}/{y}.png', { maxZoom: 20, attribution: LAND_ATTRIBUTION });

  const log = stage.log('Layer events', 12);
  const counts = stage.side('Counts');
  const n = { tileloadstart: 0, tileload: 0, tileerror: 0, tileabort: 0, tileunload: 0 };
  const paint = (): void => {
    if (counts) counts.textContent = Object.entries(n).map(([k, v]) => `${k.padEnd(14)}${v}`).join('\n') + `\nisLoading()    ${layer.isLoading()}`;
  };
  paint();

  for (const name of ['tileloadstart', 'tileload', 'tileerror', 'tileabort', 'tileunload'] as const) {
    layer.on(name, (e) => {
      n[name]++;
      paint();
      if (name === 'tileerror' || name === 'tileabort') log(`${name} ${coordsLabel(e.coords)}`);
    });
  }
  layer.on('loading', () => {
    log('loading: the layer started on tiles');
    paint();
  });
  layer.on('load', () => {
    log(`load: all visible tiles done (${n.tileload} loaded, ${n.tileerror} failed)`);
    paint();
  });
  layer.addTo(map);

  stage.button('Zoom to 19', () => map.setView(map.getCenter(), 19));
  stage.button('Zoom to 5', () => map.setView(map.getCenter(), 5));

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => map.setView([51, 9], 5) },
        { run: () => map.setView([40, -3], 6) },
        { run: () => map.setView([40, -3], 19) },
        { run: () => map.setView([51, 9], 5) },
      ],
      2600,
    );
  }
  return () => stage.dispose();
};

export default mount;
