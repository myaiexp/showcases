// PBRMaterial.ior sets how reflective a non-metal surface is
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'ior 1.0 to 2.6, metallic 0, roughness 0.1.' });
  const say = caption(stage);
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.15, 0.2, 0.3]), 1);
    m.metallic = 0;
    m.roughness = 0.1;
    m.ior = 1 + 1.6 * t;
    return m;
  });
  say('ior 1.0 .. 2.6');
  const offset = (v: number): void => {
    balls.forEach((b, i) => (b.material.ior = Math.max(1, 1 + 1.6 * (i / 4) + v)));
    say(`ior 1.0 .. 2.6   shift ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => offset(-0.5 + t));
  else slider(stage.bar, 'ior shift', -0.5, 0.5, 0.01, 0, offset);
  return stage.dispose;
};

export default mount;
