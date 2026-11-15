// PBRMaterial.transmissionTexture multiplies transmission by UV
import { PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, lin, spin } from '../../shared/gfx-kit.ts';
import { backdrop, matDemo } from '../../shared/mat-demo.ts';
import { stripeMask } from '../../shared/mat-maps.ts';
import { PrimitiveMesh } from '@galacean/engine';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await matDemo(el, ctx, { hint: 'transmission 1 x transmissionTexture stripes.' });
  camera.opaqueTextureEnabled = true;
  caption(stage, 'transmissionTexture');
  backdrop(root, engine);
  const m = new PBRMaterial(engine);
  m.baseColor.set(...lin([0.9, 0.95, 1]), 1);
  m.metallic = 0;
  m.roughness = 0.05;
  m.transmission = 1;
  m.transmissionTexture = stripeMask(engine, 8, false);
  spin(add(root, PrimitiveMesh.createSphere(engine, 1.5, 64), m).entity, [0, 25, 0]);
  return stage.dispose;
};

export default mount;
