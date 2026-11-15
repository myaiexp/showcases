// Per-mark Canvas: a dense area paints on a canvas layer between SVG marks, which stay SVG
import { areaY, defineChart, dot, lineY, mountChart, text } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2025-01-01', 600);
const mid = walk(rng(44), 600, 50, 1.2);
const band = dates.map((date, i) => ({ id: `d${i}`, date, low: mid[i]! - 6, high: mid[i]! + 6 }));
const summary = dates.filter((_, i) => i % 60 === 0).map((date, k) => ({ id: `s${k}`, date, value: mid[k * 60]!, label: `${k + 1}` }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Inspect the chart: the area is a canvas layer behind the SVG line, dots and labels.' });
  let canvas = true;
  // The layered host fills its container (height: 100%), so the container needs a definite height.
  stage.box.style.height = `${stage.height}px`;

  const build = () =>
    defineChart({
      marks: [
        areaY(band, { id: 'range', x: 'date', y1: 'low', y2: 'high', fill: '#60a5fa', fillOpacity: 0.3, ...(canvas ? { renderer: canvasChartRenderer } : {}) }),
        lineY(summary, { id: 'summary', x: 'date', y: 'value', stroke: '#facc15', strokeWidth: 2 }),
        dot(summary, { id: 'highlights', x: 'date', y: 'value', r: 4, fill: '#facc15' }),
        text(summary, { id: 'labels', x: 'date', y: 'value', text: 'label', dy: -12 }),
      ],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Dense range with summary' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    canvas = v;
    host.update(options());
    stage.say(v ? 'area: renderer canvasChartRenderer' : 'area: default SVG renderer');
  };
  const readout = stage.bar ? stage.readout() : null;
  const report = (): void => {
    if (readout) readout.textContent = `canvas elements (layers and buffers): ${stage.box.querySelectorAll('canvas').length}, svg elements: ${stage.box.querySelectorAll('svg').length}`;
  };
  if (stage.bar) checkbox(stage.bar, 'area on canvas', true, (v) => { set(v); queueMicrotask(report); });
  else stage.cycle([true, false], 2500, set);
  stage.after(50, report);
  return () => stage.dispose();
};

export default mount;
