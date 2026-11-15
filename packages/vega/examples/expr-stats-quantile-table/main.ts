// Statistical functions: density, cumulative and quantile of three distributions at one x and one probability
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { exprMarks, exprSize, type ExprRow } from '../../shared/expr-kit.ts';
import { createStage } from '../../shared/stage.ts';

const f = (e: string): string => `format(${e}, ".4f")`;
const rows: ExprRow[] = [
  { head: 'Normal(0, 1)' },
  { expr: f('densityNormal(xv)'), label: 'densityNormal(xv)' },
  { expr: f('cumulativeNormal(xv)'), label: 'cumulativeNormal(xv)' },
  { expr: f('quantileNormal(pv)'), label: 'quantileNormal(pv)' },
  { head: 'LogNormal(0, 1): mean and stdev of the logarithm' },
  { expr: f('densityLogNormal(xv)'), label: 'densityLogNormal(xv)' },
  { expr: f('cumulativeLogNormal(xv)'), label: 'cumulativeLogNormal(xv)' },
  { expr: f('quantileLogNormal(pv)'), label: 'quantileLogNormal(pv)' },
  { head: 'Uniform over [0, 4)' },
  { expr: f('densityUniform(xv, 0, 4)'), label: 'densityUniform(xv, 0, 4)' },
  { expr: f('cumulativeUniform(xv, 0, 4)'), label: 'cumulativeUniform(xv, 0, 4)' },
  { expr: f('quantileUniform(pv, 0, 4)'), label: 'quantileUniform(pv, 0, 4)' },
  { head: 'One argument means max: Uniform [0, 4)' },
  { expr: f('cumulativeUniform(xv, 4)'), label: 'cumulativeUniform(xv, 4)' },
];

const opts = { labelWidth: 250, resultWidth: 90 };

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    ...exprSize(rows, opts),
    padding: 8,
    signals: [
      { name: 'xv', value: 1, bind: { input: 'range', min: 0.1, max: 3.9, step: 0.1 } },
      { name: 'pv', value: 0.5, bind: { input: 'range', min: 0.05, max: 0.95, step: 0.05 } },
    ],
    marks: exprMarks(rows, opts),
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { xv: 1, pv: 0.5 },
      { xv: 2.5, pv: 0.9 },
      { xv: 0.5, pv: 0.25 },
      { xv: 3.5, pv: 0.75 },
    ],
    1200,
  );
  return () => stage.dispose();
};

export default mount;
