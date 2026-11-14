// GPU frame time: enable the device profiler, read gpuFrameTime or undefined
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

const TINTS = ['#e8794a', '#4ab3e8', '#7bc67b', '#f2c14e', '#a78bfa'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { height: 380 });
  const { app, device } = stage;
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', { clearColor: new pc.Color(0.05, 0.06, 0.09) });
  camera.setPosition(0, 0, 3);
  app.root.addChild(camera);

  // Fill rate is what the GPU time follows here: stacked screen-sized blended layers,
  // each shading every pixel again (overdraw), one draw call each, but it is the pixels that cost.
  const layers: pc.Entity[] = [];
  const mats: pc.StandardMaterial[] = [];
  const setLayers = (n: number): void => {
    while (layers.length < n) {
      const i = layers.length;
      const m = new pc.StandardMaterial();
      m.useLighting = false;
      m.emissive = new pc.Color().fromString(TINTS[i % TINTS.length]!);
      m.diffuse = new pc.Color(0, 0, 0);
      m.opacity = 0.12;
      m.blendType = pc.BLEND_NORMAL;
      m.depthWrite = false;
      m.update();
      mats.push(m);
      const e = new pc.Entity('layer');
      e.addComponent('render', { type: 'plane', material: m, castShadows: false });
      e.setLocalEulerAngles(90, 0, 0);
      e.setLocalPosition(0, 0, -0.01 * i);
      e.setLocalScale(12, 1, 7);
      app.root.addChild(e);
      layers.push(e);
    }
    while (layers.length > n) {
      layers.pop()!.destroy();
      mats.pop()!.destroy();
    }
  };
  setLayers(ctx.preview ? 20 : 30);

  const profiler = device.gpuProfiler;
  const layer = addCanvasLabels(stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  // The profiler object can exist while timing is unsupported: only a value tells.
  if (profiler) profiler.enabled = true;
  let t = 0;
  let shown = 0;
  let smooth: number | null = null;
  app.on('update', (dt: number) => {
    t += dt;
    shown += dt;
    if (ctx.preview) {
      const n = 10 + Math.round(20 * (0.5 + 0.5 * Math.sin(t * 0.8)));
      if (n !== layers.length) setLayers(n);
    }
    const gpu = app.stats.gpuFrameTime;
    if (gpu !== undefined) smooth = smooth === null ? gpu : smooth * 0.9 + gpu * 0.1;
    if (shown > 0.25) {
      shown = 0;
      out.textContent = [
        `backend      ${device.isWebGPU ? 'WebGPU' : 'WebGL 2'}`,
        `profiler     ${profiler ? (profiler.enabled ? 'enabled' : 'disabled') : 'none'}`,
        `gpuFrameTime ${gpu === undefined ? 'undefined (no measurement)' : `${gpu.toFixed(2)} ms (smoothed ${smooth!.toFixed(2)})`}`,
        `layers       ${layers.length}, draw calls ${app.stats.drawCallCount}`,
      ].join('\n');
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('overdraw layers', 0, 200, 1, layers.length, setLayers);
    panel.check('gpuProfiler.enabled', true, (on) => {
      if (profiler) profiler.enabled = on;
      smooth = null;
    });
    panel.readout('WebGL 2 needs EXT_disjoint_timer_query_webgl2, WebGPU needs timestamp-query. Without them the value stays undefined, which is not zero.');
  }

  return () => {
    if (profiler) profiler.enabled = false;
    mats.forEach((m) => m.destroy());
    stage.dispose();
  };
};

export default mount;
