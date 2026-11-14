// RenderPass subclasses generate a brick texture and normal map on demand
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { renderTexture } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const SIZE = 512;

// Pass 1: colour in rgb, height in alpha.
const patternGLSL = /* glsl */ `
    uniform float uBricks;
    uniform float uMortar;
    varying vec2 uv0;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }

    void main() {
        vec2 g = uv0 * vec2(uBricks, uBricks * 2.0);
        float row = floor(g.y);
        g.x += mod(row, 2.0) * 0.5;
        vec2 cell = floor(g);
        vec2 f = fract(g);
        vec2 e = min(f, 1.0 - f) * 2.0;          // 0 at a cell edge, 1 in the middle
        float d = min(e.x * 2.0, e.y);           // a brick is twice as wide as it is tall
        float height = smoothstep(uMortar, uMortar + 0.12, d);
        float tone = hash(cell);
        vec3 brick = mix(vec3(0.55, 0.2, 0.12), vec3(0.8, 0.4, 0.22), tone);
        vec3 mortar = vec3(0.62, 0.6, 0.56);
        gl_FragColor = vec4(mix(mortar, brick, height), height);
    }
`;

// Pass 2: a normal map from the height in the first texture's alpha channel.
const normalGLSL = /* glsl */ `
    uniform sampler2D uHeightTex;
    uniform float uStrength;
    varying vec2 uv0;

    void main() {
        float e = 1.0 / ${SIZE}.0;
        float l = texture2D(uHeightTex, uv0 - vec2(e, 0.0)).a;
        float r = texture2D(uHeightTex, uv0 + vec2(e, 0.0)).a;
        float d = texture2D(uHeightTex, uv0 - vec2(0.0, e)).a;
        float u = texture2D(uHeightTex, uv0 + vec2(0.0, e)).a;
        vec3 n = normalize(vec3((l - r) * uStrength, (d - u) * uStrength, 1.0));
        gl_FragColor = vec4(n * 0.5 + 0.5, 1.0);
    }
`;

/** A pass drawing a quad with a shader into its whole target: what RenderPassShaderQuad does, written out. */
class GeneratorPass extends pc.RenderPass {
  uniforms: Record<string, number | pc.Texture> = {};
  private quadRender: pc.QuadRender;

  constructor(device: pc.GraphicsDevice, name: string, shader: pc.Shader) {
    super(device);
    this.name = name;
    this.quadRender = new pc.QuadRender(shader);
  }

  override postInit(): void {
    // the quad covers the whole target, so clear it instead of loading its content
    this.setClearColor(pc.Color.BLACK);
  }

  override execute(): void {
    for (const [name, value] of Object.entries(this.uniforms)) this.device.scope.resolve(name).setValue(value);
    this.device.setDrawStates(); // no blending, no depth test or write
    this.quadRender.render();
  }

  override destroy(): void {
    this.quadRender.destroy();
    super.destroy();
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { distance: 8, pitch: -22, autoRotate: 14, floor: false });
  const { app, stage } = scene;
  const device = stage.device;

  const makeShader = (uniqueName: string, fragmentGLSL: string): pc.Shader =>
    pc.ShaderUtils.createShader(device, { uniqueName, attributes: { aPosition: pc.SEMANTIC_POSITION }, vertexChunk: 'quadVS', fragmentGLSL });
  const patternTexture = renderTexture(device, SIZE, SIZE, pc.PIXELFORMAT_RGBA8, pc.FILTER_LINEAR);
  const normalTexture = renderTexture(device, SIZE, SIZE, pc.PIXELFORMAT_RGBA8, pc.FILTER_LINEAR);
  const patternTarget = new pc.RenderTarget({ colorBuffer: patternTexture, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const normalTarget = new pc.RenderTarget({ colorBuffer: normalTexture, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const patternShader = makeShader('AdvBrickPattern', patternGLSL);
  const normalShader = makeShader('AdvBrickNormals', normalGLSL);
  const patternPass = new GeneratorPass(device, 'BrickPattern', patternShader);
  const normalPass = new GeneratorPass(device, 'BrickNormals', normalShader);
  patternPass.init(patternTarget);
  normalPass.init(normalTarget);

  const settings = { bricks: 5, mortar: 0.12, strength: 5 };
  patternPass.uniforms = { uBricks: 5, uMortar: 0.12 };
  normalPass.uniforms = { uHeightTex: patternTexture, uStrength: 5 };

  // The passes belong to no camera. They render on their own, from prerender, only when dirty.
  let dirty = true;
  let renders = 0;
  let readout: HTMLElement | null = null;
  app.on('prerender', () => {
    if (!dirty) return;
    dirty = false;
    patternPass.uniforms.uBricks = settings.bricks;
    patternPass.uniforms.uMortar = settings.mortar;
    normalPass.uniforms.uStrength = settings.strength;
    patternPass.render();
    normalPass.render();
    renders++;
    if (readout) readout.textContent = `generated ${renders} time${renders === 1 ? '' : 's'}, only when a setting changed`;
  });

  const material = new pc.StandardMaterial();
  material.diffuseMap = patternTexture;
  material.normalMap = normalTexture;
  material.bumpiness = 1;
  material.useMetalness = true;
  material.gloss = 0.25;
  material.update();
  const shapes = (['box', 'sphere'] as const).map((type, i) => {
    const e = new pc.Entity(type);
    e.addComponent('render', { type, material, castShadows: true });
    e.setLocalPosition(i ? 1.9 : -1.9, 1.2, 0);
    e.setLocalScale(2.6, 2.6, 2.6);
    app.root.addChild(e);
    return e;
  });

  let animate = ctx.preview;
  onTick(app, (t) => {
    shapes.forEach((s, i) => s.setLocalEulerAngles(10, t * 20 + i * 90, 0));
    if (animate) {
      settings.mortar = 0.1 + 0.08 * Math.sin(t * 1.5);
      dirty = true; // a changing setting regenerates every frame
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('bricks', 2, 10, 1, settings.bricks, (v) => {
      settings.bricks = v;
      dirty = true;
    });
    panel.slider('mortar', 0.02, 0.3, 0.01, settings.mortar, (v) => {
      settings.mortar = v;
      dirty = true;
    });
    panel.slider('normal strength', 0, 12, 0.5, settings.strength, (v) => {
      settings.strength = v;
      dirty = true;
    });
    panel.check('animate the mortar', false, (on) => (animate = on));
    panel.row();
    readout = panel.readout();
  }

  return () => {
    patternPass.destroy();
    normalPass.destroy();
    patternTarget.destroy();
    normalTarget.destroy();
    patternTexture.destroy();
    normalTexture.destroy();
    material.destroy();
    scene.dispose();
  };
};

export default mount;
