// A cubemap built from six faces, shown as a cross and reflected
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';

const SIZE = 64;
// The order the docs give for cubemap levels.
const FACES = [
  ['+X', '#e8794a'],
  ['-X', '#7a3b22'],
  ['+Y', '#7bc67b'],
  ['-Y', '#2f5d33'],
  ['+Z', '#4ab3e8'],
  ['-Z', '#1f5878'],
] as const;

function faceBytes(label: string, colour: string): Uint8ClampedArray {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const g = canvas.getContext('2d')!;
  g.fillStyle = colour;
  g.fillRect(0, 0, SIZE, SIZE);
  g.strokeStyle = 'rgba(255,255,255,0.8)';
  g.lineWidth = 3;
  g.strokeRect(3, 3, SIZE - 6, SIZE - 6);
  g.fillStyle = '#fff';
  g.font = 'bold 26px sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(label, SIZE / 2, SIZE / 2);
  return g.getImageData(0, 0, SIZE, SIZE).data;
}

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { sky: false, sun: false, distance: 5, pitch: -10, autoRotate: 14 });
  const { app, stage } = rig;

  // levels: one entry per mip level, each an array of six faces.
  const cubemap = rig.own(
    new pc.Texture(stage.device, {
      name: 'six-faces',
      width: SIZE,
      height: SIZE,
      cubemap: true,
      format: pc.PIXELFORMAT_RGBA8,
      mipmaps: false,
      minFilter: pc.FILTER_LINEAR,
      magFilter: pc.FILTER_LINEAR,
      addressU: pc.ADDRESS_CLAMP_TO_EDGE,
      addressV: pc.ADDRESS_CLAMP_TO_EDGE,
      levels: [FACES.map(([label, colour]) => faceBytes(label, colour))],
    }),
  );

  // A mirror ball that reflects the cubemap. It is not prefiltered, so the reflection is sharp.
  const mirror = pbrMaterial('#ffffff', { metalness: 1, gloss: 1, cubeMap: cubemap, useSkybox: false });
  addMesh(app, 'sphere', mirror, [0, 0, 0], 2.6);

  // The +Z face is rewritten each frame through lock({ face }), pulsing its brightness.
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const bytes = cubemap.lock({ face: 4 });
    const pulse = 0.5 + 0.5 * Math.sin(t * 3);
    for (let i = 0; i < bytes.length; i += 4) {
      bytes[i] = 232 * pulse + 20;
      bytes[i + 1] = 60;
      bytes[i + 2] = 180 * (1 - pulse) + 40;
      bytes[i + 3] = 255;
    }
    cubemap.unlock();
  });

  // The debug TextureRenderer lays a cubemap out as a 4x3 cross, best in a 4:3 pixel rectangle.
  const textures = new pc.TextureRenderer(app);
  app.on('update', () => {
    const w = 0.34;
    const h = (w * 0.75 * stage.canvas.clientWidth) / Math.max(1, stage.canvas.clientHeight);
    textures.draw(cubemap, 0.02, 0.03, w, h);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.readout('levels[0] = six byte arrays in the order +X -X +Y -Y +Z -Z; the +Z face is rewritten live');
  }
  return () => rig.dispose();
};

export default mount;
