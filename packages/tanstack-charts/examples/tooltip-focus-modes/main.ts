// The five focus presets on one multi-series line chart, switched with a select
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

type Mode = 'nearest' | 'nearest-x' | 'nearest-y' | 'group-x' | 'group-y';
const modes: readonly Mode[] = ['nearest', 'nearest-x', 'nearest-y', 'group-x', 'group-y'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose a mode, then hover: group-x shows every series at one month.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart

  const build = (focus: Mode) =>
    defineChart({
      marks: [lineY(traffic, { x: 'date', y: 'value', color: 'series', key: 'id', points: true })],
      scales: {
        x: { scale: scaleUtc },
        y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Requests (thousands)' } },
      },
      focus,
      tooltip,
    });
  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, initialWidth: 640, ariaLabel: 'Requests by channel' });
  const host = stage.own(mountChart(stage.box, options('nearest')));

  if (stage.bar) select(stage.bar, 'focus', modes.map((m) => [m, m] as const), (m) => host.update(options(m)));
  else {
    stage.cycle(modes, 2600, (m) => {
      host.update(options(m));
      stage.say(`focus: '${m}'`);
    });
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;
