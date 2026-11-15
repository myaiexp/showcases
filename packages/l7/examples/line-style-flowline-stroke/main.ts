// LineLayer flowline style stroke, strokeWidth, strokeOpacity, gapWidth
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

  const out = rows('Paris', 8, EUROPE);
  const flows = [...out, ...out.map((r) => ({ ...r, lng1: r.lng2, lat1: r.lat2, lng2: r.lng1, lat2: r.lat1 }))];
  const layer = new LineLayer()
    .source(flows, PARSER)
    .shape('flowline')
    .size(3)
    .color('type', ['#ff8a65', '#4fc3f7', '#aed581'])
    .style({ stroke: '#ffffff', strokeWidth: 1, strokeOpacity: 1, gapWidth: 2 });
  scene.addLayer(layer);

  const set = (gap: number): void => { layer.style({ gapWidth: gap }); scene.render(); };
  if (stage.bar) slider(stage.bar, 'gapWidth', [0, 12, 1], 2, set);
  else sweep(stage, 120, (i) => set(wave(i, 30) * 10));

  return () => stage.dispose();
};

export default mount;
