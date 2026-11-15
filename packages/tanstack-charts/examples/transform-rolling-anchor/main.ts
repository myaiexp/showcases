// rollingWindow anchor: end, middle and start windows over the same noisy series
import { defineChart, lineY, rollingWindow } from '@tanstack/charts';
import type { RollingWindowAnchor } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(60).filter((r) => r.series === 'alpha');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The grey line is the raw series.' });

  const build = (anchor: RollingWindowAnchor) => {
    const smooth = rollingWindow(series, {
      orderBy: 'day',
      size: 9,
      anchor,
      partial: false,
      outputs: { average: { value: 'value', reduce: 'mean' } },
    });
    return defineChart({
      marks: [
        lineY(series, { x: 'day', y: 'value', stroke: '#64748b', strokeWidth: 1 }),
        lineY(smooth, { x: 'day', y: 'average', stroke: '#fbbf24', strokeWidth: 3 }),
      ],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  };
  const states = (['end', 'middle', 'start'] as const).map((a) => [a, `anchor: '${a}'`] as const);
  lab(stage, { label: 'anchor', ariaLabel: 'Raw series and a rolling mean', states, build, ms: 2000, after: (_, name) => stage.say(`size 9, ${name}`) });
  return () => stage.dispose();
};

export default mount;
