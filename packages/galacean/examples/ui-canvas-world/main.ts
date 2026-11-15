// UICanvas in WorldSpace mode: a panel placed in the 3D scene
import { PrimitiveMesh } from '@galacean/engine';
import { CanvasRenderMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { add, blinn, floor, orbit, sun, tick } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { image, label, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { mode: CanvasRenderMode.WorldSpace });
  const { stage, root, camera, canvasEntity } = ui;
  sun(root);
  floor(root, stage.engine, -1.5, 10);
  add(root, PrimitiveMesh.createSphere(stage.engine, 0.7, 24), blinn(stage.engine, [0.9, 0.4, 0.4]), [-2.2, -0.8, 0.5], 'sphere');
  // A world canvas is sized by its entity: 1 canvas unit is 1 world unit until you scale it, so 0.01 gives 100 per unit.
  canvasEntity.transform.setScale(0.01, 0.01, 0.01);
  canvasEntity.transform.setPosition(0, 0.3, 0);
  canvasEntity.transform.setRotation(0, 180, 0); // a UI canvas faces -Z: turn it round to face a camera on +Z
  image(canvasEntity, 0, 0, 340, 200, { color: [0.15, 0.3, 0.7, 0.9] }, 'panel');
  label(canvasEntity, 0, 40, 'WorldSpace canvas', 30);
  label(canvasEntity, 0, -30, 'a panel in the scene', 22);
  orbit(camera.entity, [0, 0.3, 0], 6, 1.5, 0.35);
  if (stage.preview) tick(canvasEntity, (_dt, t) => canvasEntity.transform.setRotation(0, 180 + Math.sin(t * 0.8) * 25, 0));
  else slider(stage.bar, 'canvas rotation y', -80, 80, 1, 0, (v) => canvasEntity.transform.setRotation(0, 180 + v, 0));
  return stage.dispose;
};

export default mount;
