// PBRMaterial.clearCoatRoughness blurs only the clear coat layer
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'clearCoat 1; clearCoatRoughness 0, 0.25, 0.5, 0.75, 1.' });
  const say = caption(stage, 'clearCoatRoughness 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.1, 0.3, 0.8]), 1);
    m.metallic = 0.6;
    m.roughness = 0.5;
    m.clearCoat = 1;
    m.clearCoatRoughness = t;
    return m;
  });
  const coat = (v: number): void => {
    for (const b of balls) b.material.clearCoat = v;
    say(`clearCoatRoughness 0 .. 1   clearCoat ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => coat(1 - 0.7 * t));
  else slider(stage.bar, 'clearCoat', 0, 1, 0.01, 1, coat);
  return stage.dispose;
};

export default mount;
