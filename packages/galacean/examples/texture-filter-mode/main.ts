// Texture.filterMode: Point, Bilinear, Trilinear
import { PrimitiveMesh, TextureFilterMode, UnlitMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, steps } from '../../shared/gfx-kit.ts';
import { select } from '../../shared/controls.ts';
import { canvasTexture, checker } from '../../shared/textures.ts';

const MODES = ['Point', 'Bilinear', 'Trilinear'] as const;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.2, 3], target: [0, 0, -4], light: false });
  const say = caption(stage);
  const texture = canvasTexture(engine, checker('#f0e6d0', '#2c3a55', 8), { size: 16 });
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  material.tilingOffset = new Vector4(3, 12, 0, 0);
  const floor = add(root, PrimitiveMesh.createPlane(engine, 8, 40), material, [0, 0, -14], 'floor');
  const apply = (m: (typeof MODES)[number]): void => {
    texture.filterMode = TextureFilterMode[m];
    say(`filterMode = TextureFilterMode.${m}`);
  };
  if (stage.preview) steps(root, 2.2, MODES.length, (i) => apply(MODES[i]!));
  else {
    apply('Bilinear');
    select(stage.bar, 'filter mode', MODES, apply, 'Bilinear');
  }
  stage.own(() => {
    floor.renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
