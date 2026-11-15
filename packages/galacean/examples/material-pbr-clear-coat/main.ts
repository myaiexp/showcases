// PBRMaterial.clearCoat adds a glossy varnish layer over the base material
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { ballRow, matDemo, pingPong } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { hint: 'clearCoat 0, 0.25, 0.5, 0.75, 1 over a rough base.' });
  const say = caption(stage, 'clearCoat 0 .. 1');
  const balls = ballRow(root, engine, 5, (t) => {
    const m = new PBRMaterial(engine);
    m.baseColor.set(...lin([0.8, 0.12, 0.1]), 1);
    m.metallic = 0.8;
    m.roughness = 0.6;
    m.clearCoat = t;
    m.clearCoatRoughness = 0.03;
    return m;
  });
  const rough = (v: number): void => {
    for (const b of balls) b.material.roughness = v;
    say(`clearCoat 0 .. 1   base roughness ${v.toFixed(2)}`);
  };
  if (stage.preview) pingPong(root, 6, (t) => rough(0.3 + 0.6 * t));
  else slider(stage.bar, 'base roughness', 0, 1, 0.01, 0.6, rough);
  return stage.dispose;
};

export default mount;
