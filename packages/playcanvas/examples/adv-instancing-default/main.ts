// Hardware instancing with the default Mat4 format on a render component
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 1500;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, distance: 15, pitch: -20, autoRotate: 10 });
  const { app } = scene;
  const device = app.graphicsDevice;

  // Step 1: a Mat4 for every instance, written into a Float32Array.
  const matrices = new Float32Array(COUNT * 16);
  const matrix = new pc.Mat4();
  const pos = new pc.Vec3();
  const rot = new pc.Quat();
  const scl = new pc.Vec3();
  for (let i = 0; i < COUNT; i++) {
    // a sphere shell of small, tumbling boxes
    const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 5 + Math.sin(i * 0.37) * 0.6;
    pos.set(Math.cos(theta) * Math.sin(phi) * r, Math.cos(phi) * r, Math.sin(theta) * Math.sin(phi) * r);
    rot.setFromEulerAngles(i * 30, i * 50, i * 70);
    scl.set(0.22, 0.22, 0.22 + (i % 5) * 0.08);
    matrix.setTRS(pos, rot, scl);
    matrices.set(matrix.data, i * 16);
  }

  // Step 2: a vertex buffer in the default instancing format, enabled on the mesh instance.
  const buffer = new pc.VertexBuffer(device, pc.VertexFormat.getDefaultInstancingFormat(device), COUNT, { data: matrices });
  const material = colorMaterial('#f2c14e', { gloss: 0.6 });
  const holder = new pc.Entity('instanced boxes');
  holder.addComponent('render', { type: 'box', material, castShadows: true, receiveShadows: true });
  app.root.addChild(holder);
  const meshInstance = holder.render!.meshInstances[0]!;
  meshInstance.setInstancing(buffer);
  meshInstance.instancingCount = COUNT;

  // The entity's own matrix multiplies every instance matrix, so one rotation moves them all.
  let spin = 20;
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    holder.setLocalEulerAngles(Math.sin(t * 0.4) * 25, t * spin, 0);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('instancingCount', 0, COUNT, 50, COUNT, (v) => (meshInstance.instancingCount = v));
    panel.slider('entity spin (deg/s)', 0, 90, 1, spin, (v) => (spin = v));
    panel.row();
    const readout = panel.readout();
    app.on('update', () => (readout.textContent = `${meshInstance.instancingCount} boxes, ${app.stats.drawCallCount} draw calls in the frame`));
  }

  return () => {
    material.destroy();
    buffer.destroy();
    scene.dispose();
  };
};

export default mount;
