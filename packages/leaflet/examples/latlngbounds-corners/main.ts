// LatLngBounds getters: the four corners, the centre, each side, and the bbox string for web services
import { CircleMarker, LatLngBounds, LeafletMap, Rectangle, Tooltip } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The box is given by two opposite corners; every getter works from those.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const bounds = new LatLngBounds([46, 6], [52, 14]);
  new Rectangle(bounds, { color: '#60a5fa', weight: 2, fillOpacity: 0.1 }).addTo(map);
  const points = [
    ['getNorthWest()', bounds.getNorthWest()],
    ['getNorthEast()', bounds.getNorthEast()],
    ['getSouthEast()', bounds.getSouthEast()],
    ['getSouthWest()', bounds.getSouthWest()],
    ['getCenter()', bounds.getCenter()],
  ] as const;
  // The full view labels every point; a card has little room, so it labels one at a time.
  const dots = points.map(([name, ll]) => {
    const dot = new CircleMarker(ll, { radius: 5, color: '#fb923c', fillOpacity: 1 }).addTo(map);
    dot.bindTooltip(new Tooltip({ permanent: !stage.preview, direction: 'auto', opacity: 0.85 }).setContent(name.replace('get', '').replace('()', '')));
    if (!stage.preview) dot.openTooltip();
    return dot;
  });
  let shown = 0;
  if (stage.preview) {
    stage.every(1700, () => {
      dots.forEach((d) => d.closeTooltip());
      dots[shown++ % dots.length]?.openTooltip();
    });
  }

  const lines = [
    ...points.map(([name, ll]) => `${name}\n  ${ll.toString(2)}`),
    `getNorth() ${bounds.getNorth()}   getSouth() ${bounds.getSouth()}`,
    `getEast() ${bounds.getEast()}   getWest() ${bounds.getWest()}`,
    `toBBoxString()\n  ${bounds.toBBoxString()}`,
  ];
  const pre = stage.side('LatLngBounds getters');
  if (pre) pre.textContent = lines.join('\n');
  let i = 0;
  const show = (): void => stage.say(lines[i++ % lines.length]?.replace(/\n\s*/, ' ') ?? '');
  show();
  stage.every(1700, show);
  return () => stage.dispose();
};

export default mount;
