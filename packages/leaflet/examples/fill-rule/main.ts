// fillRule on a self-crossing star: evenodd leaves the middle open, nonzero fills it
import { LeafletMap, Polygon } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const star = (): [number, number][] => {
  const pts: [number, number][] = [];
  for (let k = 0; k < 5; k++) {
    // Visit every second corner of a pentagon (144 degrees apart), so the outline crosses itself.
    const a = Math.PI / 2 + (k * 4 * Math.PI) / 5;
    pts.push([50 + 4.5 * Math.sin(a), 10 + 7 * Math.cos(a)]);
  }
  return pts;
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The outline crosses itself, so the pentagon in the middle is wound twice. evenodd counts crossings, nonzero does not.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const shape = new Polygon(star(), { color: '#f472b6', fillOpacity: 0.5, fillRule: 'evenodd' }).addTo(map);

  const apply = (rule: 'evenodd' | 'nonzero'): void => {
    shape.setStyle({ fillRule: rule });
    stage.say(`fillRule: '${rule}'`);
  };
  stage.select(
    'fillRule',
    [
      { value: 'evenodd', label: 'evenodd (default)' },
      { value: 'nonzero', label: 'nonzero' },
    ],
    'evenodd',
    apply,
  );
  let odd = true;
  apply('evenodd');
  if (stage.preview) {
    stage.every(2200, () => apply((odd = !odd) ? 'evenodd' : 'nonzero'));
  }
  return () => stage.dispose();
};

export default mount;
