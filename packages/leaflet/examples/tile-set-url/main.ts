// setUrl() swaps the URL template; noRedraw keeps the old tiles until redraw()
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, shortUrl } from '../../shared/tile-urls.ts';

const url = (style: string): string => `https://tiles.example/${style}/{z}/{x}/{y}.png`;
const STYLES = ['dark', 'light', 'terrain', 'vintage'] as const;
type Style = (typeof STYLES)[number];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With noRedraw on, setUrl() only stores the URL; redraw() then requests the tiles. The same URL redraws only when noRedraw is false.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [35, 25], zoom: 4 }));
  const layer = new LocalTileLayer(url('dark'), { attribution: LAND_ATTRIBUTION });

  const log = stage.log('setUrl and requests', 14);
  onRequest(layer, (u) => log(`request ${shortUrl(u)}`));
  layer.addTo(map);

  let current: Style = 'dark';
  let noRedraw = false;
  const set = (style: Style, skip = noRedraw): void => {
    current = style;
    log(`setUrl(…/${style}/…, ${skip})`);
    layer.setUrl(url(style), skip);
  };

  stage.select('URL style', STYLES.map((v) => ({ value: v, label: v })), 'dark', (v) => set(v));
  stage.toggle('noRedraw', false, (on) => (noRedraw = on));
  stage.button('redraw()', () => (log('redraw()'), layer.redraw()));
  stage.button('setUrl(same URL)', () => (log('setUrl(same URL)'), layer.setUrl(url(current))));
  stage.button('setUrl(same URL, false)', () => set(current, false));

  if (stage.preview) {
    stage.cycle(
      [
        { say: "setUrl(light): tiles redrawn", run: () => set('light', false) },
        { say: 'setUrl(terrain, true): nothing changes yet', run: () => set('terrain', true) },
        { say: 'redraw(): the terrain tiles load', run: () => layer.redraw() },
        { say: 'setUrl(terrain) again: same URL, no redraw', run: () => layer.setUrl(url('terrain')) },
        { say: 'setUrl(dark, false)', run: () => set('dark', false) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
