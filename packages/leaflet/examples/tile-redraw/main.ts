// redraw() clears every tile and requests them again, here after the version in the URL changed
import { LeafletMap, type TileLayerOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { countTiles, onRequest, shortUrl } from '../../shared/tile-urls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Refresh bumps a {version} key in the URL, then calls redraw(): every visible tile is unloaded and requested again.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [55, 20], zoom: 4 }));

  const options = { version: 1, attribution: LAND_ATTRIBUTION };
  const layer = new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png?v={version}', options as TileLayerOptions);
  const log = stage.log('Tile requests', 8);
  const tiles = countTiles(layer);
  onRequest(layer, (u) => log(shortUrl(u)));

  const refresh = (): void => {
    tiles.reset();
    (layer.options as Record<string, unknown>)['version'] = ((layer.options as Record<string, number>)['version'] ?? 1) + 1;
    layer.redraw();
    stage.say(`redraw(): version ${(layer.options as Record<string, number>)['version']}, every tile requested again`);
  };
  stage.button('Refresh (redraw)', refresh);
  layer.on('load', () => stage.say(`${tiles.counts.loaded} tiles loaded, ${tiles.counts.unloaded} unloaded since the last redraw`));
  layer.addTo(map);

  if (stage.preview) stage.every(2600, refresh);
  return () => stage.dispose();
};

export default mount;
