// GeometryLayer shape('plane'): a rectangle by centre, width and height
import { GeometryLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { cycle } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [13.4, 52.5], zoom: ctx.preview ? 10.2 : 11.5 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new GeometryLayer()
    .shape('plane')
    .style({ opacity: 0.8, width: 0.074, height: 0.061, center: [13.4, 52.5] })
    .active(true)
    .color('#ffd166');
  scene.addLayer(layer);

  const set = (style: Record<string, unknown>): void => {
    layer.style(style);
    scene.render();
  };
  if (stage.bar) {
    slider(stage.bar, 'width', [0.02, 0.15, 0.002], 0.074, (width) => set({ width }));
    slider(stage.bar, 'height', [0.02, 0.15, 0.002], 0.061, (height) => set({ height }));
    slider(stage.bar, 'opacity', [0.1, 1, 0.05], 0.8, (opacity) => set({ opacity }));
  } else cycle(stage, scene, [[0.074, 0.061], [0.04, 0.1], [0.12, 0.03], [0.074, 0.061]] as const, 1200, ([width, height]) => set({ width, height }));

  return () => stage.dispose();
};

export default mount;
