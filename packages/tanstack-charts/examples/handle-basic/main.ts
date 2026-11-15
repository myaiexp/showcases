// handleX with the track above the plot: reasons read back, arrow keys sent in the card
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { handleX, type HandleXChange } from '@tanstack/charts/interaction/handle';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { keys } from '../../shared/interact-drive.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const values = weekPoints.map((p) => p.n);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the knob, or focus it and use the arrow keys, Home and End.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let week = 4;
  show('week 4');

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]), axis: { label: 'Week' } }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        handleX({
          value: controlledSignal<number, HandleXChange<number>>(week, (next, { reason }) => {
            week = next;
            show(`${reason.type} (${reason.source}): week ${next}, from ${reason.origin}`);
            host.update(options());
          }),
          values,
          cross: { edge: 'top', offset: 14 },
          ariaLabel: 'Week',
          format: (v) => `Week ${v}`,
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a handle',
  });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.preview) keys(stage, () => stage.box.querySelector('[data-chart-handle-surface]'), ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'Home', 'End'], 900);
  return () => stage.dispose();
};

export default mount;
