// A TMS tileset as a TileLayer: tms: true and a tileset folder in the URL
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { coordsLabel, onRequest } from '../../shared/tile-urls.ts';

const TILESETS = ['dark', 'light', 'terrain', 'vintage', 'night'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The TMS URL is base/tileset/{z}/{x}/{y}.png. tms: true counts y from the bottom; the log shows the row Leaflet asked for beside the one a plain XYZ layer would use.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 20], zoom: 4 }));
  const log = stage.log('Requests', 10);

  let layer: LocalTileLayer | undefined;
  const use = (tileset: string): void => {
    layer?.remove();
    layer = new LocalTileLayer(`https://tms.example/${tileset}/{z}/{x}/{y}.png`, { tms: true, attribution: LAND_ATTRIBUTION });
    const l = layer;
    onRequest(l, (url, c) => {
      const row = Number(url.split('/').pop()?.split('.')[0]);
      log(`${coordsLabel(c)} → …/${tileset}/${c.z}/${c.x}/${row}.png`);
    });
    layer.addTo(map);
    stage.say(`tileset ${tileset}`);
  };
  use('dark');
  stage.select('tileset', TILESETS.map((v) => ({ value: v, label: v })), 'dark', use);

  if (stage.preview) {
    let i = 0;
    stage.cycle([{ run: () => use(TILESETS[++i % TILESETS.length] ?? 'dark') }], 2200);
  }
  return () => stage.dispose();
};

export default mount;
