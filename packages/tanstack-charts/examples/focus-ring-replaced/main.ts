// focusRing: false with a crosshair marker standing in for the ring
import { crosshair, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the line: with the ring off, the filled marker marks the focus.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (ring: boolean) =>
    defineChart({
      marks: [
        lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true }),
        crosshair({ x: false, y: false, marker: { radius: 8, fill: '#fbbf24', stroke: '#0b0b0f', strokeWidth: 2 } }),
      ],
      scales: { x: { scale: () => scalePoint<string>().padding(0.2) }, y: { scale: scaleLinear, grid: true } },
      focusRing: ring,
      tooltip,
    });
  const options = (ring: boolean) => ({ definition: build(ring), height: stage.height, initialWidth: 640, ariaLabel: 'Weekly users' });
  const host = stage.own(mountChart(stage.box, options(false)));

  if (stage.bar) checkbox(stage.bar, 'built-in focus ring', false, (v) => host.update(options(v)));
  else {
    stage.cycle([false, true], 2800, (ring) => {
      host.update(options(ring));
      stage.say(ring ? 'focusRing: true, marker on top' : 'focusRing: false, marker only');
    });
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
