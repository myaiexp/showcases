// BlinnPhongMaterial.emissiveColor x emissiveTexture renders colour without light
import { BlinnPhongMaterial, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, tick } from '../../shared/gfx-kit.ts';
import { color } from '../../shared/controls.ts';
import { matDemo } from '../../shared/mat-demo.ts';
import { glowGrid } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await matDemo(el, ctx, { env: false, light: false, sway: 0, hint: 'No light at all: left emissiveColor, right emissiveTexture x emissiveColor.' });
  caption(stage, 'emissiveColor | emissiveTexture');
  const mesh = PrimitiveMesh.createSphere(engine, 1.3, 48);
  const plain = new BlinnPhongMaterial(engine);
  plain.baseColor.set(0.02, 0.02, 0.02, 1);
  plain.emissiveColor.set(...lin([0.3, 0.8, 1]), 1);
  const textured = new BlinnPhongMaterial(engine);
  textured.baseColor.set(0.02, 0.02, 0.02, 1);
  textured.emissiveTexture = glowGrid(engine, 8);
  textured.emissiveColor.set(1, 1, 1, 1);
  const a = add(root, mesh, plain, [-1.8, 0, 0]);
  const b = add(root, mesh, textured, [1.8, 0, 0]);
  tick(b.entity, (dt) => b.entity.transform.rotate(10 * dt, 30 * dt, 0));
  tick(a.entity, (dt) => a.entity.transform.rotate(0, 30 * dt, 0));
  if (stage.preview) tick(root, (_dt, t) => plain.emissiveColor.set(...lin([0.3, 0.8, 1]).map((c) => c * (0.4 + 0.6 * (0.5 + 0.5 * Math.sin(t * 2)))) as [number, number, number], 1));
  else color(stage.bar, 'emissiveColor', [0.3, 0.8, 1], (c) => plain.emissiveColor.set(...lin(c), 1));
  return stage.dispose;
};

export default mount;
