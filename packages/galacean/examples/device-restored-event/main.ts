// devicerestored rewrites a setPixelBuffer texture lost with the device
import { PrimitiveMesh, Texture2D, TextureFilterMode, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lit, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const N = 16;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Paint pixels, then lose and restore the device. The handler re-uploads the saved pixels.' });
  const { engine, root } = stage;
  lit(stage, [0, 0, 6]);
  const info = panel(stage, 'bl');
  const pixels = new Uint8Array(N * N * 4);
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const i = (y * N + x) * 4;
      const edge = x === 0 || y === 0 || x === N - 1 || y === N - 1;
      pixels.set(edge ? [200, 210, 230, 255] : [40 + x * 8, 60 + y * 8, 140, 255], i);
    }
  }
  const texture = new Texture2D(engine, N, N, undefined, false);
  texture.filterMode = TextureFilterMode.Point;
  texture.setPixelBuffer(pixels);
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const quad = solid(root, PrimitiveMesh.createPlane(engine, 3.6, 3.6), material);
  quad.transform.setRotation(90, 0, 0);
  const counts = { lost: 0, restored: 0, painted: 0 };
  const dab = (x: number, y: number): void => {
    pixels.set([255, 190, 60, 255], (y * N + x) * 4);
    texture.setPixelBuffer(new Uint8Array([255, 190, 60, 255]), 0, x, y, 1, 1);
    counts.painted++;
  };
  const onLost = (): void => void counts.lost++;
  const onRestored = (): void => {
    counts.restored++;
    texture.setPixelBuffer(pixels); // the content the engine cannot rebuild itself
  };
  engine.on('devicelost', onLost);
  engine.on('devicerestored', onRestored);
  stage.own(() => {
    engine.off('devicelost', onLost);
    engine.off('devicerestored', onRestored);
  });
  if (!stage.preview) {
    button(stage.bar, 'Paint a pixel', () => dab(1 + Math.floor(Math.random() * (N - 2)), 1 + Math.floor(Math.random() * (N - 2))));
    button(stage.bar, 'forceLoseDevice()', () => engine.forceLoseDevice());
    button(stage.bar, 'forceRestoreDevice()', () => engine.forceRestoreDevice());
  }
  const cycle = stage.preview
    ? setInterval(() => {
        dab(1 + Math.floor(Math.random() * (N - 2)), 1 + Math.floor(Math.random() * (N - 2)));
        if (counts.painted % 3 === 0) {
          engine.forceLoseDevice();
          setTimeout(() => !engine.destroyed && engine.forceRestoreDevice(), 500);
        }
      }, 700)
    : undefined;
  stage.own(() => clearInterval(cycle));
  tick(root, (_dt, t) => quad.transform.setRotation(90 - Math.sin(t) * 18, Math.cos(t * 0.7) * 20, 0));
  const readout = setInterval(() => info.text(`devicelost ${counts.lost}   devicerestored ${counts.restored}   pixels painted ${counts.painted}`), 100);
  stage.own(() => clearInterval(readout));
  return stage.dispose;
};

export default mount;
