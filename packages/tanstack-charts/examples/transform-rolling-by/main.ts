// rollingWindow by: smoothing inside each series, against one window over mixed rows
import { defineChart, lineY, rollingWindow } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(50);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (grouped: boolean) => {
    const smooth = rollingWindow(series, {
      by: grouped ? 'series' : undefined,
      orderBy: 'day',
      size: 8,
      partial: false,
      outputs: { average: { value: 'value', reduce: 'mean' } },
    });
    return defineChart({
      marks: [lineY(smooth, { x: 'day', y: 'average', color: 'series', strokeWidth: 2.5 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  };
  const states = [[true, "by: 'series'"], [false, 'no by: one window over both series']] as const;
  lab(stage, { label: 'grouping', ariaLabel: 'Rolling means per series', states, build, ms: 2400, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
