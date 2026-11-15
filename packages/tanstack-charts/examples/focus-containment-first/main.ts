// Containment before distance: overlapping dots of different sizes and the readout of what is focused
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [
  { id: 'big', x: 32, y: 50, r: 50 },
  { id: 'small', x: 42, y: 50, r: 14 },
  { id: 'far', x: 72, y: 50, r: 10 },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Sweep across: the small dot is painted last, so it wins where the shapes overlap.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  show('focused: none');

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', r: 'r', key: 'id', fillOpacity: 0.35, stroke: 'currentColor', strokeOpacity: 0.5 })],
    scales: { x: { scale: scaleLinear().domain([0, 100]) }, y: { scale: scaleLinear().domain([0, 100]) } },
    maxFocusDistance: 30,
  });

  stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Three overlapping dots',
      onFocusChange: (p) => show(`focused: ${p ? p.datum.id : 'none'}`),
    }),
  );
  if (stage.preview) stage.ghost((t) => [0.1 + 0.7 * (t < 0.5 ? t * 2 : 2 - t * 2), 0.5]);
  return () => stage.dispose();
};

export default mount;
