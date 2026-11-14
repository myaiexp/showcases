// Device loss: a render target painting is lost, and replayed from CPU data
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createAdvScene } from '../../shared/advanced.ts';
import { addScreen, renderTexture, screenMaterial } from '../../shared/advanced-feed.ts';
import { showNotice } from '../../shared/notice.ts';
import { createPanel } from '../../shared/panel.ts';
import { onTick } from '../../shared/shaders.ts';

const SIZE = 512;

const stampGLSL = /* glsl */ `
    uniform vec3 uColor;
    varying vec2 uv0;
    void main() {
        vec2 p = uv0 * 2.0 - 1.0;
        float d = length(p);
        if (d > 1.0) discard;
        gl_FragColor = vec4(uColor * (1.0 - 0.45 * d), 1.0);
    }
`;

interface Stamp {
  x: number;
  y: number;
  radius: number;
  color: [number, number, number];
}

const mount: Mount = async (el, ctx) => {
  const scene = await createAdvScene(el, ctx, { floor: false, sun: undefined, distance: 8, pitch: 0, yaw: 0, autoRotate: 0, clear: '#161a24' });
  const { app, stage } = scene;
  const device = stage.device;
  if (!device.isWebGL2) showNotice(el, 'The context-loss button below uses WEBGL_lose_context, so it only works on WebGL 2.');

  // The painting lives in a render target. Its pixels are GPU-only history: the engine recreates
  // the target after a loss but not what was drawn into it.
  const texture = renderTexture(device, SIZE, SIZE / 2);
  const target = new pc.RenderTarget({ colorBuffer: texture, depth: false, origin: pc.RENDERTARGET_ORIGIN_TOP });
  const shader = pc.ShaderUtils.createShader(device, {
    uniqueName: 'AdvDeviceLossStamp',
    attributes: { aPosition: pc.SEMANTIC_POSITION },
    vertexChunk: 'quadVS',
    fragmentGLSL: stampGLSL,
  });
  const pass = new pc.RenderPassShaderQuad(device);
  pass.name = 'Stamp';
  pass.shader = shader;
  pass.init(target);
  const colorId = device.scope.resolve('uColor');
  // One clear, then the pass only draws over what is there (setClearColor(undefined) goes back to loading).
  const wipe = (): void => {
    pass.setClearColor(new pc.Color(0.08, 0.1, 0.16, 1));
    pass.render();
    pass.setClearColor(undefined);
  };
  wipe();

  // The authoritative data: what was painted, kept in JavaScript.
  const stamps: Stamp[] = [];
  const draw = (s: Stamp): void => {
    colorId.setValue(s.color);
    pass.viewport = new pc.Vec4(s.x - s.radius, s.y - s.radius, s.radius * 2, s.radius * 2);
    pass.render();
  };
  let t = 0;
  let next = 0;
  app.on('prerender', () => {
    if (device.isContextLost()) return;
    if (t < next || stamps.length >= 140) return;
    next = t + (ctx.preview ? 0.12 : 0.25);
    const hue = (stamps.length * 0.07) % 1;
    const stamp: Stamp = { x: 40 + Math.random() * (SIZE - 80), y: 30 + Math.random() * (SIZE / 2 - 60), radius: 14 + Math.random() * 26, color: hsl(hue) };
    stamps.push(stamp);
    draw(stamp);
  });

  const material = screenMaterial(texture);
  const screen = addScreen(app, material, [0, 0, 0], 8, 4);
  const spinner = new pc.Entity('spinner');
  const spinnerMaterial = new pc.StandardMaterial();
  spinnerMaterial.emissive = new pc.Color(1, 0.8, 0.3);
  spinnerMaterial.useLighting = false;
  spinnerMaterial.update();
  spinner.addComponent('render', { type: 'torus', material: spinnerMaterial, castShadows: false });
  spinner.setLocalPosition(0, 3.4, 0.5);
  spinner.setLocalScale(0.9, 0.9, 0.9);
  app.root.addChild(spinner);
  let frames = 0;
  onTick(app, (time) => {
    t = time;
    frames++;
    spinner.setLocalEulerAngles(time * 90, time * 60, 0);
  });

  const handles: { off(): void }[] = [];
  let timer = 0;
  if (!ctx.preview) {
    const panel = createPanel(el);
    const log = panel.readout('events: none yet');
    let replay = true;
    const lines: string[] = [];
    const note = (text: string): void => {
      lines.unshift(`${t.toFixed(1)}s ${text}`);
      log.textContent = `events: ${lines.slice(0, 3).join(' | ')}`;
    };
    handles.push(
      device.on('devicelost', () => note(`devicelost (frame ${frames})`)),
      device.on('devicerestored', () => {
        note(replay ? `devicerestored, replaying ${stamps.length} stamps` : 'devicerestored, painting is blank');
        if (replay) {
          wipe();
          stamps.forEach(draw);
        }
      }),
    );
    panel.row();
    panel.check('replay the painting after restore', true, (on) => (replay = on));
    panel.button('Lose the context for a moment', () => {
      const gl = stage.canvas.getContext('webgl2');
      const ext = gl?.getExtension('WEBGL_lose_context');
      if (!ext || gl?.isContextLost()) return;
      ext.loseContext();
      timer = window.setTimeout(() => ext.restoreContext(), 1200);
    });
    panel.button('Clear the stamps', () => {
      stamps.length = 0;
      wipe();
    });
  }

  return () => {
    window.clearTimeout(timer);
    handles.forEach((h) => h.off());
    pass.destroy();
    target.destroy();
    texture.destroy();
    material.destroy();
    spinnerMaterial.destroy();
    screen.destroy();
    scene.dispose();
  };
};

/** A saturated colour from a hue in [0, 1). */
function hsl(h: number): [number, number, number] {
  const f = (n: number): number => 0.55 + 0.45 * Math.cos((h + n / 3) * Math.PI * 2);
  return [f(0), f(2), f(1)];
}

export default mount;
