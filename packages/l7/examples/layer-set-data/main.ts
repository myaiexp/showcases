// layer.setData(rows): a new scatter drawn through the same color/size mapping
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { PARSER, rows } from '../../shared/layer-demo.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 48], zoom: ctx.preview ? 3 : 3.8 }),
  });
  await stage.ready(scene);

  const europe = (seed: number): ReturnType<typeof rows> =>
    rows(ctx.preview ? 24 : 60, { seed, spread: 4, around: [{ name: 'c', lng: 10, lat: 48, pop: 1, continent: 'Europe' }] });
  const layer = new PointLayer()
    .source(europe(1), PARSER)
    .shape('circle')
    .size('v', [4, ctx.preview ? 12 : 18])
    .color('v', ['#2b83ba', '#ffffbf', '#d7191c']);
  scene.addLayer(layer);

  let seed = 1;
  const next = (): void => {
    seed += 1;
    layer.setData(europe(seed));
    const out = stage.readout();
    if (out) out.textContent = `layer.setData(rows(seed ${seed})): ${layer.getSource().data.dataArray.length} points`;
  };
  if (stage.bar) button(stage.bar, 'setData(new scatter)', next);
  else stage.every(900, next);

  return () => stage.dispose();
};

export default mount;
