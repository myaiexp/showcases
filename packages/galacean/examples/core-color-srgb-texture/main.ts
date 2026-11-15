// The same ramp as an sRGB colour texture and as a linear data texture
import { type Entity, PrimitiveMesh, Texture2D, TextureWrapMode, UnlitMaterial, Vector3 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, solid, tick } from '../../shared/core-kit.ts';
import { labels, panel } from '../../shared/core-ui.ts';
import { paint } from '../../shared/textures.ts';
import { createStage } from '../../shared/stage.ts';

const ramp = (g: CanvasRenderingContext2D, size: number): void => {
  const steps = 10;
  for (let i = 0; i < steps; i++) {
    const v = Math.round((i / (steps - 1)) * 255);
    g.fillStyle = `rgb(${v},${v},${v})`;
    g.fillRect((i * size) / steps, 0, size / steps + 1, size);
  }
  g.fillStyle = '#f0883e';
  g.fillRect(0, size * 0.78, size, size * 0.22);
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Both textures hold identical pixels. Only the sRGB one is decoded to linear light before shading, as colour images should be.' });
  const { engine, root } = stage;
  const camera = lit(stage, [0, 0, 8]);
  const tag = labels(stage, camera);
  const quad = PrimitiveMesh.createPlane(engine, 3.6, 3.6);
  const planes: Entity[] = [];
  const make = (srgb: boolean, x: number): void => {
    const texture = new Texture2D(engine, 256, 256, undefined, true, srgb);
    texture.setImageSource(paint(256, ramp));
    texture.generateMipmaps();
    texture.wrapModeU = texture.wrapModeV = TextureWrapMode.Clamp;
    const material = new UnlitMaterial(engine);
    material.baseTexture = texture;
    const e = solid(root, quad, material, [x, 0, 0]);
    e.transform.setRotation(90, 0, 0);
    planes.push(e);
  };
  make(true, -2.1);
  make(false, 2.1);
  const a = tag.add('isSRGBColorSpace: true', '#cfd6e4');
  const b = tag.add('isSRGBColorSpace: false', '#cfd6e4');
  const info = panel(stage, 'bl');
  info.text('new Texture2D(engine, w, h, format, mipmap, isSRGBColorSpace)');
  tick(root, (_dt, t) => {
    planes.forEach((e, i) => e.transform.setRotation(90 - Math.sin(t * 0.8 + i) * 18, Math.sin(t * 0.5 + i) * 14, 0));
    a.at(new Vector3(-2.1, 2, 0));
    b.at(new Vector3(2.1, 2, 0));
  });
  return stage.dispose;
};

export default mount;
