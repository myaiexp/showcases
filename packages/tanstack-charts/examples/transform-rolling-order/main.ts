// rollingWindow orderBy and order on shuffled input rows
import { defineChart, lineY, rollingWindow } from '@tanstack/charts';
import type { TransformOrder } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/random.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const ordered = makeSeries(40).filter((r) => r.series === 'alpha');
const random = rng(3);
const shuffled = ordered.map((r) => [random(), r] as const).sort((a, b) => a[0] - b[0]).map(([, r]) => r);

type Mode = { orderBy?: 'day'; order?: TransformOrder };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The window is 7 rows and ends at the current row in the chosen order.' });

  const build = (mode: Mode) => {
    const rows = rollingWindow(shuffled, { ...mode, size: 7, partial: false, outputs: { average: { value: 'value', reduce: 'mean' } } });
    return defineChart({
      marks: [
        lineY(ordered, { x: 'day', y: 'value', stroke: '#64748b', strokeWidth: 1 }),
        lineY([...rows].sort((a, b) => a.day - b.day), { x: 'day', y: 'average', stroke: '#fb923c', strokeWidth: 3 }),
      ],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  };
  const states: readonly (readonly [Mode, string])[] = [
    [{}, 'no orderBy: windows follow the shuffled input'],
    [{ orderBy: 'day' }, "orderBy: 'day'"],
    [{ orderBy: 'day', order: 'descending' }, "orderBy: 'day', order: 'descending'"],
  ];
  lab(stage, { label: 'order', ariaLabel: 'Rolling mean over shuffled rows', states, build, ms: 2200, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
