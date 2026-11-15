// getPixelBuffer reads a region of a texture back into an array
import { MeshRenderer, PrimitiveMesh, Texture2D, TextureFormat, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { add, caption, demo, quadMesh, tick, unlit } from '../../shared/gfx-kit.ts';
import { planePointer } from '../../shared/gfx-input.ts';

const N = 128;
const SIZE = 4.4;

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 6], light: false, hint: 'Move the pointer over the gradient.' });
  const say = caption(stage);
  const data = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const h = (x / N) * 6.283;
      const l = 1 - y / N;
      data.set([255 * l * (0.5 + 0.5 * Math.cos(h)), 255 * l * (0.5 + 0.5 * Math.cos(h + 2.09)), 255 * l * (0.5 + 0.5 * Math.cos(h + 4.19)), 255], (y * N + x) * 4);
    }
  }
  const texture = new Texture2D(engine, N, N, TextureFormat.R8G8B8A8, false, true);
  texture.setPixelBuffer(data);
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const screen = root.createChild('gradient');
  const renderer = screen.addComponent(MeshRenderer);
  renderer.mesh = quadMesh(engine, SIZE, SIZE);
  renderer.setMaterial(material);
  const probe = add(root, PrimitiveMesh.createTorus(engine, 0.14, 0.03, 8, 20), unlit(engine, [1, 1, 1]), [0, 0, 0.05], 'probe');
  const swatch = add(root, PrimitiveMesh.createSphere(engine, 0.45), unlit(engine, [0, 0, 0]), [3.6, -1.6, 0.2], 'swatch');
  const out = new Uint8Array(4);
  const pointer = planePointer(stage, camera);
  tick(screen, (_dt, t) => {
    const p = pointer.hit() ?? [Math.sin(t * 0.9) * 1.9, Math.sin(t * 1.4) * 1.9];
    const x = Math.max(-SIZE / 2 + 0.01, Math.min(SIZE / 2 - 0.01, p[0]!));
    const y = Math.max(-SIZE / 2 + 0.01, Math.min(SIZE / 2 - 0.01, p[1]!));
    probe.entity.transform.setPosition(x, y, 0.05);
    const px = Math.floor((x / SIZE + 0.5) * N);
    const py = Math.floor((0.5 - y / SIZE) * N);
    texture.getPixelBuffer(px, py, 1, 1, 0, out);
    (swatch.renderer.getMaterial() as UnlitMaterial).baseColor.set((out[0]! / 255) ** 2.2, (out[1]! / 255) ** 2.2, (out[2]! / 255) ** 2.2, 1);
    say(`texel (${px}, ${py}) = [${out[0]}, ${out[1]}, ${out[2]}, ${out[3]}]`);
  });
  stage.own(() => {
    renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
