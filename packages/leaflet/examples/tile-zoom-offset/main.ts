// tileSize 512 with zoomOffset -1: big tiles from a server whose zoom 0 is a 512px world
import { LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { onRequest, shortUrl, coordsLabel } from '../../shared/tile-urls.ts';

type Mode = 'default' | 'big' | 'mismatch';
const MODES: Record<Mode, { label: string; url: string; tileSize: number; zoomOffset: number; minZoom: number }> = {
  default: { label: 'tileSize 256, zoomOffset 0 (defaults)', url: 'https://tiles.example/grid/{z}/{x}/{y}.png', tileSize: 256, zoomOffset: 0, minZoom: 0 },
  big: { label: 'tileSize 512, zoomOffset -1', url: 'https://tiles.example/grid/{z}/{x}/{y}@2x.png', tileSize: 512, zoomOffset: -1, minZoom: 1 },
  mismatch: { label: 'tileSize 512, zoomOffset 0 (mismatch)', url: 'https://tiles.example/grid/{z}/{x}/{y}@2x.png', tileSize: 512, zoomOffset: 0, minZoom: 0 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A 512px tile covers what four 256px tiles cover one zoom deeper, so the URL zoom is the map zoom minus 1.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [30, 10], zoom: 3 }));
  const log = stage.log('Tile requests', 10);

  let layer: LocalTileLayer | undefined;
  const use = (mode: Mode): void => {
    layer?.remove();
    const { label, url, tileSize, zoomOffset, minZoom } = MODES[mode];
    layer = new LocalTileLayer(url, { tileSize, zoomOffset, minZoom, attribution: LAND_ATTRIBUTION });
    stage.say(label, mode === 'mismatch' ? 'bad' : 'ok');
    const l = layer;
    onRequest(l, (u, c) => log(`map zoom ${map.getZoom()} → ${coordsLabel(c)}\n  ${shortUrl(u)}`));
    layer.addTo(map);
  };
  use('default');
  stage.select('options', Object.entries(MODES).map(([value, m]) => ({ value: value as Mode, label: m.label })), 'default', use);

  if (stage.preview) {
    const order: Mode[] = ['default', 'big', 'mismatch'];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] ?? 'default') }], 2800);
  }
  return () => stage.dispose();
};

export default mount;
