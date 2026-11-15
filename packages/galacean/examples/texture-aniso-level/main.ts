// Texture.anisoLevel: sharper textures when viewed at an angle
import { PrimitiveMesh, TextureFilterMode, UnlitMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, steps } from '../../shared/gfx-kit.ts';
import { slider } from '../../shared/controls.ts';
import { canvasTexture, checker } from '../../shared/textures.ts';

const LEVELS = [1, 2, 4, 8, 16];

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0.8, 3], target: [0, 0, -8], light: false });
  const say = caption(stage);
  const texture = canvasTexture(engine, checker('#f0e6d0', '#2c3a55', 16), { size: 512 });
  texture.filterMode = TextureFilterMode.Trilinear;
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  material.tilingOffset = new Vector4(10, 40, 0, 0);
  const floor = add(root, PrimitiveMesh.createPlane(engine, 12, 60), material, [0, 0, -24], 'floor');
  const apply = (level: number): void => {
    texture.anisoLevel = level;
    say(`anisoLevel = ${texture.anisoLevel}`);
  };
  if (stage.preview) steps(root, 2, LEVELS.length, (i) => apply(LEVELS[i]!));
  else {
    apply(1);
    slider(stage.bar, 'anisoLevel', 1, 16, 1, 1, apply);
  }
  stage.own(() => {
    floor.renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
