// LineLayer style lineType dash with a dashArray of [solid, gap]
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider, select } from '../../shared/controls.ts';
import { PARSER, rows, sweep } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [15,25],
      zoom: ctx.preview ? 0.2 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer().source(rows('Paris', 12), PARSER).shape('arc').size(2.5).color('#aed581').style({ lineType: 'dash', dashArray: [5, 5] });
  scene.addLayer(layer);

  let dash: [number, number] = [5, 5];
  const set = (type: 'solid' | 'dash'): void => { layer.style({ lineType: type, dashArray: dash }); scene.render(); };
  if (stage.bar) {
    select(stage.bar, 'lineType', ['dash', 'solid'] as const, 'dash', set);
    slider(stage.bar, 'solid', [1, 20, 1], 5, (v) => { dash = [v, dash[1]]; set('dash'); });
    slider(stage.bar, 'gap', [1, 20, 1], 5, (v) => { dash = [dash[0], v]; set('dash'); });
  } else {
    const sets: [number, number][] = [[10, 2], [5, 5], [2, 10], [8, 8]];
    sweep(stage, 1000, (i) => { dash = sets[i % sets.length] ?? [5, 5]; set('dash'); });
  }

  return () => stage.dispose();
};

export default mount;
