// A Polygon with a hole: the first ring is the outline, the next rings are holes
import { LeafletMap, Polygon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The map shows through the hole. Toggle it to pass the outline alone.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const outer: [number, number][] = [
    [54, 3],
    [54, 17],
    [46, 17],
    [46, 3],
  ];
  const hole: [number, number][] = [
    [52, 7],
    [52, 13],
    [48, 13],
    [48, 7],
  ];
  const polygon = new Polygon([outer, hole], { color: '#34d399', fillOpacity: 0.4 }).addTo(map);

  const set = (withHole: boolean): void => {
    polygon.setLatLngs(withHole ? [outer, hole] : [outer]);
    stage.say(withHole ? 'setLatLngs([outline, hole]): the middle is open' : 'setLatLngs([outline]): the middle is filled');
  };
  stage.toggle('Hole', true, set);

  let withHole = true;
  stage.say('new Polygon([outline, hole])');
  if (stage.preview) {
    stage.every(2400, () => {
      withHole = !withHole;
      set(withHole);
    });
  }
  return () => stage.dispose();
};

export default mount;
