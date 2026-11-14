// Render target formats: only HDR formats keep values above 1
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, createFeed, renderTexture } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick, type ShaderDesc } from '../../shared/shaders.ts';

// The screen shows texture / uRange, and tints texels whose value is above 1 magenta.
const shaderDesc: ShaderDesc = {
  uniqueName: 'AdvRtFormatsScreen',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    attribute vec2 aUv0;
    uniform mat4 matrix_model;
    uniform mat4 matrix_viewProjection;
    varying vec2 vUv0;
    void main(void) {
        vUv0 = aUv0;
        gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    varying vec2 vUv0;
    uniform sampler2D uTex;
    uniform float uRange;
    void main(void) {
        vec3 c = texture2D(uTex, vUv0).rgb;
        vec3 shown = c / uRange;
        float over = step(1.001, max(c.r, max(c.g, c.b)));
        gl_FragColor = vec4(mix(shown, vec3(1.0, 0.1, 0.8), over * 0.45), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION, aUv0: pc.SEMANTIC_TEXCOORD0 },
};

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const device = stage.device;
  const feed = createFeed(app, 200, 4); // the bar rotating through the middle is four times brighter than white

  const formats: Record<string, number> = { RGBA8: pc.PIXELFORMAT_RGBA8, SRGBA8: pc.PIXELFORMAT_SRGBA8, RGB10A2: pc.PIXELFORMAT_RGB10A2 };
  if (device.textureHalfFloatRenderable) formats.RGBA16F = pc.PIXELFORMAT_RGBA16F;
  if (device.textureFloatRenderable) formats.RGBA32F = pc.PIXELFORMAT_RGBA32F;
  const names = Object.keys(formats);

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uRange', 4);
  const screen = addScreen(app, material, [0, 0, 0], 8, 6);

  let texture: pc.Texture;
  let target: pc.RenderTarget;
  let camera: pc.Entity | null = null;
  const build = (name: string): void => {
    camera?.destroy();
    target?.destroy();
    texture?.destroy();
    texture = renderTexture(device, 480, 360, formats[name]);
    target = new pc.RenderTarget({ colorBuffer: texture, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP });
    camera = feed.addCamera({ renderTarget: target, priority: -1 });
    material.setParameter('uTex', texture);
  };
  let current = names.includes('RGBA16F') ? 'RGBA16F' : 'RGBA8';
  build(current);

  // A card alternates between an LDR and an HDR format by itself.
  let clock = 0;
  onTick(app, (t, dt) => {
    feed.animate(t);
    clock += dt;
    if (ctx.preview && clock > 2.5 && names.includes('RGBA16F')) {
      clock = 0;
      current = current === 'RGBA8' ? 'RGBA16F' : 'RGBA8';
      build(current);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('colour format', names, current, (v) => build((current = v)));
    panel.slider('display range', 1, 4, 0.1, 4, (v) => material.setParameter('uRange', v));
    panel.row();
    panel.readout('The white bar is emissive at 4.0. RGBA8 clamps it to 1; the float formats keep it (magenta marks values above 1).');
  }

  return () => {
    camera?.destroy();
    target.destroy();
    texture.destroy();
    material.destroy();
    screen.destroy();
    feed.dispose();
    scene.dispose();
  };
};

export default mount;
