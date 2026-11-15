// The same dots as SVG circles or on canvas: DOM node count and update time side by side
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { cloud } from '../../shared/render-data.ts';
import { createStage } from '../../shared/stage.ts';

const all = cloud(8000, 61);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the renderer or the row count and compare the readout.' });
  if (stage.preview) stage.height -= 34;
  const readout = stage.preview ? null : stage.readout();
  const state = { n: stage.preview ? 500 : 2000, canvas: true };
  stage.box.style.height = `${stage.height}px`; // the layered host fills its container

  const options = () => ({
    definition: defineChart({
      marks: [dot(all.slice(0, state.n), { x: 'x', y: 'y', key: 'id', r: 2, fill: '#60a5fa', fillOpacity: 0.5, ...(state.canvas ? { renderer: canvasChartRenderer } : {}) })],
      scales: { x: { scale: scaleLinear, nice: true }, y: { scale: scaleLinear, nice: true, grid: true } },
      pointer: false,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Scatter with many dots',
  });
  const host = stage.own(mountChart(stage.box, options()));
  const apply = (): void => {
    const t0 = performance.now();
    host.update(options());
    const ms = performance.now() - t0;
    queueMicrotask(() => {
      const text = `${state.n} rows on ${state.canvas ? 'canvas' : 'SVG'}: circle elements ${stage.box.querySelectorAll('circle').length}, canvas elements ${stage.box.querySelectorAll('canvas').length}, update call ${ms.toFixed(0)} ms`;
      if (readout) readout.textContent = text;
      else stage.say(text);
    });
  };
  if (stage.bar) {
    checkbox(stage.bar, 'canvas', true, (v) => { state.canvas = v; apply(); });
    slider(stage.bar, 'rows', 500, 8000, 500, state.n, (v) => { state.n = v; apply(); });
  } else stage.cycle([true, false], 2400, (v) => { state.canvas = v; apply(); });
  stage.after(80, apply);
  return () => stage.dispose();
};

export default mount;
