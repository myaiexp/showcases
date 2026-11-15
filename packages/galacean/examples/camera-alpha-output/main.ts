// A transparent background and isAlphaOutputRequired: the canvas lets the page through
import { PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, pbr, spin } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 6], background: [0, 0, 0, 0], config: { graphicDeviceOptions: { alpha: true } }, hint: 'The stripes are CSS behind the canvas.' });
  const say = caption(stage);
  stage.canvas.style.background = 'repeating-linear-gradient(45deg,#2a3550 0 14px,#1a2236 14px 28px)';
  spin(add(root, PrimitiveMesh.createTorus(engine, 1.2, 0.45, 24, 48), pbr(engine, [0.95, 0.55, 0.3], 0.1, 0.35)).entity, [20, 35, 0]);
  const apply = (v: boolean): void => {
    camera.isAlphaOutputRequired = v;
    say(`isAlphaOutputRequired = ${v}, solidColor alpha 0`);
  };
  apply(true);
  if (!stage.preview) checkbox(stage.bar, 'isAlphaOutputRequired', true, apply);
  return stage.dispose;
};

export default mount;
