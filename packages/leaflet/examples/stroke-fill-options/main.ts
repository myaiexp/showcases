// stroke and fill switch a path's outline and interior on and off
import { Circle, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A circle fills by default and a polyline does not. fillColor defaults to color.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const circle = new Circle([50, 10], { radius: 450_000, color: '#34d399', weight: 4, fillOpacity: 0.4 }).addTo(map);

  const apply = (stroke: boolean, fill: boolean, fillColor: string | null): void => {
    circle.setStyle({ stroke, fill, fillColor });
    stage.say(`stroke: ${stroke}, fill: ${fill}, fillColor: ${fillColor ?? 'null (uses color)'}`);
  };
  let stroke = true;
  let fill = true;
  stage.toggle('stroke', true, (v) => apply((stroke = v), fill, null));
  stage.toggle('fill', true, (v) => apply(stroke, (fill = v), null));
  stage.button('fillColor orange', () => apply(stroke, fill, '#f59e0b'));

  const combos: [boolean, boolean, string | null][] = [
    [true, true, null],
    [false, true, null],
    [true, false, null],
    [true, true, '#f59e0b'],
  ];
  let i = 0;
  apply(...combos[0]!);
  if (stage.preview) {
    stage.every(1800, () => apply(...combos[++i % combos.length]!));
  }
  return () => stage.dispose();
};

export default mount;
