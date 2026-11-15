// PBRMaterial.sheenRoughness tightens or widens the sheen
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'sheenRoughness 0, 0.25, 0.5, 0.75, 1.' });
  const say = caption(stage, 'sheenRoughness 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.1, 0.12, 0.25]), 1);
    m.metallic = 0;
    m.roughness = 0.9;
    m.sheenColor.set(1, 1, 1, 1);
    m.sheenRoughness = t;
    return m;
  });
  const base = (v: number): void => {
    for (const b of balls) b.material.baseColor.set(...lin([v, v * 1.2, v * 2.5]), 1);
    say(`sheenRoughness 0 .. 1   base ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => base(0.05 + 0.3 * t));
  else slider(stage.bar, 'base brightness', 0.02, 0.4, 0.01, 0.1, base);
  return stage.dispose;
};

export default mount;
