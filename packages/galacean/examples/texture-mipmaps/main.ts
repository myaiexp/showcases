// Texture2D mipmap flag and generateMipmaps: far texels are averaged or aliased
import { PrimitiveMesh, Texture2D, TextureFilterMode, TextureWrapMode, UnlitMaterial, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, orbit } from '../../shared/gfx-kit.ts';
import { checker, paint } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 1, 4], target: [0, 0, -8], light: false });
  const say = caption(stage);
  const make = (mipmap: boolean): Texture2D => {
    const t = new Texture2D(engine, 256, 256, undefined, mipmap);
    t.setImageSource(paint(256, checker('#f4f0e4', '#202a40', 64)));
    if (mipmap) t.generateMipmaps();
    t.filterMode = mipmap ? TextureFilterMode.Trilinear : TextureFilterMode.Bilinear;
    t.wrapModeU = t.wrapModeV = TextureWrapMode.Repeat;
    return t;
  };
  const textures = [make(true), make(false)];
  const floors = textures.map((tex, i) => {
    const m = new UnlitMaterial(engine);
    m.baseTexture = tex;
    m.tilingOffset = new Vector4(2, 30, 0, 0);
    return add(root, PrimitiveMesh.createPlane(engine, 3.5, 60), m, [(i - 0.5) * 3.8, 0, -28], 'floor');
  });
  say(`left: mipmap ${textures[0]!.mipmapCount} levels   right: ${textures[1]!.mipmapCount} level`);
  orbit(camera.entity, [0, 0, -8], 0.6, 1.2, 0.4);
  stage.own(() => {
    textures.forEach((t) => t.destroy());
    floors.forEach((f) => f.renderer.mesh.destroy());
  });
  return stage.dispose;
};

export default mount;
