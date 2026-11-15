// A background texture refreshed every frame with setImageSource
import { BackgroundMode, BackgroundTextureFillMode, PrimitiveMesh, Texture2D, TextureFormat, TextureUsage } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, pbr, spin, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 0, 6] });
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const g = canvas.getContext('2d')!;
  const texture = new Texture2D(engine, 512, 256, TextureFormat.R8G8B8A8, false, true, TextureUsage.Dynamic);
  stage.own(() => texture.destroy());
  const { background } = stage.scene;
  background.mode = BackgroundMode.Texture;
  background.texture = texture;
  background.textureFillMode = BackgroundTextureFillMode.Fill;
  spin(add(root, PrimitiveMesh.createTorus(engine, 0.9, 0.35, 24, 48), pbr(engine, [0.95, 0.95, 0.95], 0.3, 0.3)).entity, [20, 30, 0]);
  tick(root, (_dt, t) => {
    g.fillStyle = '#10162a';
    g.fillRect(0, 0, 512, 256);
    for (let i = 0; i < 7; i++) {
      const hue = (i * 50 + t * 40) % 360;
      g.fillStyle = `hsl(${hue} 70% 55%)`;
      g.beginPath();
      g.arc(256 + Math.sin(t * 0.7 + i) * 200, 128 + Math.cos(t * 0.9 + i * 1.7) * 90, 26 + 10 * Math.sin(t + i), 0, Math.PI * 2);
      g.fill();
    }
    texture.setImageSource(canvas);
  });
  return stage.dispose;
};

export default mount;
