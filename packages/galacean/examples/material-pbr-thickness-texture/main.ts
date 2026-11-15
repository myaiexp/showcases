// PBRMaterial.thicknessTexture varies the refraction thickness by UV
import { PBRMaterial, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, spin } from '../../shared/gfx-kit.ts';
import { backdrop, matDemo } from '../../shared/mat-demo.ts';
import { rampMask } from '../../shared/mat-maps.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await matDemo(el, ctx, { hint: 'thickness 2 x thicknessTexture (G channel ramp).' });
  camera.opaqueTextureEnabled = true;
  caption(stage, 'thicknessTexture');
  backdrop(root, engine);
  const m = new PBRMaterial(engine);
  m.baseColor.set(...lin([0.95, 0.97, 1]), 1);
  m.metallic = 0;
  m.roughness = 0.03;
  m.transmission = 1;
  m.thickness = 2;
  m.thicknessTexture = rampMask(engine);
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.5, 64), m).entity, [0, 25, 0]);
  return stage.dispose;
};

export default mount;
