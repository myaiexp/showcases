// getBoundsZoom: the zoom at which bounds fit the view, or fill it with inside, with padding
import { LatLngBounds, LeafletMap, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const REGIONS = {
  iberia: new LatLngBounds([36, -9.5], [43.8, 3.3]),
  uk: new LatLngBounds([50, -8], [58.7, 1.8]),
  italy: new LatLngBounds([36.6, 6.6], [47.1, 18.5]),
  iceland: new LatLngBounds([63.3, -24.5], [66.5, -13.5]),
};
type Region = keyof typeof REGIONS;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a region, toggle inside and set padding. The map is then zoomed to the number getBoundsZoom returned.' });

  const map = stage.own(new LeafletMap(stage.box, { zoomSnap: 0.25 }).setView([48, 5], 4));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let region: Region = 'iberia';
  let inside = false;
  let pad = 0;
  let rect = new Rectangle(REGIONS[region], { color: '#f90', fill: false }).addTo(map);

  const apply = (): void => {
    rect.remove();
    const bounds = REGIONS[region];
    rect = new Rectangle(bounds, { color: '#f90', fill: false }).addTo(map);
    const z = map.getBoundsZoom(bounds, inside, [pad, pad]);
    stage.say(`getBoundsZoom(${region}, ${inside}, [${pad}, ${pad}]) = ${z}`);
    map.setView(bounds.getCenter(), z);
  };

  stage.select('Region', (Object.keys(REGIONS) as Region[]).map((r) => ({ value: r, label: r })), region, (v) => {
    region = v;
    apply();
  });
  stage.toggle('inside', inside, (on) => {
    inside = on;
    apply();
  });
  stage.slider('Padding', 0, 120, 10, pad, (v) => {
    pad = v;
    apply();
  });
  apply();

  if (stage.preview) {
    const seq: [Region, boolean, number][] = [['iberia', false, 0], ['iberia', true, 0], ['uk', false, 0], ['uk', false, 60], ['italy', false, 0], ['iceland', false, 0]];
    let i = 0;
    stage.every(2200, () => {
      const s = seq[i++ % seq.length]!;
      [region, inside, pad] = s;
      apply();
    });
  }
  return () => stage.dispose();
};

export default mount;
