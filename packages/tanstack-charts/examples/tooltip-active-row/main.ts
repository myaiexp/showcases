// tooltip.className scopes CSS variables that restyle the active row's emphasis
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a line: the default emphasis is a shaded bold row; the class removes the shading.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (calm: boolean) =>
    defineChart({
      marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      focus: 'group-x',
      tooltip: calm ? { use: tooltip, className: 'calm-rows' } : tooltip,
    });
  const options = (calm: boolean) => ({ definition: build(calm), height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' });
  const host = stage.own(mountChart(stage.box, options(false)));

  if (stage.bar) checkbox(stage.bar, 'calm-rows class', false, (v) => host.update(options(v)));
  else {
    stage.cycle([false, true], 3000, (v) => {
      host.update(options(v));
      stage.say(v ? 'tooltip.className: calm-rows' : 'default emphasis');
    });
    stage.ghost((t) => [0.1 + 0.8 * t, 0.3 + 0.3 * Math.abs(Math.sin(t * 5))]);
  }
  return () => stage.dispose();
};

export default mount;
