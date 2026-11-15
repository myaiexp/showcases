// One controlled week shared by handleX and a native range input
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { handleX, type HandleXChange } from '@tanstack/charts/interaction/handle';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const values = weekPoints.map((p) => p.n);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider above or the knob on the chart.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let week = 3;

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id', points: true })],
      scales: { x: { scale: scaleLinear().domain([1, 8]) }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        handleX({
          value: controlledSignal<number, HandleXChange<number>>(week, (next) => set(next)),
          values,
          cross: { edge: 'top', offset: 14 },
          ariaLabel: 'Week',
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a handle and a range input',
  });
  const host = stage.own(mountChart(stage.box, options()));
  let input: HTMLInputElement | null = null;
  function set(next: number): void {
    week = next;
    if (input) input.value = String(next);
    host.update(options());
    stage.say(`week ${next}: ${weekPoints[next - 1]!.value.toLocaleString()} users`);
  }
  if (stage.bar) input = slider(stage.bar, 'week', 1, 8, 1, week, set, (v) => String(v));
  set(week);
  if (stage.preview) stage.cycle([2, 4, 6, 8, 5], 1100, set);
  return () => stage.dispose();
};

export default mount;
