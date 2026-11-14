// TextureRenderer: channel previews and the camera scene depth
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addMesh, createRig, pbrMaterial } from '../../shared/pbr.ts';
import { canvasTexture } from '../../shared/textures.ts';

const CHANNELS = ['rgb', 'rrr', 'ggg', 'bbb', 'aaa', 'bgr'];

const mount: Mount = async (el, ctx) => {
  const rig = await createRig(el, ctx, { distance: 9, pitch: -20, target: new pc.Vec3(0, 0.5, 0), autoRotate: 10 });
  const { app, stage } = rig;
  const camera = rig.camera.camera!;
  // sceneDepth() previews the depth the camera captured; the camera has to capture it first.
  camera.requestSceneDepthMap(true);

  addMesh(app, 'plane', pbrMaterial('#6d7a8c', { gloss: 0.2 }), [0, -0.5, 0], 16);
  const shapes = [
    addMesh(app, 'sphere', pbrMaterial('#e8794a', { gloss: 0.8 }), [-2, 0.5, 0], 2),
    addMesh(app, 'box', pbrMaterial('#4ab3e8', { gloss: 0.6 }), [0.3, 0.5, 1.4], 1.6),
    addMesh(app, 'cone', pbrMaterial('#7bc67b', { gloss: 0.6 }), [2.2, 0.6, -1], [1.6, 2.2, 1.6]),
  ];
  app.on('update', (dt: number) => shapes.forEach((s) => s.rotate(0, 30 * dt, 0)));

  // A texture with a different story in every channel: red ramp, green rings, blue stripes, alpha disc.
  const texture = rig.own(
    canvasTexture(stage.device, (g, s) => {
      const image = g.createImageData(s, s);
      for (let y = 0; y < s; y++) {
        for (let x = 0; x < s; x++) {
          const u = x / s;
          const v = y / s;
          const r = Math.hypot(u - 0.5, v - 0.5);
          image.data.set([u * 255, (0.5 + 0.5 * Math.sin(r * 40)) * 255, ((Math.floor(v * 8) % 2) * 0.8 + 0.1) * 255, r < 0.4 ? 255 : 40], (y * s + x) * 4);
        }
      }
      g.putImageData(image, 0, 0);
    }, { size: 128, srgb: false, name: 'channel-test' }),
  );

  // Previews last one frame, so each is submitted again from every update.
  const textures = new pc.TextureRenderer(app);
  textures.camera = camera; // draw only for the main camera
  let channel = 'bgr';
  app.on('update', () => {
    const w = 0.125;
    const h = (w * stage.canvas.clientWidth) / Math.max(1, stage.canvas.clientHeight);
    ['rgb', 'rrr', 'ggg', 'bbb', 'aaa'].forEach((c, i) => {
      textures.channels = c;
      textures.draw(texture, 0.02 + i * (w + 0.01), 0.03, w, h);
    });
    textures.channels = channel;
    textures.draw(texture, 0.02 + 5 * (w + 0.01), 0.03, w, h);
    textures.channels = 'rgb';
    textures.sceneDepth(0.02 + 6 * (w + 0.01), 0.03, w, h);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('sixth preview channels', CHANNELS, 'bgr', (c) => (channel = c));
    panel.readout('left to right: rgb, rrr, ggg, bbb, aaa, the chosen channels, then scene depth');
  }
  return () => rig.dispose();
};

export default mount;
