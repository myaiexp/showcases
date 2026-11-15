// PBRMaterial.metallic from dielectric to metal across a row of spheres
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'metallic runs 0, 0.25, 0.5, 0.75, 1 along the row.' });
  const say = caption(stage, 'metallic 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.95, 0.6, 0.25]), 1);
    m.metallic = t;
    m.roughness = 0.25;
    return m;
  });
  const setRoughness = (v: number): void => {
    for (const b of balls) b.material.roughness = v;
    say(`metallic 0 .. 1   roughness ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => setRoughness(0.1 + 0.5 * t));
  else slider(stage.bar, 'roughness', 0, 1, 0.01, 0.25, setRoughness);
  return stage.dispose;
};

export default mount;
