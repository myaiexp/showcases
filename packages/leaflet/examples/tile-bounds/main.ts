// The bounds option: a tile layer that only loads tiles which overlap a LatLngBounds
import { LatLngBounds, LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { countTiles } from '../../shared/tile-urls.ts';

type Area = 'iberia' | 'alps' | 'none';
const AREAS: Record<Area, { label: string; bounds: [[number, number], [number, number]] | null }> = {
  iberia: { label: 'Iberia', bounds: [[36, -10], [44, 3]] },
  alps: { label: 'The Alps', bounds: [[44, 5], [48, 16]] },
  none: { label: 'no bounds', bounds: null },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tiles that overlap the bounds load whole, so the terrain patch has tile edges, not the rectangle\'s.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [44, 3], zoom: 5 }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let layer: LocalTileLayer | undefined;
  let outline: Rectangle | undefined;
  const use = (area: Area): void => {
    layer?.remove();
    outline?.remove();
    const { label, bounds } = AREAS[area];
    // bounds takes any LatLngBounds expression; null (the default) loads every tile in view.
    layer = new LocalTileLayer('https://tiles.example/terrain/{z}/{x}/{y}.png', { bounds: bounds ? new LatLngBounds(bounds) : null });
    if (bounds) outline = new Rectangle(bounds, { color: '#f58a3d', weight: 2, fill: false, interactive: false }).addTo(map);
    const l = layer;
    const tiles = countTiles(l, (c) => stage.say(`${label}: ${c.requested} tiles requested`));
    l.addTo(map);
    stage.say(`${label}: ${tiles.counts.requested} tiles requested`);
  };
  use('iberia');
  stage.select('bounds', Object.entries(AREAS).map(([value, a]) => ({ value: value as Area, label: a.label })), 'iberia', use);

  if (stage.preview) {
    const order: Area[] = ['iberia', 'alps', 'none'];
    let i = 0;
    stage.cycle([{ run: () => use(order[i++ % order.length] ?? 'iberia') }], 2600);
  }
  return () => stage.dispose();
};

export default mount;
