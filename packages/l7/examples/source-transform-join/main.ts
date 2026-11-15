// Source transform 'join': business rows joined to geography by a field
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pickCountries, worldLayers } from '../../shared/world.ts';

const NAMES = ['France', 'Germany', 'Poland', 'Spain', 'Italy', 'Sweden', 'Norway', 'Finland', 'Ukraine', 'Romania'];
// The business data: no geometry, just a name and a value. Two sets to swap between.
const SETS = {
  'first set': NAMES.map((name, i) => ({ name, value: ((i * 37) % 90) + 10 })),
  'second set': NAMES.map((name, i) => ({ name, value: ((i * 53 + 20) % 90) + 10 })),
} as const;
type SetName = keyof typeof SETS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const geo = pickCountries(NAMES);
  // sourceField: the name field in the business rows; targetField: the field in the geographic data.
  const join = (data: readonly { name: string; value: number }[]) => ({ type: 'join', sourceField: 'name', targetField: 'name', data: [...data] });
  const ramp = ['#0b3d5c', '#1c6e8c', '#3aa6a8', '#7fd1b9', '#fbe3a1'];
  const layer = new PolygonLayer()
    .source(geo, { transforms: [join(SETS['first set'])] })
    .shape('fill')
    .color('value', ramp)
    .style({ opacity: 0.9 });
  scene.addLayer(layer);

  const apply = (name: SetName): void => {
    layer.setData(geo, { transforms: [join(SETS[name])] });
    const out = stage.readout();
    if (out) out.textContent = `join: { sourceField: 'name', targetField: 'name', data: ${name} }\nthe countries are coloured by 'value', a field that is not in the geographic data`;
  };
  apply('first set');
  const names = Object.keys(SETS) as SetName[];
  if (stage.bar) select(stage.bar, 'business data', names, 'first set', apply);
  else stage.every(1500, (i) => apply(names[i % 2] ?? 'first set'));

  return () => stage.dispose();
};

export default mount;
