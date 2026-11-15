// setImageSource inside onUpdate, with a Dynamic texture and no mipmaps
import { MeshRenderer, PrimitiveMesh, Texture2D, TextureFormat, TextureUsage, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, demo, spin, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root } = await demo(el, ctx, { camera: [0, 1.2, 5], light: false });
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const g = canvas.getContext('2d')!;
  const texture = new Texture2D(engine, 256, 256, TextureFormat.R8G8B8A8, false, true, TextureUsage.Dynamic);
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const cube = add(root, PrimitiveMesh.createCuboid(engine, 2.4, 2.4, 2.4), material, [0, 0, 0], 'clock cube');
  spin(cube.entity, [10, 25, 0]);
  tick(cube.entity, (_dt, t) => {
    g.fillStyle = '#141a2b';
    g.fillRect(0, 0, 256, 256);
    g.strokeStyle = '#e9dcc0';
    g.lineWidth = 6;
    g.beginPath();
    g.arc(128, 128, 112, 0, Math.PI * 2);
    g.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      g.beginPath();
      g.moveTo(128 + Math.sin(a) * 96, 128 - Math.cos(a) * 96);
      g.lineTo(128 + Math.sin(a) * 108, 128 - Math.cos(a) * 108);
      g.stroke();
    }
    const hand = (turns: number, length: number, width: number, color: string): void => {
      g.strokeStyle = color;
      g.lineWidth = width;
      g.beginPath();
      g.moveTo(128, 128);
      g.lineTo(128 + Math.sin(turns * Math.PI * 2) * length, 128 - Math.cos(turns * Math.PI * 2) * length);
      g.stroke();
    };
    hand(t / 60, 100, 4, '#f4a259');
    hand(t / 720, 70, 8, '#e9dcc0');
    texture.setImageSource(canvas);
  });
  stage.own(() => {
    cube.renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
