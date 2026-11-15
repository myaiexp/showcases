// PBRMaterial.isTransparent makes baseColor alpha blend with the scene behind
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { backdrop, ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'isTransparent = true; baseColor alpha 0.1, 0.3, 0.55, 0.8, 1.' });
  const say = caption(stage, 'baseColor alpha 0.1 .. 1');
  backdrop(root, engine);
  const alphas = [0.1, 0.3, 0.55, 0.8, 1];
  const balls = ballRow(root, engine, 5, (_t, i) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.9, 0.3, 0.3]), alphas[i]!);
    m.metallic = 0;
    m.roughness = 0.3;
    m.isTransparent = true;
    return m;
  });
  const scale = (k: number): void => {
    balls.forEach((b, i) => (b.material.baseColor.a = Math.min(1, alphas[i]! * k)));
    say(`baseColor alpha x ${k.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 5, (t) => scale(0.4 + 1.6 * t));
  else slider(stage.bar, 'alpha scale', 0.2, 2, 0.01, 1, scale);
  return stage.dispose;
};

export default mount;
