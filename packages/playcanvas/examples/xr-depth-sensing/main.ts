// Depth sensing: LA8 depth unpacking, distance and occlusion, simulated
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import type { ShaderDesc } from '../../shared/shaders.ts';
import { addXrEntry, createXrScene, type XrEntryHandle } from '../../shared/xr.ts';
import { H, RAW_TO_METERS, W, buildRoom } from './room.ts';

const VIEWS = ['depth map', 'camera colour', 'occlusion'] as const;

// The unpacking from the docs: the two bytes of a raw depth, then raw to metres.
const shaderDesc: ShaderDesc = {
  uniqueName: 'XrDepthSensingView',
  vertexGLSL: /* glsl */ `
    attribute vec3 aPosition;
    uniform vec2 uScale;
    varying vec2 vUv;
    void main(void) {
        vUv = vec2(aPosition.x + 0.5, aPosition.z + 0.5);
        gl_Position = vec4(aPosition.x * 2.0 * uScale.x, -aPosition.z * 2.0 * uScale.y, 0.0, 1.0);
    }
  `,
  fragmentGLSL: /* glsl */ `
    uniform sampler2D uDepth;
    uniform sampler2D uColor;
    uniform float uView;
    uniform float uRawToMeters;
    uniform float uVirtual;
    uniform vec2 uProbe;
    varying vec2 vUv;
    void main(void) {
        vec2 packedDepth = texture2D(uDepth, vUv).ra;
        float depth = dot(packedDepth, vec2(255.0, 256.0 * 255.0)) * uRawToMeters;
        vec3 colour = texture2D(uColor, vUv).rgb;
        vec3 result;
        if (uView < 0.5) {
            float g = clamp(depth / 7.0, 0.0, 1.0);   // darker is closer
            result = vec3(g);
        } else if (uView < 1.5) {
            result = colour;
        } else {
            // A virtual disc at uVirtual metres: drawn only where the real surface is farther.
            float disc = 1.0 - smoothstep(0.14, 0.145, distance(vUv * vec2(1.333, 1.0), vec2(0.5 * 1.333, 0.55)));
            result = colour;
            if (disc > 0.0 && uVirtual < depth) result = mix(colour, vec3(1.0, 0.25, 0.55), disc);
        }
        float ring = smoothstep(0.012, 0.009, abs(distance(vUv * vec2(1.333, 1.0), uProbe * vec2(1.333, 1.0)) - 0.02));
        gl_FragColor = vec4(mix(result, vec3(1.0, 0.9, 0.2), ring), 1.0);
    }
  `,
  attributes: { aPosition: pc.SEMANTIC_POSITION },
};

const texture = (device: pc.GraphicsDevice, data: Uint8Array, filter: number): pc.Texture =>
  new pc.Texture(device, { width: W, height: H, format: pc.PIXELFORMAT_RGBA8, mipmaps: false, minFilter: filter, magFilter: filter, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE, levels: [data] });

