// normalize basis: sum, max, extent, first, last and a custom function over one series
import { defineChart, lineY, normalize } from '@tanstack/charts';
import type { NormalizeBasis } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { makeSeries } from '../../shared/xform-data.ts';
import { lab } from '../../shared/xform-lab.ts';
import { createStage } from '../../shared/stage.ts';

const series = makeSeries(40).filter((r) => r.series === 'alpha');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (basis: NormalizeBasis | ((c: { values: readonly number[] }) => number)) => {
    const rows = normalize(series, { value: 'value', basis, as: 'scaled' });
    return defineChart({
      marks: [lineY(rows, { x: 'day', y: 'scaled', stroke: '#a78bfa', strokeWidth: 2.5 })],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'normalized' } } },
    });
  };
  const states: readonly (readonly [NormalizeBasis | ((c: { values: readonly number[] }) => number), string])[] = [
    ['sum', "basis: 'sum' (shares of the total)"],
    ['max', "basis: 'max' (largest is 1)"],
    ['extent', "basis: 'extent' (min 0, max 1)"],
    ['first', "basis: 'first' (1 at the first row)"],
    ['last', "basis: 'last' (1 at the last row)"],
    [({ values }) => values.reduce((a, b) => a + b, 0) / values.length, 'basis: a function (the mean)'],
  ];
  lab(stage, { label: 'basis', ariaLabel: 'A series under each normalize basis', states, build, ms: 1800, after: (_, name) => stage.say(name) });
  return () => stage.dispose();
};

export default mount;
