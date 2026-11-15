// Scene lifecycle events: loaded once at start, resize when the container changes size
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { eventBoard } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const EVENTS = ['loaded', 'maploaded', 'resize'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [20, 30], zoom: 1 }),
  });
  // Listeners bound before 'loaded' see it fire once.
  const flash = eventBoard(stage.container, EVENTS);
  for (const name of EVENTS) scene.on(name, () => flash(name));
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  scene.addLayer(new PointLayer().source(cityFeatures()).shape('circle').size(5).color('#ffb347'));

  // Changing the container's size makes the scene resize its canvas and fire 'resize'.
  const box = stage.container;
  const widths = ['100%', '70%', '85%'];
  const resize = (i: number): void => {
    box.style.width = widths[i % widths.length]!;
  };
  if (stage.bar) button(stage.bar, 'Resize the container', (() => {
    let i = 0;
    return () => resize(++i);
  })());
  if (stage.preview) stage.every(1500, resize);

  return () => stage.dispose();
};

export default mount;
