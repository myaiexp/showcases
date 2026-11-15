// layer.select(true | { color, mix } | false): three states of click selection
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { tour } from '../../shared/layer-demo.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['true', "{ color: 'red' }", "{ color: 'red', mix: 0.6 }", 'false'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const layer = new PolygonLayer().source(regions()).shape('fill').color('type', ['#24425f', '#356a8e', '#4f8fb8']).select(true);
  scene.addLayer(layer);

  const set = (mode: (typeof MODES)[number]): void => {
    if (mode === 'true') layer.select(true);
    else if (mode === 'false') layer.select(false);
    else layer.select(mode.includes('mix') ? { color: 'red', mix: 0.6 } : { color: 'red' });
  };
  if (stage.bar) select(stage.bar, 'select', MODES, 'true', set);
  else {
    set("{ color: 'red' }");
    tour(stage, scene, [[2.3, 46.5], [10.4, 51.1], [-3.7, 40.3], [19.1, 52], [12.5, 42.8]], { ms: 450, clickEvery: 1 });
  }

  return () => stage.dispose();
};

export default mount;
