// A ComputePass in camera.afterPasses reads what the camera rendered (WebGPU)
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { colorMaterial } from '../../shared/graphics-basics.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const W = 384;
const H = 216;

// Resources use the engine's simplified WGSL: no @group/@binding, uniforms read as `uniform.name`.
// The shader runs after the camera: sceneColorSample reads the colour map it just rendered.
const CSHADER = /* wgsl */ `
    #include "sceneColorCS"
    #include "dispatchThreadsCS"

    uniform strength: f32;
    var output: texture_storage_2d<rgba8unorm, write>;

    fn luma(uv: vec2f) -> f32 {
        let c = sceneColorToLinear(sceneColorSample(uv, 0.0).rgb);
        return dot(c, vec3f(0.299, 0.587, 0.114));
    }

    @compute @workgroup_size(8, 8)
    fn main(@builtin(global_invocation_id) id: vec3u) {
        if (!dispatchThreadInRange(id)) {
            return;
        }
        let size = vec2f(dispatchThreadCount().xy);
        let uv = (vec2f(id.xy) + 0.5) / size;
        let px = 1.5 / size;
        // Sobel on the luminance of the camera's image
        let tl = luma(uv + vec2f(-px.x, -px.y));
        let t = luma(uv + vec2f(0.0, -px.y));
        let tr = luma(uv + vec2f(px.x, -px.y));
        let l = luma(uv + vec2f(-px.x, 0.0));
        let r = luma(uv + vec2f(px.x, 0.0));
        let bl = luma(uv + vec2f(-px.x, px.y));
        let b = luma(uv + vec2f(0.0, px.y));
        let br = luma(uv + vec2f(px.x, px.y));
        let gx = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
        let gy = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);
        let edge = clamp(sqrt(gx * gx + gy * gy) * uniform.strength, 0.0, 1.0);
        textureStore(output, vec2i(id.xy), vec4f(vec3f(0.3, 0.9, 1.0) * edge, 1.0));
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { device: 'webgpu', distance: 11, pitch: -24, autoRotate: 12 });
  const { app, stage } = scene;
  const device = stage.device;
  const cameraComponent = scene.camera.camera!;

  (['sphere', 'torus', 'box', 'cone'] as const).forEach((type, i) => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material: colorMaterial(['#e8794a', '#7bc67b', '#4ab3e8', '#f2c14e'][i]!), castShadows: true });
    e.setLocalPosition((i - 1.5) * 2.4, 1, 0);
    e.setLocalScale(1.7, 1.7, 1.7);
    app.root.addChild(e);
    onTick(app, (t) => e.setLocalEulerAngles(t * 30 + i * 40, t * 45, 0));
  });

  if (!device.supportsCompute) {
    if (!ctx.preview) showNotice(el, 'This browser gave WebGL 2: compute passes need WebGPU, so the pass dispatches nothing here and the scene renders as usual.');
    return () => scene.dispose();
  }

  // The output texture the compute shader writes (storage: true), shown by the debug texture renderer.
  const output = new pc.Texture(device, {
    name: 'EdgeOutput',
    width: W,
    height: H,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
    storage: true,
  });
  const shader = new pc.Shader(device, { name: 'EdgeCompute', shaderLanguage: pc.SHADERLANGUAGE_WGSL, cshader: CSHADER });
  const compute = new pc.Compute(device, shader, 'EdgeInstance');
  compute.setParameter('output', output);
  compute.setParameter('strength', 4);

  // The camera renders the colour map on request; attach its handle to the compute instance once.
  cameraComponent.requestSceneColorMap(true);
  compute.setSceneColorMap(cameraComponent.sceneColorMapHandle);

  const pass = new pc.ComputePass(device, [compute]);
  pass.name = 'EdgePass';
  pass.onBefore = () => compute.setupDispatchThreads(W, H); // right before the dispatch
  cameraComponent.afterPasses.push(pass);

  const viewer = new pc.TextureRenderer(app);
  app.on('update', () => {
    const aspect = stage.canvas.clientWidth / Math.max(1, stage.canvas.clientHeight);
    const w = 0.4;
    viewer.draw(output, 0.02, 0.03, w, w * aspect * (H / W));
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('edge strength', 1, 12, 0.5, 4, (v) => compute.setParameter('strength', v));
    panel.readout('WebGPU: the pass runs after the camera in the same frame; its Sobel edge map is the inset.');
  }

  return () => {
    compute.setSceneColorMap(null); // detach before the camera goes
    cameraComponent.afterPasses.splice(cameraComponent.afterPasses.indexOf(pass), 1);
    pass.destroy();
    compute.destroy();
    shader.destroy();
    output.destroy();
    scene.dispose();
  };
};

export default mount;
