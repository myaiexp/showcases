// A TMS server: tms: true or {-y} count rows from the bottom; leaving both out shows the wrong rows
import { LeafletMap, type Coords } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, shortUrl } from '../../shared/tile-urls.ts';

type Mode = 'tms' | 'minus-y' | 'plain';
const MODES: Record<Mode, { label: string; url: string; tms: boolean }> = {
  tms: { label: 'tms: true', url: 'https://tms.example/grid/{z}/{x}/{y}.png', tms: true },
  'minus-y': { label: '{-y} in the URL', url: 'https://tms.example/grid/{z}/{x}/{-y}.png', tms: false },
  plain: { label: 'neither (wrong rows)', url: 'https://tms.example/grid/{z}/{x}/{y}.png', tms: false },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server at tms.example counts rows from the bottom. Without tms or {-y} the tile for row y comes back mirrored.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 0], zoom: 2 }));
  const log = stage.log('Requested URLs', 12);

  let layer: LocalTileLayer | undefined;
  const use = (mode: Mode): void => {
    layer?.remove();
    const m = MODES[mode];
    layer = new LocalTileLayer(m.url, { tms: m.tms, attribution: LAND_ATTRIBUTION });
    stage.say(`${m.label}: ${mode === 'plain' ? 'continents are in the wrong place' : 'rows match the map'}`, mode === 'plain' ? 'bad' : 'ok');
    const l = layer;
    onRequest(l, (url, c: Coords) => log(`${shortUrl(url)}   (XYZ row ${c.y})`));
    layer.addTo(map);
  };
  use('tms');
  stage.select('row numbering', Object.entries(MODES).map(([value, m]) => ({ value: value as Mode, label: m.label })), 'tms', use);

  if (stage.preview) {
    const order: Mode[] = ['tms', 'plain', 'minus-y'];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] ?? 'tms') }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
