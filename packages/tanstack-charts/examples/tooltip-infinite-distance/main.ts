// Number.POSITIVE_INFINITY as maxFocusDistance: continuous snapping, toggled with a checkbox
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const sparse = weeks.filter((_, i) => i % 3 === 0);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover between the points: with the box ticked the cursor still snaps.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (unbounded: boolean) =>
    defineChart({
      marks: [lineY(sparse, { x: 'week', y: 'value', key: 'id', points: true }), crosshair({ x: { label: true }, y: false })],
      scales: {
        x: { scale: () => scalePoint<string>().padding(0.5) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      focus: 'nearest-x',
      maxFocusDistance: unbounded ? Number.POSITIVE_INFINITY : 48,
      tooltip,
    });
  const options = (unbounded: boolean) => ({ definition: build(unbounded), height: stage.height, initialWidth: 640, ariaLabel: 'Sparse weekly users' });
  const host = stage.own(mountChart(stage.box, options(false)));

  if (stage.bar) checkbox(stage.bar, 'maxFocusDistance: Infinity', false, (v) => host.update(options(v)));
  else {
    stage.cycle([false, true], 3000, (v) => {
      host.update(options(v));
      stage.say(v ? 'maxFocusDistance: Infinity' : 'maxFocusDistance: 48');
    });
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
