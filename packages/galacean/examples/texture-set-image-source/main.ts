// setImageSource(source, mipLevel, flipY) feeds a canvas to a texture
import { MeshRenderer, Texture2D, TextureFormat, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, quadMesh, steps } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { paint } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 6], light: false });
  const say = caption(stage);
  const canvas = paint(256, (g, s) => {
    const grad = g.createLinearGradient(0, 0, s, s);
    grad.addColorStop(0, '#2d4a8a');
    grad.addColorStop(1, '#e68a4b');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    g.fillStyle = '#fff';
    g.font = `bold ${s / 3}px sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('F', s / 2, s / 2);
    g.fillRect(8, 8, s / 6, s / 6);
  });
  const texture = new Texture2D(engine, 256, 256, TextureFormat.R8G8B8A8, false);
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const quad = root.createChild('quad');
  const renderer = quad.addComponent(MeshRenderer);
  renderer.mesh = quadMesh(engine, 4, 4);
  renderer.setMaterial(material);
  const apply = (flip: boolean): void => {
    texture.setImageSource(canvas, 0, flip);
    say(`setImageSource(canvas, 0, ${flip})`);
  };
  if (stage.preview) steps(quad, 2, 2, (i) => apply(i === 1));
  else {
    apply(false);
    checkbox(stage.bar, 'flipY', false, apply);
  }
  stage.own(() => {
    renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
