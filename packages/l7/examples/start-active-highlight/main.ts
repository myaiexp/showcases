// layer.active(true) and layer.active({ color: 'red' }): the quick start's two highlights
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { tour } from '../../shared/layer-demo.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['active(true)', "active({ color: 'red' })"] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer({})
    .source(regions())
    .color('name', ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)'])
    .active(true);
  scene.addLayer(layer);

  const set = (mode: (typeof MODES)[number]): void => {
    layer.active(mode === MODES[0] ? true : { color: 'red' });
  };
  if (stage.bar) select(stage.bar, 'highlight', MODES, MODES[0], set);
  else tour(stage, scene, [[2.3, 46.5], [10.4, 51.1], [-3.7, 40.3], [19.1, 52], [12.5, 42.8], [25, 61.9]], { ms: 450, clickEvery: 99 });

  return () => stage.dispose();
};

export default mount;
