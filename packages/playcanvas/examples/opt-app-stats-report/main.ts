// AppStats: a 500 ms report of frame, CPU, draw call and memory getters
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createScene, material } from '../../shared/components.ts';
import { addCanvasLabels } from '../../shared/graphics-basics.ts';
import { createPanel } from '../../shared/panel.ts';

interface Report {
  windowMs: number;
  samples: number;
  frameAvgMs: number;
  framePeakMs: number;
  cpuUpdateAvgMs: number;
  cpuRenderAvgMs: number;
  drawCallsAvg: number;
  gpuLatestMs: number | null;
  primitivesLatest: number | null;
  vramLatestMiB: number;
}

const mount: Mount = async (el, ctx) => {
  const scene = await createScene(el, ctx, { floor: 14, orbit: { distance: 10, pitch: -35, autoRotate: 10 }, sun: { shadows: true } });
  const { app } = scene;
  const stats = app.stats;

  const mat = material('#7bc67b', { metalness: 0.1, gloss: 0.5 });
  const boxes: pc.Entity[] = [];
  const setCount = (n: number): void => {
    while (boxes.length < n) {
      const i = boxes.length;
      const e = new pc.Entity('box');
      e.addComponent('render', { type: 'box', material: mat });
      e.setLocalScale(0.6, 0.6, 0.6);
      e.setLocalPosition(((i % 12) - 5.5) * 0.9, 0.3, (Math.floor(i / 12) % 12 - 5.5) * 0.9);
      app.root.addChild(e);
      boxes.push(e);
    }
    while (boxes.length > n) boxes.pop()!.destroy();
  };
  setCount(ctx.preview ? 30 : 40);

  // The readout lives over the canvas, so cards show it too.
  const layer = addCanvasLabels(scene.stage.canvas, []);
  const out = document.createElement('pre');
  Object.assign(out.style, { position: 'absolute', left: '6px', top: '4px', margin: '0', padding: '4px 8px', font: '11px/1.4 monospace', color: '#e8ebf2', background: 'rgba(10,12,18,0.65)', borderRadius: '4px' });
  layer.append(out);

  // The docs' sampler: accumulate every frame, publish about twice a second, reuse the state.
  const report: Report = { windowMs: 0, samples: 0, frameAvgMs: 0, framePeakMs: 0, cpuUpdateAvgMs: 0, cpuRenderAvgMs: 0, drawCallsAvg: 0, gpuLatestMs: null, primitivesLatest: null, vramLatestMiB: 0 };
  let elapsed = 0;
  let samples = 0;
  let framePeak = 0;
  let updateTotal = 0;
  let renderTotal = 0;
  let drawCallsTotal = 0;
  const f = (v: number | null, d = 2, unit = ''): string => (v === null ? 'n/a' : `${v.toFixed(d)}${unit}`);
  const sampleStats = (): void => {
    elapsed += stats.frameTime;
    samples++;
    framePeak = Math.max(framePeak, stats.frameTime);
    updateTotal += stats.cpuUpdateTime;
    renderTotal += stats.cpuRenderTime;
    drawCallsTotal += stats.drawCallCount;
    if (elapsed < 500) return;
    report.windowMs = elapsed;
    report.samples = samples;
    report.frameAvgMs = elapsed / samples;
    report.framePeakMs = framePeak;
    report.cpuUpdateAvgMs = updateTotal / samples;
    report.cpuRenderAvgMs = renderTotal / samples;
    report.drawCallsAvg = drawCallsTotal / samples;
    report.gpuLatestMs = stats.gpuFrameTime ?? null;
    report.primitivesLatest = stats.primitiveCount ?? null;
    report.vramLatestMiB = stats.vramTotalBytes / (1024 * 1024);
    out.textContent = [
      `frame   ${f(report.frameAvgMs, 1, ' ms')} avg, ${f(report.framePeakMs, 1, ' ms')} peak (${report.samples} frames)`,
      `cpu     update ${f(report.cpuUpdateAvgMs)} ms, render ${f(report.cpuRenderAvgMs)} ms`,
      `draws   ${f(report.drawCallsAvg, 0)} per frame`,
      `gpu     ${f(report.gpuLatestMs, 2, ' ms')} (profiler off or unsupported: n/a)`,
      `prims   ${f(report.primitivesLatest, 0)} (debug/profiler builds only)`,
      `vram    ${f(report.vramLatestMiB, 2, ' MiB')}`,
    ].join('\n');
    elapsed = samples = 0;
    framePeak = updateTotal = renderTotal = drawCallsTotal = 0;
  };
  app.on('frameend', sampleStats);

  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (ctx.preview) {
      const n = 25 + Math.round(20 * Math.sin(t * 0.7));
      if (n !== boxes.length) setCount(n);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('boxes', 0, 144, 1, boxes.length, setCount);
    panel.check('sun shadows', true, (on) => (scene.sun!.light!.castShadows = on));
    panel.readout('The same getters work without any overlay: read them, average them, compare runs.');
  }

  return () => {
    app.off('frameend', sampleStats);
    mat.destroy();
    scene.dispose();
  };
};

export default mount;
