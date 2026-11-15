// A chart with a canvas layer: one named root, canvas elements hidden from assistive technology
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { canvasChartRenderer } from '@tanstack/charts/canvas';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { days, rng, walk } from '../../shared/random.ts';
import { describeTree } from '../../shared/style-surface.ts';
import { createStage } from '../../shared/stage.ts';

const dates = days('2025-01-01', 300);
const values = walk(rng(33), 300, 50, 1.2);
const rows = dates.map((date, i) => ({ id: `d${i}`, date, value: values[i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the canvas layer and compare the element list below the chart.' });
  const readout = stage.bar ? stage.readout() : null;
  // A canvas layer fills its container, so the container needs a definite height.
  stage.box.style.height = `${stage.height}px`;
  const build = (canvas: boolean) =>
    defineChart({
      marks: [
        areaY(rows, { x: 'date', y: 'value', fill: '#38bdf8', fillOpacity: 0.25, ...(canvas ? { renderer: canvasChartRenderer } : {}) }),
        lineY(rows, { x: 'date', y: 'value', stroke: '#38bdf8', strokeWidth: 1.5 }),
      ],
      scales: { x: { scale: scaleUtc }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  const options = (canvas: boolean) => ({ definition: build(canvas), height: stage.height, ariaLabel: 'Three hundred days of a random walk', ariaDescription: 'The area is painted on a canvas layer.' });
  const host = stage.own(mountChart(stage.box, options(true)));
  const show = (canvas: boolean): void => {
    host.update(options(canvas));
    stage.say(canvas ? 'area on a canvas layer' : 'all SVG');
    if (readout) queueMicrotask(() => { readout.textContent = describeTree(stage.box); });
  };
  show(true);
  if (stage.bar) checkbox(stage.bar, 'area on canvas', true, show);
  else stage.cycle([true, false], 2400, show);
  return () => stage.dispose();
};

export default mount;
