// setEnableRender(false) freezes drawing; render() forces a single frame
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button, toggle } from '../../shared/controls.ts';
import { cityFeatures } from '../../shared/data.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [80, 25], zoom: ctx.preview ? 1 : 2 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);
  // A pulsing wave animation keeps the scene redrawing every frame.
  scene.addLayer(
    new PointLayer().source(cityFeatures()).shape('circle').size('pop', [12, 40]).color('#ff6b6b').animate(true).style({ opacity: 0.9 }),
  );
  const show = valuePanel(stage.container, 'tr');
  let enabled = true;
  const set = (on: boolean): void => {
    enabled = on;
    scene.setEnableRender(on);
    show({ 'setEnableRender': String(on) });
  };
  set(true);

  if (stage.bar) {
    toggle(stage.bar, 'setEnableRender', true, set);
    button(stage.bar, 'render() one frame', () => scene.render());
  }
  // Cards: rendering pauses and resumes; the waves freeze mid-pulse while it is off.
  if (stage.preview) stage.every(1600, () => set(!enabled));

  return () => stage.dispose();
};

export default mount;
