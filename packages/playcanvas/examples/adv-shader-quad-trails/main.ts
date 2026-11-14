// Light trails: a reverse-subtract fade quad and additive brush quads
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';

const W = 640;
const H = 360;

const fadeGLSL = /* glsl */ `
    uniform float uFade;
    void main() {
        gl_FragColor = vec4(vec3(uFade), 0.0);
    }
`;
const dotGLSL = /* glsl */ `
    uniform vec3 uColor;
    varying vec2 uv0;
    void main() {
        float d = length(uv0 * 2.0 - 1.0);
        float a = smoothstep(1.0, 0.0, d);
        gl_FragColor = vec4(uColor * a * a, 0.0);
    }
`;

const shaderFor = (device: pc.GraphicsDevice, uniqueName: string, fragmentGLSL: string): pc.Shader =>
  pc.ShaderUtils.createShader(device, { uniqueName, attributes: { aPosition: pc.SEMANTIC_POSITION }, vertexChunk: 'quadVS', fragmentGLSL });

interface Brush {
  color: [number, number, number];
  fx: number;
  fy: number;
  phase: number;
  size: number;
}

/** Draws every brush as a dot: one viewport and one colour per dot, all in one pass. */
class BrushPass extends pc.RenderPassShaderQuad {
  brushes: Brush[] = [];
  time = 0;
  private colorId: pc.ScopeId;

  constructor(device: pc.GraphicsDevice) {
    super(device);
    this.name = 'Brushes';
    this.shader = shaderFor(device, 'AdvTrailDot', dotGLSL);
    this.blendState = new pc.BlendState(true, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ONE, pc.BLENDMODE_ONE, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ZERO, pc.BLENDMODE_ONE);
    this.colorId = device.scope.resolve('uColor');
  }

  override execute(): void {
    for (const b of this.brushes) {
      const x = (0.5 + 0.42 * Math.sin(this.time * b.fx + b.phase)) * W;
      const y = (0.5 + 0.4 * Math.sin(this.time * b.fy)) * H;
      this.colorId.setValue(b.color);
      this.viewport = new pc.Vec4(x - b.size, y - b.size, b.size * 2, b.size * 2);
      super.execute();
    }
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8, pitch: 0, yaw: 0, autoRotate: 0, clear: '#0b0d12' });
  const { app, stage } = scene;
  const device = stage.device;

  const texture = renderTexture(device, W, H);
  const target = new pc.RenderTarget({ colorBuffer: texture, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });

  // Fade: subtract a small constant each frame (destination minus source), without clearing.
  const fade = new pc.RenderPassShaderQuad(device);
  fade.name = 'Fade';
  fade.shader = shaderFor(device, 'AdvTrailFade', fadeGLSL);
  fade.blendState = new pc.BlendState(true, pc.BLENDEQUATION_REVERSE_SUBTRACT, pc.BLENDMODE_ONE, pc.BLENDMODE_ONE, pc.BLENDEQUATION_ADD, pc.BLENDMODE_ZERO, pc.BLENDMODE_ONE);
  fade.init(target);
  const brushes = new BrushPass(device);
  brushes.init(target);
  brushes.brushes = [
    { color: [1, 0.35, 0.3], fx: 1.3, fy: 1.9, phase: 0, size: 22 },
    { color: [0.3, 1, 0.5], fx: 1.7, fy: 1.1, phase: 1.6, size: 18 },
    { color: [0.35, 0.55, 1], fx: 0.9, fy: 2.3, phase: 3.1, size: 26 },
    { color: [1, 0.85, 0.3], fx: 2.1, fy: 1.5, phase: 4.4, size: 16 },
  ];
  const allBrushes = [...brushes.brushes];
  const fadeId = device.scope.resolve('uFade');
  let fadeAmount = 0.012;

  // Both passes render outside any frame, right before the scene draws the texture.
  let t = 0;
  app.on('prerender', () => {
    fadeId.setValue(fadeAmount);
    fade.render();
    brushes.time = t;
    brushes.render();
  });
  app.on('update', (dt: number) => (t += dt));

  const material = screenMaterial(texture);
  const screen = addScreen(app, material, [0, 0, 0], 8, 4.5);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('fade per frame', 0.004, 0.06, 0.002, fadeAmount, (v) => (fadeAmount = v));
    panel.slider('brush count', 1, 4, 1, 4, (v) => {
      brushes.brushes.length = 0;
      brushes.brushes.push(...allBrushes.slice(0, v));
    });
  }

  return () => {
    fade.destroy();
    brushes.destroy();
    target.destroy();
    texture.destroy();
    material.destroy();
    screen.destroy();
    scene.dispose();
  };
};

export default mount;
