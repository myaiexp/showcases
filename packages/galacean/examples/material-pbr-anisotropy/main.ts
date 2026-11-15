// PBRMaterial.anisotropy stretches the highlight of a brushed metal
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'anisotropy 0, 0.25, 0.5, 0.75, 1 on metal.' });
  const say = caption(stage, 'anisotropy 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.85, 0.85, 0.9]), 1);
    m.metallic = 1;
    m.roughness = 0.35;
    m.anisotropy = t;
    return m;
  });
  const rough = (v: number): void => {
    for (const b of balls) b.material.roughness = v;
    say(`anisotropy 0 .. 1   roughness ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => rough(0.2 + 0.4 * t));
  else slider(stage.bar, 'roughness', 0.05, 1, 0.01, 0.35, rough);
  return stage.dispose;
};

export default mount;
