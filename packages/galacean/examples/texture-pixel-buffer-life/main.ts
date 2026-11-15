// Texture2D.setPixelBuffer with raw RGBA bytes, one generation at a time
import { MeshRenderer, Texture2D, TextureFilterMode, TextureFormat, TextureUsage, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, quadMesh, tick } from '../../shared/gfx-kit.ts';
import { planePointer } from '../../shared/gfx-input.ts';

const N = 64;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 6], light: false, hint: 'Press or drag on the grid to spawn cells.' });
  const say = caption(stage);
  let cells = new Uint8Array(N * N);
  let seed = 12345;
  const rand = (): number => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < cells.length; i++) cells[i] = rand() < 0.3 ? 1 : 0;
  const pixels = new Uint8Array(N * N * 4);
  const texture = new Texture2D(engine, N, N, TextureFormat.R8G8B8A8, false, true, TextureUsage.Dynamic);
  texture.filterMode = TextureFilterMode.Point;
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const screen = root.createChild('grid');
  const renderer = screen.addComponent(MeshRenderer);
  renderer.mesh = quadMesh(engine, 4.4, 4.4);
  renderer.setMaterial(material);
  const upload = (): void => {
    for (let i = 0; i < cells.length; i++) pixels.set(cells[i] ? [244, 190, 90, 255] : [18, 24, 40, 255], i * 4);
    texture.setPixelBuffer(pixels);
  };
  const step = (): void => {
    const next = new Uint8Array(N * N);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        let n = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (dx || dy) n += cells[((y + dy + N) % N) * N + ((x + dx + N) % N)]!;
        next[y * N + x] = n === 3 || (n === 2 && cells[y * N + x]) ? 1 : 0;
      }
    }
    cells = next;
  };
  planePointer(stage, camera, (x, y) => {
    const cx = Math.floor((x / 4.4 + 0.5) * N);
    const cy = Math.floor((0.5 - y / 4.4) * N);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (cx + dx >= 0 && cx + dx < N && cy + dy >= 0 && cy + dy < N) cells[(cy + dy) * N + cx + dx] = 1;
  });
  let acc = 0;
  let generation = 0;
  upload();
  tick(screen, (dt) => {
    acc += dt;
    if (acc > 0.1) {
      acc = 0;
      step();
      generation++;
      if (generation % 300 === 0) for (let i = 0; i < cells.length; i++) cells[i] = rand() < 0.3 ? 1 : 0;
    }
    upload();
    say(`generation ${generation}: setPixelBuffer(${pixels.length} bytes)`);
  });
  stage.own(() => {
    renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