const mount: Mount = async (el, ctx) => {
  const scene = await createXrScene(el, ctx, { floor: false, interactive: false, autoRotate: 0 });
  const { app, camera, stage } = scene;
  camera.camera!.clearColor = new pc.Color(0.05, 0.05, 0.07);
  const room = buildRoom();
  // Packed bytes must not be interpolated, so the depth texture is sampled nearest.
  const depthTexture = texture(stage.device, room.depth, pc.FILTER_NEAREST);
  const colorTexture = texture(stage.device, room.color, pc.FILTER_LINEAR);

  const material = new pc.ShaderMaterial(shaderDesc);
  material.cull = pc.CULLFACE_NONE;
  material.setParameter('uDepth', depthTexture);
  material.setParameter('uColor', colorTexture);
  material.setParameter('uRawToMeters', RAW_TO_METERS);
  material.setParameter('uView', 0);
  material.setParameter('uVirtual', 2.2);
  material.setParameter('uProbe', [0.5, 0.55]);
  const quad = new pc.Entity('screen-quad');
  quad.addComponent('render', { type: 'plane', material, castShadows: false });
  app.root.addChild(quad);
  quad.render!.meshInstances[0]!.cull = false;
  const scale = [1, 1];
  const probe = new pc.Vec2(0.5, 0.55);

  const state = { view: 0, virtual: 2.2, usage: pc.XRDEPTHSENSINGUSAGE_GPU as string, format: pc.XRDEPTHSENSINGFORMAT_F32 as string };
  const ac = new AbortController();
  if (!ctx.preview) {
    // The picked point asks the depth map how far away it is, like view.getDepth(u, v).
    stage.canvas.addEventListener('pointermove', (e) => {
      const r = stage.canvas.getBoundingClientRect();
      const ax = (4 / 3) * (r.height / r.width);
      const sx = Math.min(1, ax), sy = Math.min(1, 1 / ax);
      probe.set(((e.clientX - r.left) / r.width - 0.5) / sx + 0.5, ((e.clientY - r.top) / r.height - 0.5) / sy + 0.5);
    }, { signal: ac.signal });
  }
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    const aspect = stage.canvas.clientWidth / Math.max(1, stage.canvas.clientHeight);
    scale[0] = Math.min(1, 4 / 3 / aspect);
    scale[1] = Math.min(1, aspect / (4 / 3));
    material.setParameter('uScale', scale);
    if (ctx.preview) {
      state.view = Math.floor(t / 3) % 3;
      state.virtual = 2.2 + Math.sin(t * 1.2) * 1.4;
      probe.set(0.5 + Math.sin(t) * 0.3, 0.55 + Math.cos(t * 1.3) * 0.2);
    }
    material.setParameter('uView', state.view);
    material.setParameter('uVirtual', state.virtual);
    material.setParameter('uProbe', [probe.x, probe.y]);
  });

  let entry: XrEntryHandle | null = null;
  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('view', VIEWS, 'depth map', (v) => (state.view = VIEWS.indexOf(v)));
    panel.slider('virtual object depth (m)', 0.5, 6, 0.1, state.virtual, (v) => (state.virtual = v));
    panel.select('usage', [pc.XRDEPTHSENSINGUSAGE_GPU, pc.XRDEPTHSENSINGUSAGE_CPU], pc.XRDEPTHSENSINGUSAGE_GPU, (v) => (state.usage = v));
    panel.select('format', [pc.XRDEPTHSENSINGFORMAT_F32, pc.XRDEPTHSENSINGFORMAT_L8A8], pc.XRDEPTHSENSINGFORMAT_F32, (v) => (state.format = v));
    const info = panel.readout('');
    const flags = panel.readout('');
    app.on('update', () => {
      const d = room.distance(probe.x, probe.y);
      info.textContent = `simulated depth under the ring: ${d === null ? 'none' : `${d.toFixed(2)} m`}`;
      const v = app.xr?.views;
      const live = v?.get(pc.XREYE_NONE)?.getDepth(0.5, 0.5);
      flags.textContent = `views.supportedDepth ${!!v?.supportedDepth}, supportedColor ${!!v?.supportedColor}, availableDepth ${!!v?.availableDepth}${live != null ? `, real centre distance ${live.toFixed(2)} m` : ''}`;
    });
    entry = addXrEntry(el, panel, scene, [
      {
        type: pc.XRTYPE_AR,
        space: pc.XRSPACE_LOCALFLOOR,
        label: 'Enter AR',
        get options() {
          return { cameraColor: true, depthSensing: { usagePreference: state.usage, dataFormatPreference: state.format } };
        },
      },
    ]);
  }
  return () => {
    ac.abort();
    entry?.dispose();
    material.destroy();
    depthTexture.destroy();
    colorTexture.destroy();
    scene.dispose();
  };
};

export default mount;
