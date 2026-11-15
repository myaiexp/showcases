// source.setData(data, option): the layers on the source redraw
import { PointLayer, Scene, Source } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom, PLACES, spots } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { placeFeatures } from '../../shared/source-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const source = new Source(spots(20, 1), { parser: { type: 'json', x: 'lng', y: 'lat' } });
  const layer = new PointLayer().source(source).shape('circle').size(10).color('value', ['#0b3d5c', '#3aa6a8', '#ffd166', '#ff6b6b']).style({ stroke: '#0b131c', strokeWidth: 1 });
  scene.addLayer(layer);

  const out = stage.readout();
  const say = (s: string): void => {
    if (out) out.textContent = s;
  };
  let seed = 1;
  const steps: [string, () => void][] = [
    ['setData(new rows)', () => source.setData(spots(20, ++seed))],
    ['setData(geojson, { parser: { type: "geojson" } })', () => source.setData(placeFeatures(PLACES), { parser: { type: 'geojson' } })],
    ['setData(rows, { parser: { type: "json", x, y } })', () => source.setData(spots(20, ++seed), { parser: { type: 'json', x: 'lng', y: 'lat' } })],
  ];
  say('new Source(rows, { parser: json })');
  const run = ([label, fn]: [string, () => void]): void => {
    fn();
    say(`source.${label}\ngetParserType(): '${source.getParserType()}'`);
  };
  if (stage.bar) for (const step of steps) button(stage.bar, step[0].split('(')[0] + (step[0].includes('geojson') ? ' (geojson)' : step[0].includes('parser') ? ' (json again)' : ' (new rows)'), () => run(step));
  else stage.every(1100, (i) => run(steps[i % steps.length] ?? steps[0] ?? ['', () => undefined]));

  return () => stage.dispose();
};

export default mount;
