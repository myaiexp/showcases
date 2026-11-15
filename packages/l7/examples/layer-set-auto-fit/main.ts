// layer.setAutoFit(true) then layer.setData(...): the map fits the data on the update
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { toggle, button } from '../../shared/controls.ts';
import { cities } from '../../shared/data.ts';
import { PARSER, rows } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const PLACES = [['Paris', 'Berlin', 'Madrid'], ['Tokyo', 'Seoul', 'Shanghai'], ['New York', 'Chicago', 'Toronto'], ['Sydney', 'Melbourne', 'Auckland']];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: ctx.preview ? 0.8 : 1.4 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const at = (k: number): ReturnType<typeof rows> =>
    rows(ctx.preview ? 20 : 40, { seed: k + 3, spread: 2.5, around: cities.filter((c) => PLACES[k % PLACES.length]?.includes(c.name)) });
  const layer = new PointLayer().source(at(0), PARSER).shape('circle').size(ctx.preview ? 5 : 7).color('#ffd166');
  scene.addLayer(layer);

  let k = 0;
  const next = (): void => {
    k += 1;
    layer.setData(at(k));
  };
  if (stage.bar) {
    toggle(stage.bar, 'setAutoFit', false, (on) => layer.setAutoFit(on));
    button(stage.bar, 'setData(next region)', next);
  } else {
    layer.setAutoFit(true);
    stage.every(1600, next);
  }

  return () => stage.dispose();
};

export default mount;
