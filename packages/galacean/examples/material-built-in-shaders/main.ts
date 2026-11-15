// PBR, Blinn-Phong and Unlit materials on one shape under a moving light
import { BlinnPhongMaterial, PBRMaterial, PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, tick } from '../../shared/gfx-kit.ts';
import { matDemo } from '../../shared/mat-demo.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, light } = await matDemo(el, ctx, { sway: 0, hint: 'PBRMaterial | BlinnPhongMaterial | UnlitMaterial under the same orbiting sun.' });
  caption(stage, 'PBR | Blinn-Phong | Unlit');
  const color = lin([0.3, 0.6, 0.95]);
  const pbr = new PBRMaterial(engine);
  pbr.baseColor.set(...color, 1);
  pbr.metallic = 0.2;
  pbr.roughness = 0.35;
  const blinn = new BlinnPhongMaterial(engine);
  blinn.baseColor.set(...color, 1);
  blinn.shininess = 60;
  const unlit = new UnlitMaterial(engine);
  unlit.baseColor.set(...color, 1);
  const mesh = PrimitiveMesh.createSphere(engine, 1.1, 48);
  [pbr, blinn, unlit].forEach((m, i) => add(root, mesh, m, [(i - 1) * 3, 0, 0]));
  tick(light.entity, (_dt, t) => light.entity.transform.setRotation(-35, t * 60, 0));
  return stage.dispose;
};

export default mount;
