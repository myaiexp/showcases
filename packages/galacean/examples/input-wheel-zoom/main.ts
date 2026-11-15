// inputManager.wheelDelta, the scroll change of this frame, dollies a camera
import { MathUtil, PrimitiveMesh, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Scroll the wheel over the canvas to zoom. Cards feed a scripted wheel through the same code.' });
  const { engine, root, canvas } = stage;
  const camera = lit(stage, [0, 1.5, 9]);
  const ring = solid(root, PrimitiveMesh.createTorus(engine, 1.3, 0.4, 24, 32), phong(engine, PALETTE.violet));
  solid(ring, PrimitiveMesh.createSphere(engine, 0.5, 20), phong(engine, PALETTE.amber));
  const info = panel(stage, 'bl');
  if (!stage.preview) {
    const stop = (e: WheelEvent): void => e.preventDefault();
    canvas.addEventListener('wheel', stop, { passive: false });
    stage.own(() => canvas.removeEventListener('wheel', stop));
  }
  let distance = 9;
  tick(root, (dt, t) => {
    ring.transform.rotate(20 * dt, 35 * dt, 0);
    const delta = stage.preview ? new Vector3(0, Math.cos(t * 0.8) * 120, 0) : engine.inputManager.wheelDelta;
    const dy = delta?.y ?? 0;
    distance = MathUtil.clamp(distance + (stage.preview ? dy * dt : dy) * 0.01, 3.5, 14);
    camera.entity.transform.setPosition(0, 1.5, distance);
    info.text(`wheelDelta.y ${dy.toFixed(0)}\ncamera distance ${distance.toFixed(1)}`);
  });
  return stage.dispose;
};

export default mount;
