// Automatic guide space: with margin omitted, long tick labels set the left margin from measured text
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { breathe } from '../../shared/style-box.ts';
import { features } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Narrow the box: labels are thinned or shifted, and the margin stays just big enough.' });
  const readout = stage.bar ? stage.readout() : null;
  // Cards are narrow: shorten the names so the plot still shows.
  const rows = stage.preview ? features.map((f) => ({ ...f, feature: f.feature.split(' ').slice(0, 2).join(' ') })) : features;

  const definition = defineChart({
    marks: [barX(rows, { x: 'weeklyRequests', y: 'feature', fill: '#a78bfa', inset: 1 })],
    scales: {
      x: { scale: scaleLinear, nice: true, grid: true, axis: { ticks: { count: 5 }, label: 'Weekly requests' } },
      y: { scale: () => scaleBand<string>().padding(0.1) },
    },
  });
  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      ariaLabel: 'Feature requests per week',
      onRender: ({ scene }) => {
        const m = scene.margin;
        const text = `margin top ${Math.round(m.top)}  right ${Math.round(m.right)}  bottom ${Math.round(m.bottom)}  left ${Math.round(m.left)}`;
        if (readout) readout.textContent = text;
        else stage.say(text);
      },
    }),
  );
  if (stage.bar) slider(stage.bar, 'container width', 40, 100, 1, 100, (v) => { stage.box.style.width = `${v}%`; }, (v) => `${v}%`);
  else breathe(stage, 82, 100);
  return () => stage.dispose();
};

export default mount;
