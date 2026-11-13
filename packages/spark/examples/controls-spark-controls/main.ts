// SparkControls: keyboard, mouse and touch navigation through a splat garden
import { SparkControls, SplatMesh } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { overlay, readout } from '../../shared/controls.ts';
import { pushGarden } from '../../shared/subjects.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0.6, 3.2], target: [0, 0.4, 0], orbit: false });
  const { camera, canvas } = stage;
  stage.scene.add(new SplatMesh({ constructSplats: (splats) => pushGarden(splats, ctx.preview ? 25000 : 60000) }));

  if (ctx.preview) {
    // No input in a card: walk the camera slowly around the garden instead.
    stage.run((time) => {
      const a = time * 0.25;
      camera.position.set(Math.sin(a) * 2.6, 0.6 + Math.sin(time * 0.5) * 0.2, Math.cos(a) * 2.6);
      camera.lookAt(0, 0.4, 0);
    });
    return () => stage.dispose();
  }

  // One object bundles FpsMovement (keys, gamepad) and PointerControls (mouse, touch, wheel).
  const controls = new SparkControls({ canvas });
  overlay(el, 'WASD / arrows: move   Q E: roll   drag: look   right-drag: slide   wheel: forward\nShift ×5   Ctrl ×0.2   Caps Lock ×10');
  const pose = readout(el);

  stage.run(() => {
    controls.update(camera);
    const p = camera.position;
    pose.textContent = `camera at ${p.x.toFixed(2)}, ${p.y.toFixed(2)}, ${p.z.toFixed(2)}`;
  });
  return () => {
    // SparkControls has no dispose(): its document key and pointer listeners stay
    // attached, so switch both halves off before the canvas goes.
    controls.fpsMovement.enable = false;
    controls.pointerControls.enable = false;
    stage.dispose();
  };
};

export default mount;
