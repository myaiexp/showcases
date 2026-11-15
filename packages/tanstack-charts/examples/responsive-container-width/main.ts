// Width follows the container: mountChart without width measures the box and re-lays out on every change
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { breathe } from '../../shared/style-box.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the width slider: the chart is never given a width, it measures its container.' });
  const readout = stage.bar ? stage.readout() : null;

  const definition = defineChart({
    marks: [lineY(revenue, { id: 'revenue', x: 'month', y: 'revenue', points: true, stroke: '#60a5fa' })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2), axis: { label: 'Month' } },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Revenue (USD)' } },
    },
  });

  // No `width` option: the host follows the container's content width.
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Monthly revenue',
      onRender: ({ scene }) => {
        if (readout) readout.textContent = `container ${Math.round(stage.box.clientWidth)}px -> scene ${scene.width}px wide, plot ${Math.round(scene.chart.width)}px`;
        else stage.say(`scene width ${Math.round(scene.width)}px`);
      },
    }),
  );
  if (stage.bar) slider(stage.bar, 'container width', 30, 100, 1, 100, (v) => { stage.box.style.width = `${v}%`; }, (v) => `${v}%`);
  else breathe(stage, 45, 100);
  return () => stage.dispose();
};

export default mount;
