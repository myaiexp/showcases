// Indirect drawing: a compute shader writes a draw's instance count (WebGPU)
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';

const COUNT = 400;

// One draw-parameter slot is five u32 values: indexCount, instanceCount, firstIndex, baseVertex,
// firstInstance. A single thread fills the slot this frame's mesh instance points at.
const CSHADER = /* wgsl */ `
    uniform slot: u32;
    uniform indexCount: u32;
    uniform firstIndex: u32;
    uniform baseVertex: u32;
    uniform maxInstances: u32;
    uniform time: f32;
    uniform speed: f32;
    var<storage, read_write> drawBuffer: array<u32>;

    @compute @workgroup_size(1, 1, 1)
    fn main() {
        let wave = 0.5 + 0.5 * sin(uniform.time * uniform.speed);
        let base = uniform.slot * 5u;
        drawBuffer[base + 0u] = uniform.indexCount;
        drawBuffer[base + 1u] = u32(wave * f32(uniform.maxInstances));
        drawBuffer[base + 2u] = uniform.firstIndex;
        drawBuffer[base + 3u] = uniform.baseVertex;
        drawBuffer[base + 4u] = 0u;
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { device: 'webgpu', distance: 17, pitch: -42, autoRotate: 10, floor: false, clear: '#12151d' });
  const { app, stage } = scene;
  const device = stage.device;

  // A golden-angle spiral of boxes in a default-format instancing buffer. Instance order is spiral
  // order, so drawing the first n instances draws a spiral of n.
  const matrices = new Float32Array(COUNT * 16);
  const matrix = new pc.Mat4();
  for (let i = 0; i < COUNT; i++) {
    const r = 0.55 * Math.sqrt(i + 1);
    const a = i * 2.39996;
    matrix.setTRS(new pc.Vec3(Math.cos(a) * r, 0.3, Math.sin(a) * r), new pc.Quat().setFromEulerAngles(0, (-a * 180) / Math.PI, 0), new pc.Vec3(0.5, 0.5, 0.5));
    matrices.set(matrix.data, i * 16);
  }
  const buffer = new pc.VertexBuffer(device, pc.VertexFormat.getDefaultInstancingFormat(device), COUNT, { data: matrices });
  const material = colorMaterial('#6ad6c1', { gloss: 0.5 });
  const holder = new pc.Entity('spiral');
  holder.addComponent('render', { type: 'box', material, castShadows: false });
  app.root.addChild(holder);
  const meshInstance = holder.render!.meshInstances[0]!;
  meshInstance.setInstancing(buffer);
  meshInstance.instancingCount = COUNT;

  let speed = 1.2;
  let readout: HTMLElement | null = null;
  const handles: { destroy(): void }[] = [];

  if (device.supportsIndirectDraw) {
    const shader = new pc.Shader(device, { name: 'IndirectCompute', shaderLanguage: pc.SHADERLANGUAGE_WGSL, cshader: CSHADER });
    const compute = new pc.Compute(device, shader, 'IndirectDrawCompute');
    handles.push(compute, shader);
    const meta = meshInstance.getIndirectMetaData(); // [index count, first index, base vertex, 0]
    compute.setParameter('indexCount', meta[0]!);
    compute.setParameter('firstIndex', meta[1]!);
    compute.setParameter('baseVertex', meta[2]!);
    compute.setParameter('maxInstances', COUNT);
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      // Slots must be allocated again every frame.
      const slot = device.getIndirectDrawSlot();
      meshInstance.setIndirect(null, slot);
      const drawBuffer = device.indirectDrawBuffer; // can be reallocated when maxIndirectDrawCount grows
      if (!drawBuffer) return;
      compute.setParameter('drawBuffer', drawBuffer);
      compute.setParameter('slot', slot);
      compute.setParameter('time', t);
      compute.setParameter('speed', speed);
      compute.setupDispatch(1);
      device.computeDispatch([compute], 'GenerateIndirectDraw');
      if (readout) readout.textContent = `slot ${slot} of ${device.maxIndirectDrawCount}: the GPU chose the instance count`;
    });
  } else {
    // Without indirect drawing the instance renders as a normal draw call, so move the count on the CPU.
    if (!ctx.preview) showNotice(el, 'This browser gave WebGL 2: indirect drawing is WebGPU only. The count follows the same wave from the CPU.');
    let t = 0;
    app.on('update', (dt: number) => {
      t += dt;
      meshInstance.instancingCount = Math.floor((0.5 + 0.5 * Math.sin(t * speed)) * COUNT);
    });
  }

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('wave speed', 0, 4, 0.1, speed, (v) => (speed = v));
    panel.row();
    readout = panel.readout(`supportsIndirectDraw: ${device.supportsIndirectDraw}`);
  }

  return () => {
    handles.forEach((h) => h.destroy());
    material.destroy();
    buffer.destroy();
    scene.dispose();
  };
};

export default mount;
