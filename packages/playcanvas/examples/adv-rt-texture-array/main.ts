// Four render targets each fill one layer of a 2D texture array
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, createFeed, SCREEN_ATTRIBUTES, SCREEN_VERTEX_GLSL } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick, type ShaderDesc } from '../../shared/shaders.ts';

const LAYERS = 4;

// StandardMaterial cannot sample a texture array: a custom shader declares sampler2DArray and
// picks the layer with the third texture coordinate. The screen is a 2 x 2 grid of layers.
const shaderDesc: ShaderDesc = {
  uniqueName: 'AdvRtTextureArray',
  vertexGLSL: SCREEN_VERTEX_GLSL,
  fragmentGLSL: /* glsl */ `
    varying vec2 vUv0;
    uniform mediump sampler2DArray uLayers;
    uniform float uOnly;
    void main(void) {
        vec2 cell = floor(vUv0 * 2.0);
        vec2 uv = fract(vUv0 * 2.0);
        float layer = cell.x + (1.0 - cell.y) * 2.0;
        if (uOnly >= 0.0) {
            layer = uOnly;
            uv = vUv0;
        }
        vec3 c = texture(uLayers, vec3(uv, layer)).rgb;
        float edge = (uOnly < 0.0 && (min(uv.x, uv.y) < 0.008 || max(uv.x, uv.y) > 0.992)) ? 1.0 : 0.0;
        gl_FragColor = vec4(mix(c, vec3(0.1), edge), 1.0);
    }
  `,
  attributes: SCREEN_ATTRIBUTES,
};

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const feed = createFeed(app);
  onTick(app, (t) => feed.animate(t));

  const size = ctx.preview ? 128 : 256;
  const textureArray = new pc.Texture(stage.device, {
    name: 'feed-layers',
    width: size,
    height: size,
    arrayLength: LAYERS,
    format: pc.PIXELFORMAT_RGBA8,
    mipmaps: false,
    minFilter: pc.FILTER_LINEAR,
    magFilter: pc.FILTER_LINEAR,
    addressU: pc.ADDRESS_CLAMP_TO_EDGE,
    addressV: pc.ADDRESS_CLAMP_TO_EDGE,
  });

  // One render target per layer, all sharing the texture; each camera sees the feed differently.
  const clears = ['#0a1230', '#2a1030', '#0a2a1c', '#2e220a'];
  const targets: pc.RenderTarget[] = [];
  const cameras: pc.Entity[] = [];
  for (let layer = 0; layer < LAYERS; layer++) {
    const target = new pc.RenderTarget({ colorBuffer: textureArray, layer, depth: true, origin: pc.RENDERTARGET_ORIGIN_TOP });
    const camera = feed.addCamera({ renderTarget: target, priority: -LAYERS + layer, clearColor: new pc.Color().fromString(clears[layer]!) }, 6 + layer * 1.4);
    camera.setLocalEulerAngles(0, 0, layer * 90); // each layer is rolled a quarter turn further
    targets.push(target);
    cameras.push(camera);
  }

  const material = new pc.ShaderMaterial(shaderDesc);
  material.setParameter('uLayers', textureArray);
  material.setParameter('uOnly', -1);
  const screen = addScreen(app, material, [0, 0, 0], 6, 6);

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('show', ['all four', 'layer 0', 'layer 1', 'layer 2', 'layer 3'], 'all four', (v) => {
      material.setParameter('uOnly', v === 'all four' ? -1 : Number(v.slice(-1)));
    });
    panel.readout('One texture, four layers: each render target takes its layer, the shader indexes it with texture(uLayers, vec3(uv, layer)).');
  }

  return () => {
    cameras.forEach((c) => c.destroy());
    targets.forEach((t) => t.destroy());
    textureArray.destroy(); // shared by every target: destroyed once
    material.destroy();
    screen.destroy();
    feed.dispose();
    scene.dispose();
  };
};

export default mount;
