// handleX cross: { value }: the track at y = 1000 inside the plot
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { handleX, type HandleXChange } from '@tanstack/charts/interaction/handle';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { keys } from '../../shared/interact-drive.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const values = weekPoints.map((p) => p.n);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The knob rides on the 1,000 line inside the plot.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let week = 5;

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]) }, y: { scale: scaleLinear().domain([700, 1600]), grid: true } },
      controls: [
        handleX({
          value: controlledSignal<number, HandleXChange<number>>(week, (next) => {
            week = next;
            host.update(options());
            stage.say(`week ${next}`);
          }),
          values,
          cross: { value: 1000 },
          trackStyle: { stroke: '#fbbf24', strokeWidth: 2 },
          ariaLabel: 'Week',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a handle inside the plot',
  });
  const host = stage.own(mountChart(stage.box, options()));
  stage.say('week 5');

  if (stage.preview) keys(stage, () => stage.box.querySelector('[data-chart-handle-surface]'), ['ArrowRight', 'ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'], 900);
  return () => stage.dispose();
};

export default mount;
