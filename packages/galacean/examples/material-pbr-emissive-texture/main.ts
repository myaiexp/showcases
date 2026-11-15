// PBRMaterial.emissiveTexture times emissiveColor, unlit by any light
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, lin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';
import { glowGrid } from '../../shared/mat-maps.ts';
import { PrimitiveMesh } from '@galacean/engine';
import { add } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { env: false, light: false, sway: 0, hint: 'emissiveTexture x emissiveColor, no lights.' });
  caption(stage, 'emissiveTexture x emissiveColor');
  const m = new PBRMaterial(engine);
  m.baseColor.set(0.02, 0.02, 0.03, 1);
  m.emissiveTexture = glowGrid(engine, 8);
  m.emissiveColor.set(1, 1, 1, 1);
  const { entity } = add(root, PrimitiveMesh.createSphere(engine, 1.6, 64), m);
  tick(entity, (dt) => entity.transform.rotate(8 * dt, 25 * dt, 0));
  if (stage.preview) tick(root, (_dt, t) => m.emissiveColor.set(...lin([0.6 + 0.4 * Math.sin(t), 0.6 + 0.4 * Math.sin(t + 2), 0.6 + 0.4 * Math.sin(t + 4)]), 1));
  else color(stage.bar, 'emissiveColor', [1, 1, 1], (c) => m.emissiveColor.set(...lin(c), 1));
  return stage.dispose;
};

export default mount;
