// exportPng captures the layers as an image; preserveDrawingBuffer keeps the frame readable
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    // Without preserveDrawingBuffer the canvas may be cleared before it is read.
    preserveDrawingBuffer: true,
    map: new Map({ center: [60, 30], zoom: ctx.preview ? 0.8 : 1.5 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  const dots = new PointLayer().source(cityFeatures()).shape('hexagon').size('pop', [4, 16]).color('pop', ['#3f7fa5', '#ffd166', '#ff6b6b']);
  scene.addLayer(dots);

  const strip = document.createElement('div');
  strip.className = 'shots';
  stage.container.append(strip);
  let type: 'png' | 'jpg' = 'png';
  const shoot = async (): Promise<void> => {
    const url = await scene.exportPng(type);
    if (stage.disposed) return;
    const img = new Image();
    img.src = url;
    img.title = `${type}, ${Math.round(url.length / 1024)} KB as a data URL`;
    strip.prepend(img);
    while (strip.children.length > 4) strip.lastElementChild?.remove();
  };

  if (stage.bar) {
    select(stage.bar, 'type', ['png', 'jpg'] as const, 'png', (v) => (type = v));
    button(stage.bar, 'exportPng()', () => void shoot());
  }
  // Cards: the map rotates and a snapshot is taken every couple of seconds.
  if (stage.preview) {
    stage.frame((t) => scene.setRotation((t * 20) % 360));
    stage.every(1800, () => void shoot());
  }

  return () => stage.dispose();
};

export default mount;
