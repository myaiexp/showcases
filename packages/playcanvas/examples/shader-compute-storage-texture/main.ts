// Compute shader writing a storage texture (WebGPU), via setupDispatchThreads
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { showNotice } from '../../shared/notice.ts';
import { addShape, createShaderScene, onTick } from '../../shared/shaders.ts';

// 100 x 75 is not a multiple of the 8 x 8 workgroup, so setupDispatchThreads rounds the dispatch up
// and dispatchThreadsCS (dispatchThreadInRange) makes the extra threads skip their texels.
const WIDTH = 100;
const HEIGHT = 75;
const CSHADER = /* wgsl */ `
    #include "dispatchThreadsCS"

    uniform time: f32;
    var output: texture_storage_2d<rgba8unorm, write>;

    @compute @workgroup_size(8, 8)
    fn main(@builtin(global_invocation_id) id: vec3u) {
        if (!dispatchThreadInRange(id)) {
            return;
        }
        let size = vec2f(dispatchThreadCount().xy);
        let uv = (vec2f(id.xy) + 0.5) / size;
        let p = (uv - 0.5) * vec2f(size.x / size.y, 1.0) * 6.0;
        let v = sin(p.x + uniform.time) + sin(p.y * 1.3 - uniform.time * 0.7) + sin(length(p) * 1.5 - uniform.time * 1.2);
        let color = 0.5 + 0.5 * cos(vec3f(0.0, 2.0, 4.0) + v * 1.2 + uniform.time * 0.3);
        textureStore(output, vec2i(id.xy), vec4f(color, 1.0));
    }
`;

/** The same pattern on the CPU, for browsers without WebGPU. */
function paintCpu(pixels: Uint8Array, t: number): void {
  let k = 0;
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const px = ((x + 0.5) / WIDTH - 0.5) * (WIDTH / HEIGHT) * 6;
      const py = ((y + 0.5) / HEIGHT - 0.5) * 6;
      const v = Math.sin(px + t) + Math.sin(py * 1.3 - t * 0.7) + Math.sin(Math.hypot(px, py) * 1.5 - t * 1.2);
      pixels[k++] = (0.5 + 0.5 * Math.cos(v * 1.2 + t * 0.3)) * 255;
      pixels[k++] = (0.5 + 0.5 * Math.cos(2 + v * 1.2 + t * 0.3)) * 255;
      pixels[k++] = (0.5 + 0.5 * Math.cos(4 + v * 1.2 + t * 0.3)) * 255;
      pixels[k++] = 255;
    }
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createShaderScene(el, ctx, { device: 'webgpu', distance: 6.5, pitch: -20, clear: '#10131a' });
  const { app, stage } = scene;
  const { device } = stage;
  const gpu = device.supportsCompute;

  // storage: true lets the compute shader write the texture; it is then an ordinary texture to sample.
  const texture = new pc.Texture(device, {
    name: 'ComputeOutput',
    width: WIDTH,
    height: HEIGHT,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_NEAREST,
    magFilter: pc.FILTER_NEAREST,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
    storage: gpu,
    levels: gpu ? undefined : [new Uint8Array(WIDTH * HEIGHT * 4)],
  });
  const material = new pc.StandardMaterial();
  material.diffuse = new pc.Color(0, 0, 0);
  material.emissive = new pc.Color(1, 1, 1);
  material.emissiveMap = texture;
  material.useLighting = false;
  material.update();
  const screen = addShape(app, 'plane', material, [0, 0, 0], [5.3, 1, 4], { castShadows: false });
  screen.setLocalEulerAngles(90, 0, 0);
  scene.orbit.autoRotate = 0;

  let shader: pc.Shader | null = null;
  let compute: pc.Compute | null = null;
  const pixels = new Uint8Array(WIDTH * HEIGHT * 4);
  if (gpu) {
    shader = new pc.Shader(device, { name: 'PlasmaCompute', shaderLanguage: pc.SHADERLANGUAGE_WGSL, cshader: CSHADER });
    compute = new pc.Compute(device, shader, 'PlasmaInstance');
    compute.setParameter('output', texture);
  } else if (!ctx.preview) {
    showNotice(el, 'This browser gave WebGL 2: compute shaders need WebGPU. The texture is painted by the CPU with the same formula.');
  }
  if (gpu && !ctx.preview) showNotice(el, `WebGPU: setupDispatchThreads(${WIDTH}, ${HEIGHT}) covers the image in 8 x 8 workgroups; threads past the edge return early.`);

  let speed = 1;
  let clock = 0;
  onTick(app, (_t, dt) => {
    clock += dt * speed;
    if (compute) {
      compute.setParameter('time', clock);
      compute.setupDispatchThreads(WIDTH, HEIGHT);
      device.computeDispatch([compute], 'Plasma');
    } else {
      paintCpu(pixels, clock);
      (texture.lock() as Uint8Array).set(pixels);
      texture.unlock();
    }
  });

  if (!ctx.preview) createPanel(el).slider('time speed', 0, 3, 0.1, 1, (v) => (speed = v));

  return () => {
    compute?.destroy();
    shader?.destroy();
    texture.destroy();
    scene.dispose();
  };
};

export default mount;
