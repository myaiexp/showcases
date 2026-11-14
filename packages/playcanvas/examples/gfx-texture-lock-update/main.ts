// Updating a texture each frame: lock/unlock versus setSource
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const SIZE = 96;

/** A moving plasma: writes r, g, b for the pixel into out. */
function plasma(x: number, y: number, t: number, out: number[]): void {
  const v = Math.sin(x * 0.12 + t) + Math.sin(y * 0.1 - t * 1.3) + Math.sin((x + y) * 0.07 + t * 0.7) + Math.sin(Math.hypot(x - 48, y - 48) * 0.15 - t * 2);
  out[0] = 128 + 127 * Math.sin(v * 1.2);
  out[1] = 128 + 127 * Math.sin(v * 1.2 + 2.1);
  out[2] = 128 + 127 * Math.sin(v * 1.2 + 4.2);
}

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 7, pitch: 0, yaw: 0, autoRotate: 0, clearColor: new pc.Color(0.1, 0.11, 0.15) });
  const { app, stage } = rig;

  const make = (name: string): pc.Texture =>
    rig.own(new pc.Texture(stage.device, { name, width: SIZE, height: SIZE, format: pc.PIXELFORMAT_RGBA8, mipmaps: false, minFilter: pc.FILTER_LINEAR, magFilter: pc.FILTER_LINEAR, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE }));
  const locked = make('locked');
  const sourced = make('sourced');
  [locked, sourced].forEach((texture, i) => {
    const material = pbrMaterial('#ffffff', { diffuseMap: texture, useLighting: false });
    addMesh(app, 'plane', material, [(i - 0.5) * 3.4, 0, 0], 3.2).setLocalEulerAngles(90, 0, 0);
  });
  addCanvasLabels(stage.canvas, [
    { text: 'lock() / unlock()', rect: [0, 0, 0.5, 1] },
    { text: 'setSource(canvas)', rect: [0.5, 0, 0.5, 1] },
  ]);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const g = canvas.getContext('2d')!;
  const image = g.createImageData(SIZE, SIZE);
  const rgb = [0, 0, 0];
  let t = 0;
  let paused = false;
  let ms = 0;
  app.on('update', (dt: number) => {
    if (paused) return;
    t += dt;
    const t0 = performance.now();
    // Direct write: lock() hands back the level's bytes, unlock() uploads them.
    const pixels = locked.lock();
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        plasma(x, y, t, rgb);
        pixels.set([rgb[0]!, rgb[1]!, rgb[2]!, 255], (y * SIZE + x) * 4);
      }
    }
    locked.unlock();
    ms = performance.now() - t0;
    // Browser image source: draw on a canvas, then hand it over.
    image.data.set(pixels);
    g.putImageData(image, 0, 0);
    g.fillStyle = 'rgba(255,255,255,0.9)';
    g.fillRect(((t * 30) % (SIZE + 12)) - 6, SIZE - 10, 6, 6);
    sourced.setSource(canvas);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout();
    app.on('update', () => (readout.textContent = `fill + upload: ${ms.toFixed(2)} ms`));
    panel.check('paused', false, (on) => (paused = on));
  }
  return () => rig.dispose();
};

export default mount;
