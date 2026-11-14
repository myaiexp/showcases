// Compute shader on a storage buffer (WebGPU): fill a wave, read it back
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { showNotice } from '../../shared/notice.ts';
import { addShape, createShaderScene, onTick } from '../../shared/shaders.ts';

const COUNT = 32;

// Resources use the simplified WGSL syntax: no @group/@binding, uniforms read as `uniform.name`.
const CSHADER = /* wgsl */ `
    uniform count: u32;
    uniform time: f32;
    uniform amplitude: f32;
    var<storage, read_write> data: array<f32>;

    @compute @workgroup_size(32, 1, 1)
    fn main(@builtin(global_invocation_id) global_id: vec3u) {
        let i = global_id.x;
        if (i >= uniform.count) {
            return;
        }
        let x = f32(i);
        data[i] = uniform.amplitude * (sin(x * 0.5 + uniform.time * 2.0) * 0.6 + sin(x * 0.17 - uniform.time) * 0.4);
    }
`;

const wave = (i: number, t: number, amplitude: number): number => amplitude * (Math.sin(i * 0.5 + t * 2) * 0.6 + Math.sin(i * 0.17 - t) * 0.4);

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { device: 'webgpu', distance: 14, pitch: -12, yaw: 0, autoRotate: 0, clear: '#10131a' });
  const { app, stage } = scene;
  const { device } = stage;
  app.scene.ambientLight = new pc.Color(0.5, 0.52, 0.58);

  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color().fromString('#4ab3e8');
  material.update();
  const light = new pc.Entity('light');
  light.addComponent('light', { type: 'directional', intensity: 1 });
  light.setEulerAngles(45, 20, 0);
  app.root.addChild(light);
  const bars = Array.from({ length: COUNT }, (_, i) => addShape(app, 'box', material, [(i - (COUNT - 1) / 2) * 0.42, 0, 0], [0.34, 1, 0.34]));
  const setBar = (i: number, v: number): void => {
    const h = Math.max(Math.abs(v) * 3, 0.05);
    bars[i]!.setLocalScale(0.34, h, 0.34);
    bars[i]!.setLocalPosition((i - (COUNT - 1) / 2) * 0.42, v * 1.5, 0);
  };

  let amplitude = 1;
  if (!device.supportsCompute) {
    // Compute shaders are WebGPU only. Say so, and run the same maths on the CPU so the scene still moves.
    if (!ctx.preview) showNotice(el, 'This browser gave WebGL 2: compute shaders need WebGPU. The bars follow the same wave computed on the CPU.');
    onTick(app, (t) => bars.forEach((_, i) => setBar(i, wave(i, t, amplitude))));
    if (!ctx.preview) createPanel(el).slider('amplitude', 0, 1, 0.05, 1, (v) => (amplitude = v));
    return () => scene.dispose();
  }

  const shader = new pc.Shader(device, { name: 'WaveCompute', shaderLanguage: pc.SHADERLANGUAGE_WGSL, cshader: CSHADER });
  const compute = new pc.Compute(device, shader, 'WaveInstance');
  const buffer = new pc.StorageBuffer(device, COUNT * 4, pc.BUFFERUSAGE_COPY_SRC | pc.BUFFERUSAGE_COPY_DST);
  const result = new Float32Array(COUNT);
  compute.setParameter('data', buffer);
  compute.setParameter('count', COUNT);

  let disposed = false;
  let reading = false;
  onTick(app, (t) => {
    // Every value the shader declares needs a value on the compute instance each time.
    compute.setParameter('time', t);
    compute.setParameter('amplitude', amplitude);
    compute.setupDispatch(1);
    // computeDispatch records into the frame's command encoder, so it runs from the update event.
    device.computeDispatch([compute], 'Wave');
    if (reading) return;
    reading = true;
    buffer
      .read(0, undefined, result)
      .then(() => {
        if (!disposed) result.forEach((v, i) => setBar(i, v));
      })
      .catch(() => undefined)
      .finally(() => (reading = false));
  });

  if (!ctx.preview) {
    showNotice(el, 'WebGPU: a compute shader writes 32 floats into a storage buffer every frame; read() brings them back to size the bars.');
    createPanel(el).slider('amplitude (uniform)', 0, 1, 0.05, 1, (v) => (amplitude = v));
  }

  return () => {
    disposed = true;
    compute.destroy();
    buffer.destroy();
    shader.destroy();
    scene.dispose();
  };
};

export default mount;
