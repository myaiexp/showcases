// handleX as a playhead: the application's timer advances the controlled value
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { handleX, type HandleXChange } from '@tanstack/charts/interaction/handle';
import { controlledSignal } from '@tanstack/charts/interaction/signal';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { weekPoints } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const values = weekPoints.map((p) => p.n);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press Play, or drag the knob while it runs.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let week = 1;
  let playing = stage.preview;

  const options = () => ({
    definition: defineChart({
      marks: [lineY(weekPoints, { x: 'n', y: 'value', key: 'id' })],
      scales: { x: { scale: scaleLinear().domain([1, 8]), axis: { label: 'Week' } }, y: { scale: scaleLinear, nice: true, grid: true } },
      controls: [
        handleX({
          value: controlledSignal<number, HandleXChange<number>>(week, (next) => set(next)),
          values,
          cross: { edge: 'top', offset: 14 },
          ariaLabel: 'Playback week',
          format: (v) => `Week ${v}`,
        }),
      ],
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Weekly users with a playhead',
  });
  const host = stage.own(mountChart(stage.box, options()));
  function set(next: number): void {
    week = next;
    host.update(options());
    const row = weekPoints[next - 1]!;
    stage.say(`${playing ? 'playing' : 'paused'}: week ${next}, ${row.value.toLocaleString()} users`);
  }
  set(week);
  stage.every(stage.preview ? 700 : 900, () => {
    if (playing) set(week >= values.length ? 1 : week + 1);
  });
  if (stage.bar) {
    const toggle = button(stage.bar, 'Play', () => {
      playing = !playing;
      toggle.textContent = playing ? 'Pause' : 'Play';
      set(week);
    });
  }
  return () => stage.dispose();
};

export default mount;
