// aspectRatio can be forced, and resetAspectRatio returns to the canvas size
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin, steps } from '../../shared/gfx-kit.ts';
import { button, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 6], hint: 'Setting aspectRatio is not recommended; resetAspectRatio restores the automatic value.' });
  const say = caption(stage);
  const ball = add(root, PrimitiveMesh.createSphere(engine, 1.3), pbr(engine, [0.4, 0.6, 0.95], 0, 0.5)).entity;
  spin(ball, [0, 30, 0]);
  const auto = (): void => {
    camera.resetAspectRatio();
    say(`automatic aspectRatio ${camera.aspectRatio.toFixed(2)}`);
  };
  const force = (v: number): void => {
    camera.aspectRatio = v;
    say(`aspectRatio = ${v.toFixed(2)}`);
  };
  if (stage.preview) steps(ball, 2, 4, (i) => (i === 0 ? auto() : force([0.6, 1, 3][i - 1]!)));
  else {
    auto();
    slider(stage.bar, 'aspectRatio', 0.3, 4, 0.05, camera.aspectRatio, force);
    button(stage.bar, 'resetAspectRatio()', auto);
  }
  return stage.dispose;
};

export default mount;
