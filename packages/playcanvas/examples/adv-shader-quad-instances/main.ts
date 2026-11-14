// numInstances: one instanced draw of hundreds of quads in a shader quad pass
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';

const W = 640;
const H = 360;
const MAX = 600;

// Each instance reads gl_InstanceID to decide where its quad goes and how big and what colour it is.
const vertexGLSL = /* glsl */ `
    attribute vec2 aPosition;
    varying vec2 uv0;
    varying vec3 vColor;
    uniform float uTime;
    uniform float uCount;
    uniform float uAspect;

    void main(void) {
        float f = float(gl_InstanceID) / uCount;
        float a = f * 6.2831853 * 4.0 + uTime * (0.4 + f);
        vec2 center = vec2(cos(a), sin(a)) * (0.1 + 0.85 * f);
        float size = 0.02 + 0.07 * f;
        gl_Position = vec4(center + aPosition * vec2(size / uAspect, size), 0.0, 1.0);
        uv0 = aPosition * 0.5 + 0.5;
        vColor = 0.55 + 0.45 * cos(6.2831853 * (f * 1.5 + vec3(0.0, 0.33, 0.67)));
    }
`;
const fragmentGLSL = /* glsl */ `
    varying vec2 uv0;
    varying vec3 vColor;
    void main() {
        float d = length(uv0 * 2.0 - 1.0);
        float a = smoothstep(1.0, 0.0, d);
        gl_FragColor = vec4(vColor * a, 1.0);
    }
`;

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const device = stage.device;

  const texture = renderTexture(device, W, H);
  const target = new pc.RenderTarget({ colorBuffer: texture, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const shader = pc.ShaderUtils.createShader(device, {
    uniqueName: 'AdvQuadInstances',
    attributes: { aPosition: pc.SEMANTIC_POSITION },
    vertexGLSL,
    fragmentGLSL,
  });
  const pass = new pc.RenderPassShaderQuad(device);
  pass.name = 'Instances';
  pass.shader = shader;
  pass.init(target);
  pass.setClearColor(new pc.Color(0.02, 0.03, 0.06, 1)); // the instances cover little: clear, then draw them
  pass.blendState = new pc.BlendState(true, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ONE, pc.BLENDMODE_ONE, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ZERO, pc.BLENDMODE_ONE);
  pass.numInstances = ctx.preview ? 300 : 400;

  const timeId = device.scope.resolve('uTime');
  const countId = device.scope.resolve('uCount');
  const aspectId = device.scope.resolve('uAspect');
  let t = 0;
  app.on('update', (dt: number) => (t += dt));
  app.on('prerender', () => {
    timeId.setValue(t);
    countId.setValue(MAX);
    aspectId.setValue(W / H);
    pass.render();
  });

  const material = screenMaterial(texture);
  const screen = addScreen(app, material, [0, 0, 0], 8, 4.5);

  if (!ctx.preview) {
    const panel = createPanel(el);
    const readout = panel.readout();
    const show = (): void => {
      readout.textContent = pass.numInstances === 0 ? 'numInstances 0: nothing is drawn, the pass still clears' : `numInstances ${pass.numInstances}: one instanced draw`;
    };
    panel.slider('numInstances', 0, MAX, 10, pass.numInstances, (v) => {
      pass.numInstances = v;
      show();
    });
    show();
  }

  return () => {
    pass.destroy();
    shader.destroy();
    target.destroy();
    texture.destroy();
    material.destroy();
    screen.destroy();
    scene.dispose();
  };
};

export default mount;
