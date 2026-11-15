// rollingWindow partial: short windows at the start, or dropped rows until the window is full
import { defineChart, lineY, rollingWindow } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel } from '../../shared/xform-table.ts';

const series = makeSeries(40).filter((r) => r.series === 'beta');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const show = readoutPanel(stage);

  const build = (partial: boolean) => {
    const smooth = rollingWindow(series, { orderBy: 'day', size: 12, partial, outputs: { average: { value: 'value', reduce: 'mean' } } });
    show(`${series.length} rows in, ${smooth.length} rows out; first row drawn: day ${smooth[0]!.day}`);
    return defineChart({
      marks: [
        lineY(series, { x: 'day', y: 'value', stroke: '#64748b', strokeWidth: 1 }),
        lineY(smooth, { x: 'day', y: 'average', stroke: '#4ade80', strokeWidth: 3, points: true }),
      ],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  };
  const states = [[true, 'partial: true'], [false, 'partial: false']] as const;
  lab(stage, { label: 'partial', ariaLabel: 'Rolling mean with and without partial windows', states, build, ms: 2400, after: (_, name) => stage.say(`size 12, ${name}`) });
  return () => stage.dispose();
};

export default mount;
