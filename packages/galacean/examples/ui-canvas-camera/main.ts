// UICanvas in ScreenSpaceCamera mode: renderCamera and distance
import { PrimitiveMesh } from '@galacean/engine';
import { CanvasRenderMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { add, blinn, orbit, spin, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { mode: CanvasRenderMode.ScreenSpaceCamera });
  const { stage, root, camera, canvasEntity, canvas } = ui;
  // Cubes at several depths: the UI sits at canvas.distance, so nearer cubes hide it and farther ones don't.
  for (const z of [3, 0, -3]) spin(add(root, PrimitiveMesh.createCuboid(stage.engine, 1.4, 1.4, 1.4), blinn(stage.engine, [0.4 + (3 - z) * 0.1, 0.7, 0.9]), [z * 0.6, 0, z], 'cube').entity, [30, 20, 0]);
  orbit(camera.entity, [0, 0, 0], 9, 1.5, 0.25);
  canvas.distance = 6;
  image(canvasEntity, 0, 0, 380, 110, { color: [0.9, 0.5, 0.1, 0.8] }, 'panel');
  const text = label(canvasEntity, 0, 0, '', 22).text;
  const note = (): void => void (text.text = `renderCamera set, distance = ${canvas.distance.toFixed(1)}`);
  if (stage.preview) tick(root, (_dt, t) => ((canvas.distance = 5 + 4 * (0.5 + 0.5 * Math.sin(t * 0.7))), note()));
  else {
    slider(stage.bar, 'distance', 1, 14, 0.1, 6, (v) => ((canvas.distance = v), note()));
    note();
  }
  return stage.dispose;
};

export default mount;
