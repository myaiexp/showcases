// Shader quads into atlas tiles: viewport, overlay blend, drawQuadWithShader
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { createPanel } from '../../shared/panel.ts';

const TILE = 256;

const plasma = /* glsl */ `
    uniform float uTime;
    varying vec2 uv0;
    void main() {
        vec2 p = uv0 * 6.0;
        float v = sin(p.x + uTime) + sin(p.y * 1.3 - uTime * 0.7) + sin((p.x + p.y) * 0.8 + uTime * 0.5);
        gl_FragColor = vec4(0.5 + 0.5 * cos(vec3(0.0, 2.0, 4.0) + v), 1.0);
    }
`;
const rings = /* glsl */ `
    uniform float uTime;
    varying vec2 uv0;
    void main() {
        float d = length(uv0 - 0.5);
        float v = 0.5 + 0.5 * sin(d * 50.0 - uTime * 4.0);
        gl_FragColor = vec4(vec3(0.1, 0.5, 0.9) * v + vec3(0.02, 0.05, 0.1), 1.0);
    }
`;
const checker = /* glsl */ `
    uniform float uTime;
    varying vec2 uv0;
    void main() {
        float c = cos(uTime * 0.6);
        float s = sin(uTime * 0.6);
        vec2 p = mat2(c, -s, s, c) * (uv0 - 0.5) * 8.0;
        float k = mod(floor(p.x) + floor(p.y), 2.0);
        gl_FragColor = vec4(mix(vec3(0.95, 0.75, 0.2), vec3(0.2, 0.12, 0.05), k), 1.0);
    }
`;
const cells = /* glsl */ `
    uniform float uTime;
    varying vec2 uv0;
    vec2 hash2(vec2 p) { return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453); }
    void main() {
        vec2 g = uv0 * 5.0;
        vec2 i = floor(g);
        float best = 9.0;
        for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
                vec2 cell = i + vec2(float(x), float(y));
                vec2 point = cell + 0.5 + 0.45 * sin(uTime + 6.2831 * hash2(cell));
                best = min(best, length(g - point));
            }
        }
        gl_FragColor = vec4(vec3(0.9, 0.3, 0.45) * (1.0 - best), 1.0);
    }
`;
// drawn over the first tile with alpha blending
const badge = /* glsl */ `
    uniform float uTime;
    varying vec2 uv0;
    void main() {
        float d = abs(length(uv0 - 0.5) - 0.28 - 0.04 * sin(uTime * 3.0));
        float a = smoothstep(0.03, 0.0, d);
        gl_FragColor = vec4(1.0, 1.0, 1.0, a);
    }
`;

const shaderFor = (device: pc.GraphicsDevice, name: string, fragmentGLSL: string): pc.Shader =>
  pc.ShaderUtils.createShader(device, { uniqueName: name, attributes: { aPosition: pc.SEMANTIC_POSITION }, vertexChunk: 'quadVS', fragmentGLSL });

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 7.5, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const device = stage.device;

  const atlas = renderTexture(device, TILE * 2, TILE * 2);
  const target = new pc.RenderTarget({ colorBuffer: atlas, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const material = screenMaterial(atlas);
  const screen = addScreen(app, material, [0, 0, 0], 5.6, 5.6);

  const shaders = [plasma, rings, checker].map((src, i) => shaderFor(device, `AdvAtlasTile${i}`, src));
  const overlay = shaderFor(device, 'AdvAtlasBadge', badge);
  const immediate = shaderFor(device, 'AdvAtlasCells', cells);

  // One pass is reused for every tile: set the shader and the viewport, then render. The atlas is
  // never cleared, so tiles that are not drawn this frame keep their last content.
  const pass = new pc.RenderPassShaderQuad(device);
  pass.name = 'AtlasTile';
  pass.init(target);
  const tiles = [new pc.Vec4(0, 0, TILE, TILE), new pc.Vec4(TILE, 0, TILE, TILE), new pc.Vec4(0, TILE, TILE, TILE), new pc.Vec4(TILE, TILE, TILE, TILE)];
  const live = [true, true, true, true];
  const timeId = device.scope.resolve('uTime');

  let t = 0;
  let frame = 0;
  app.on('update', (dt: number) => (t += dt));
  app.on('prerender', () => {
    timeId.setValue(t);
    const i = frame++ % 4; // one tile per frame, in turn
    if (!live[i]) return;
    if (i < 3) {
      pass.shader = shaders[i]!;
      pass.viewport = tiles[i]!;
      pass.render();
      if (i === 0) {
        // blend a second shader over the same tile
        pass.shader = overlay;
        pass.blendState = pc.BlendState.ALPHABLEND;
        pass.render();
        pass.blendState = pc.BlendState.NOBLEND;
      }
    } else {
      // a single draw with no pass to set up: it allocates a pass each call, so it suits one-off drawing
      pc.drawQuadWithShader(device, target, immediate, tiles[3]);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    ['plasma + badge (blend)', 'rings', 'checker', 'cells (drawQuadWithShader)'].forEach((name, i) => panel.check(name, true, (on) => (live[i] = on)));
    panel.row();
    panel.readout('One tile is redrawn per frame; unticked tiles stay frozen because nothing clears the atlas.');
  }

  return () => {
    pass.destroy();
    [...shaders, overlay, immediate].forEach((s) => s.destroy());
    target.destroy();
    atlas.destroy();
    material.destroy();
    screen.destroy();
    scene.dispose();
  };
};

export default mount;
