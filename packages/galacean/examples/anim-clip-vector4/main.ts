// A Vector4 curve on "material.tilingOffset" scrolls a texture with no script running
import { AnimationClip, AnimationVector4Curve, MeshRenderer, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { cubeStage, keys, playClip } from '../../shared/anim-kit.ts';
import { canvasTexture, uvGrid } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, cube, material, say } = await cubeStage(el, ctx, { size: 2 });
  material.baseTexture = canvasTexture(engine, uvGrid, { size: 256 });
  material.baseColor.set(1, 1, 1, 1);
  const clip = new AnimationClip('scroll');
  const curve = new AnimationVector4Curve();
  keys(curve, [[0, new Vector4(2, 2, 0, 0)], [3, new Vector4(2, 2, 1, 0.5)], [6, new Vector4(3, 1, 2, 1)]]);
  clip.addCurveBinding('', MeshRenderer, 'material.tilingOffset', curve);
  playClip(engine, cube, clip);
  cube.transform.setRotation(15, 30, 0);
  say('"material.tilingOffset" (x, y scale, z, w offset) animated');
  return stage.dispose;
};

export default mount;
