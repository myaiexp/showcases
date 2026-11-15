// isSRGBColorSpace on a Texture2D: colour data versus linear data
import { MeshRenderer, Texture2D, TextureFormat, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, quadMesh } from '../../shared/gfx-kit.ts';
import { paint } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 7], light: false, hint: 'Normal maps and other data textures should use isSRGBColorSpace = false.' });
  const say = caption(stage);
  const ramp = paint(256, (g, s) => {
    const grad = g.createLinearGradient(0, 0, s, 0);
    grad.addColorStop(0, '#000');
    grad.addColorStop(1, '#fff');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    g.fillStyle = '#808080';
    g.fillRect(0, s * 0.78, s, s * 0.12);
  });
  const textures = [true, false].map((srgb) => {
    const t = new Texture2D(engine, 256, 256, TextureFormat.R8G8B8A8, true, srgb);
    t.setImageSource(ramp);
    t.generateMipmaps();
    return t;
  });
  const quads = textures.map((t, i) => {
    const m = new UnlitMaterial(engine);
    m.baseTexture = t;
    const e = root.createChild(i === 0 ? 'sRGB' : 'linear');
    e.transform.setPosition((i - 0.5) * 3.6, 0, 0);
    const r = e.addComponent(MeshRenderer);
    r.mesh = quadMesh(engine, 3.2, 3.2);
    r.setMaterial(m);
    return r;
  });
  say('left isSRGBColorSpace = true   right isSRGBColorSpace = false (the box at 78% is #808080)');
  stage.own(() => {
    textures.forEach((t) => t.destroy());
    quads.forEach((q) => q.mesh.destroy());
  });
  return stage.dispose;
};

export default mount;
