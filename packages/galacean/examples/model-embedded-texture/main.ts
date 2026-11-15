// A texture embedded in the .glb, reused as a Texture2D sub-asset
import { PrimitiveMesh, type PBRMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { panel } from '../../shared/core-ui.ts';
import { add, pbr, tick } from '../../shared/gfx-kit.ts';
import { NOOP, pngBytes, rig } from '../../shared/model-kit.ts';
import { texturedGlb } from '../../shared/model-gltf.ts';
import { bricks } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const png = await pngBytes(bricks(), 128);
  const r = await rig(el, ctx, () => texturedGlb(png, { scale: [1, 1] }), { camera: [0, 1.8, 6], target: [0, 1, 0] });
  if (!r) return NOOP;
  const { stage, engine, root, gltf, model } = r;
  model.transform.setPosition(-1.4, 0, 0);
  // glTF.textures holds every image as a Texture2D; the second ball borrows the first one.
  const texture = gltf.textures![0]!;
  const ball = pbr(engine, [1, 1, 1], 0, 0.5) as PBRMaterial;
  ball.baseTexture = texture;
  const sphere = add(root, PrimitiveMesh.createSphere(engine, 0.8, 32), ball, [1.4, 1, 0], 'borrowed').entity;
  panel(stage).text(`glTF.textures: ${gltf.textures!.length}\nTexture2D ${texture.width} x ${texture.height}\nreused on a sphere outside the model`);
  tick(root, (dt) => {
    model.transform.rotate(0, 20 * dt, 0);
    sphere.transform.rotate(0, 20 * dt, 0);
  });
  return stage.dispose;
};

export default mount;
