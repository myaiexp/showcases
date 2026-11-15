// setPixelBuffer(data, mipLevel, x, y, width, height): partial texture updates
import { MeshRenderer, Texture2D, TextureFilterMode, TextureFormat, TextureUsage, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, quadMesh, tick } from '../../shared/gfx-kit.ts';
import { button } from '../../shared/controls.ts';
import { planePointer } from '../../shared/gfx-input.ts';

const N = 128;
const BRUSH = 8;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 6], light: false, hint: 'Drag on the canvas to paint.' });
  const say = caption(stage);
  const texture = new Texture2D(engine, N, N, TextureFormat.R8G8B8A8, false, true, TextureUsage.Dynamic);
  texture.filterMode = TextureFilterMode.Point;
  const blank = new Uint8Array(N * N * 4).fill(30);
  for (let i = 3; i < blank.length; i += 4) blank[i] = 255;
  texture.setPixelBuffer(blank);
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const screen = root.createChild('canvas');
  const renderer = screen.addComponent(MeshRenderer);
  renderer.mesh = quadMesh(engine, 4.4, 4.4);
  renderer.setMaterial(material);
  let dabs = 0;
  let hue = 0;
  const block = new Uint8Array(BRUSH * BRUSH * 4);
  const dab = (px: number, py: number): void => {
    const x = Math.max(0, Math.min(N - BRUSH, Math.round(px - BRUSH / 2)));
    const y = Math.max(0, Math.min(N - BRUSH, Math.round(py - BRUSH / 2)));
    hue = (hue + 2) % 360;
    const c = hsl(hue);
    for (let i = 0; i < BRUSH * BRUSH; i++) block.set([c[0], c[1], c[2], 255], i * 4);
    texture.setPixelBuffer(block, 0, x, y, BRUSH, BRUSH);
    dabs++;
    say(`setPixelBuffer(block, 0, ${x}, ${y}, ${BRUSH}, ${BRUSH})   ${dabs} dabs`);
  };
  planePointer(stage, camera, (x, y, down) => {
    if (down) dab((x / 4.4 + 0.5) * N, (0.5 - y / 4.4) * N);
  });
  if (!stage.preview) button(stage.bar, 'Clear', () => texture.setPixelBuffer(blank));
  tick(screen, (_dt, t) => {
    if (!stage.preview) return;
    const a = t * 3;
    const r = (t * 6) % 56;
    dab(N / 2 + Math.cos(a) * r, N / 2 + Math.sin(a) * r);
    if (r < 0.5 && t > 1) texture.setPixelBuffer(blank);
  });
  stage.own(() => {
    renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

function hsl(h: number): [number, number, number] {
  const f = (n: number): number => Math.round(255 * (0.55 + 0.4 * Math.cos(((h + n) / 360) * 6.283)));
  return [f(0), f(120), f(240)];
}

export default mount;
