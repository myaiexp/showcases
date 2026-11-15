// A ScaleControl at the equator and at 60 degrees north: the same bar means half the distance
import { LeafletMap, ScaleControl } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The scale bar always describes the centre of the map. Drag the latitude and compare.' });

  const map = stage.own(new LeafletMap(stage.box).setView([0, 0], 2));
  new LocalTileLayer('https://tiles.example/grid/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  new ScaleControl({ imperial: false }).addTo(map);

  const report = (): void => {
    const line = map.getContainer().querySelector('.leaflet-control-scale-line')?.textContent ?? '';
    stage.say(`Centre latitude ${map.getCenter().lat.toFixed(0)}: the scale bar reads ${line}`);
  };
  map.on('moveend', report);
  report();

  stage.slider('Latitude', 0, 75, 5, 0, (v) => map.setView([v, 0]));
  if (stage.preview) {
    let north = false;
    stage.every(2500, () => {
      north = !north;
      map.setView([north ? 60 : 0, 0]);
    });
  }
  return () => stage.dispose();
};

export default mount;
