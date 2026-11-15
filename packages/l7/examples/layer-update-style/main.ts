// layer.style({ opacity, strokeWidth, stroke }) on a live layer, then scene.render()
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 3, [10, 46], 3.8), PARSER)
    .shape('circle')
    .size(ctx.preview ? 16 : 24)
    .color('#4ecdc4')
    .style({ opacity: 1, strokeWidth: 2, stroke: '#ffffff' });
  scene.addLayer(layer);

  const set = (style: Record<string, unknown>): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    slider(stage.bar, 'opacity', [0, 1, 0.05], 1, (opacity) => set({ opacity }));
    slider(stage.bar, 'strokeWidth', [0, 8, 0.5], 2, (strokeWidth) => set({ strokeWidth }));
    select(stage.bar, 'stroke', ['#ffffff', '#ff6b6b', '#ffd166', '#000000'], '#ffffff', (stroke) => set({ stroke }));
  } else {
    cycle(stage, scene, [[1, 2], [0.4, 6], [0.8, 0], [0.2, 4]] as const, 900, ([opacity, strokeWidth]) => set({ opacity, strokeWidth }));
  }

  return () => stage.dispose();
};

export default mount;
