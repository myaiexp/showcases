// UICanvas in ScreenSpaceOverlay mode: drawn over the whole frame
import { CanvasRenderMode } from '@galacean/engine-ui';
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, blinn, orbit, spin } from '../../shared/gfx-kit.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { mode: CanvasRenderMode.ScreenSpaceOverlay });
  const { stage, root, camera, canvasEntity } = ui;
  const cube = add(root, PrimitiveMesh.createCuboid(stage.engine, 1.6, 1.6, 1.6), blinn(stage.engine, [0.9, 0.5, 0.3]), [0, 0, 0], 'cube');
  spin(cube.entity, [20, 40, 0]);
  orbit(camera.entity, [0, 0, 0], 6, 2, 0.5);
  image(canvasEntity, 0, 0, 340, 120, { color: [0.1, 0.3, 0.8, 0.55] }, 'panel');
  label(canvasEntity, 0, 0, 'renderMode = ScreenSpaceOverlay', 24);
  label(canvasEntity, 0, -150, 'the camera orbits; the UI does not move', 20);
  return stage.dispose;
};

export default mount;
