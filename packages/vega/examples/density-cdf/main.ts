// Density method: the same distributions as a pdf or as a cumulative cdf
import type { Data, Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const density = (name: string, distribution: object): Data => ({
    name,
    transform: [
      { type: 'density' as const, extent: [0, 10], steps: 100, method: { signal: 'method' }, distribution, as: ['x', 'y'] },
    ],
  } as unknown as Data);

  const spec: Spec = {
    width: 420,
    height: 200,
    padding: 5,
    signals: [{ name: 'method', value: 'pdf', bind: { input: 'radio', options: ['pdf', 'cdf'] } }],
    data: [
      density('norm', { function: 'normal', mean: 4, stdev: 1.2 }),
      density('flat', { function: 'uniform', min: 5, max: 9 }),
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 10], range: 'width' },
      { name: 'y', type: 'linear', domain: { fields: [{ data: 'norm', field: 'y' }, { data: 'flat', field: 'y' }] }, zero: true, nice: true, range: 'height' },
      { name: 'color', type: 'ordinal', domain: ['normal(4, 1.2)', 'uniform(5, 9)'], range: ['steelblue', 'orange'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', title: { signal: 'method' } }],
    legends: [{ stroke: 'color', orient: 'top-left', symbolType: 'stroke' }],
    marks: [
      {
        type: 'line',
        from: { data: 'norm' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 2.5 } } },
      },
      {
        type: 'line',
        from: { data: 'flat' },
        encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: 'orange' }, strokeWidth: { value: 2.5 } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'method', ['pdf', 'cdf'], 1900);
  return () => stage.dispose();
};

export default mount;
