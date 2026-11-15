// PBRMaterial.roughness from mirror-sharp to fully blurred reflections
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'roughness runs 0, 0.25, 0.5, 0.75, 1 along the row.' });
  const say = caption(stage, 'roughness 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.8, 0.85, 0.95]), 1);
    m.metallic = 1;
    m.roughness = t;
    return m;
  });
  const setMetallic = (v: number): void => {
    for (const b of balls) b.material.metallic = v;
    say(`roughness 0 .. 1   metallic ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => setMetallic(1 - 0.8 * t));
  else slider(stage.bar, 'metallic', 0, 1, 0.01, 1, setMetallic);
  return stage.dispose;
};

export default mount;
