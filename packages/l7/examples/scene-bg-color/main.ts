// setBgColor fills the scene canvas behind every layer
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const COLORS = ['#0b1f33', '#2b1a33', '#10281c', '#33240f', 'rgba(0,0,0,0)'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 20], zoom: ctx.preview ? 0.5 : 1.2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#fff'));
  const show = valuePanel(stage.container, 'br');
  const paint = (color: string): void => {
    scene.setBgColor(color);
    show({ setBgColor: color });
  };
  paint(COLORS[0]);

  if (stage.bar) select(stage.bar, 'setBgColor', COLORS, COLORS[0], paint);
  if (stage.preview) stage.every(1300, (i) => paint(COLORS[i % COLORS.length]!));

  return () => stage.dispose();
};

export default mount;
