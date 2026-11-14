// A BUFFER_DYNAMIC instancing buffer rewritten every frame with setData
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const SIDE = 32;
const COUNT = SIDE * SIDE;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, distance: 24, pitch: -32, autoRotate: 8 });
  const { app } = scene;
  const device = app.graphicsDevice;

  // No initial data: the buffer is created dynamic and filled by the update loop.
  const format = pc.VertexFormat.getDefaultInstancingFormat(device);
  const buffer = new pc.VertexBuffer(device, format, COUNT, { usage: pc.BUFFER_DYNAMIC });
  const matrices = new Float32Array(COUNT * 16);
  const matrix = new pc.Mat4();
  const pos = new pc.Vec3();
  const rot = new pc.Quat();
  const scl = new pc.Vec3();

  const material = colorMaterial('#4ab3e8', { gloss: 0.7 });
  const holder = new pc.Entity('wave');
  holder.addComponent('render', { type: 'box', material, castShadows: true });
  app.root.addChild(holder);
  const meshInstance = holder.render!.meshInstances[0]!;
  meshInstance.setInstancing(buffer);
  meshInstance.instancingCount = COUNT;

  let amplitude = 2;
  let speed = 1.5;
  let t = 0;
  const write = (): void => {
    for (let z = 0; z < SIDE; z++) {
      for (let x = 0; x < SIDE; x++) {
        const px = (x - SIDE / 2) * 0.7;
        const pz = (z - SIDE / 2) * 0.7;
        const d = Math.hypot(px, pz);
        const h = (Math.sin(d * 1.1 - t * speed) + Math.sin(px * 0.8 + t * speed * 0.6)) * 0.5 * amplitude;
        pos.set(px, h, pz);
        rot.setFromEulerAngles(0, (h + t) * 20, 0);
        scl.set(0.5, 0.5 + Math.abs(h) * 0.5, 0.5);
        matrix.setTRS(pos, rot, scl);
        matrices.set(matrix.data, (z * SIDE + x) * 16);
      }
    }
    buffer.setData(matrices);
  };
  app.on('update', (dt: number) => {
    t += dt;
    write();
  });
  write();

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('amplitude', 0, 4, 0.1, amplitude, (v) => (amplitude = v));
    panel.slider('speed', 0, 4, 0.1, speed, (v) => (speed = v));
    panel.readout(`${COUNT} instances, one draw call, ${(COUNT * 64) / 1024} KB uploaded each frame`);
  }

  return () => {
    material.destroy();
    buffer.destroy();
    scene.dispose();
  };
};

export default mount;
