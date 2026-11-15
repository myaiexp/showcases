// Keyboard navigation under 'nearest' (every point) and 'group-x' (one stop per x value)
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { keys } from '../../shared/interact-drive.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

type Mode = 'nearest' | 'group-x';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tab to the chart, press the arrow keys, Home or End, and count the stops per month.' });
  if (stage.preview) stage.height -= 36; // leaves room for the caption lines under the chart
  const show = reader(stage);
  let steps = 0;
  let mode: Mode = 'group-x';
  show('focus: group-x. Press a key.');

  const options = () => ({
    definition: defineChart({
      marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      focus: mode,
      tooltip,
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Requests by channel',
    onFocusChange: (point: { datum: { series: string; month: string } } | null) => {
      steps++;
      show(`focus: ${mode}\nstop ${steps}: ${point ? `${point.datum.series} ${point.datum.month}` : 'none'}`);
    },
  });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.bar) {
    select(stage.bar, 'focus', [['group-x', 'group-x'], ['nearest', 'nearest']] as const, (m) => {
      mode = m;
      steps = 0;
      host.update(options());
    }, 'group-x');
  } else keys(stage, stage.box, ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowRight', 'End', 'Home'], 900);
  return () => stage.dispose();
};

export default mount;
