// Tutorial arc: segmentNumber and thetaOffset together
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, rows, EUROPE, sweep, wave } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [12,50],
      zoom: ctx.preview ? 2.3 : 3.3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer({ blend: 'normal' }).source(rows('Paris', 10, EUROPE), PARSER).shape('arc').size(2).color('#8C1EB2').style({ segmentNumber: 5, thetaOffset: 0.314 });
  scene.addLayer(layer);
  const set = (seg: number, theta: number): void => { layer.style({ segmentNumber: seg, thetaOffset: theta }); scene.render(); };
  if (stage.bar) {
    let seg = 5, theta = 0.314;
    slider(stage.bar, 'segmentNumber', [2, 30, 1], 5, (v) => set((seg = v), theta));
    slider(stage.bar, 'thetaOffset', [0, 1, 0.02], 0.314, (v) => set(seg, (theta = v)));
  } else sweep(stage, 120, (i) => set(3 + Math.round(wave(i, 60) * 20), 0.15 + wave(i, 90) * 0.5));

  return () => stage.dispose();
};

export default mount;
