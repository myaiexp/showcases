// PBRMaterial.iridescenceIOR changes the thin film's index of refraction
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { sway: 3, hint: 'iridescence 1; iridescenceIOR 1.0 to 2.3 along the row.' });
  const say = caption(stage, 'iridescenceIOR 1.0 .. 2.3');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.9, 0.9, 0.92]), 1);
    m.metallic = 1;
    m.roughness = 0.1;
    m.iridescence = 1;
    m.iridescenceIOR = 1 + 1.3 * t;
    return m;
  });
  const shift = (v: number): void => {
    balls.forEach((b, i) => (b.material.iridescenceIOR = Math.max(1, 1 + 1.3 * (i / 4) + v)));
    say(`iridescenceIOR 1.0 .. 2.3   shift ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => shift(-0.4 + 0.8 * t));
  else slider(stage.bar, 'IOR shift', -0.5, 0.5, 0.01, 0, shift);
  return stage.dispose;
};

export default mount;
