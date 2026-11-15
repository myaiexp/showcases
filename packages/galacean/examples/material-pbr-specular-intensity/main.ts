// PBRMaterial.specularIntensity scales the specular reflection of a non-metal
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'specularIntensity 0, 0.25, 0.5, 0.75, 1 (the docs call it specular).' });
  const say = caption(stage, 'specularIntensity 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.7, 0.2, 0.2]), 1);
    m.metallic = 0;
    m.roughness = 0.2;
    m.specularIntensity = t;
    return m;
  });
  const roughness = (v: number): void => {
    for (const b of balls) b.material.roughness = v;
    say(`specularIntensity 0 .. 1   roughness ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => roughness(0.05 + 0.45 * t));
  else slider(stage.bar, 'roughness', 0, 1, 0.01, 0.2, roughness);
  return stage.dispose;
};

export default mount;
