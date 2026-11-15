// Rules from data: a vertical rule per row from low to high, with caps
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(14);
  const rows = 'ABCDEFGH'.split('').map((k) => ({ k, m: Math.round(30 + rand() * 40), e: Math.round(6 + rand() * 14) }));

  const spec: Spec = {
    width: 440, height: 210, padding: 5,
    signals: [{ name: 'width_', value: 1, bind: { input: 'range', min: 0.2, max: 2, step: 0.1 } }],
    data: [{ name: 'table', values: rows }],
    scales: [
      { name: 'x', type: 'point', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.5 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true, tickCount: 5 }],
    marks: [
      {
        type: 'rule',
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'k' },
            y: { signal: "scale('y', datum.m + datum.e * width_)" },
            y2: { signal: "scale('y', datum.m - datum.e * width_)" },
            stroke: { value: '#4fa3e0' }, strokeWidth: { value: 2 },
          },
        },
      },
      ...[1, -1].map((sign) => ({
        type: 'rule' as const,
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'k', offset: -6 }, x2: { scale: 'x', field: 'k', offset: 6 },
            y: { signal: `scale('y', datum.m + ${sign} * datum.e * width_)` },
            stroke: { value: '#4fa3e0' }, strokeWidth: { value: 2 },
          },
        },
      })),
      { type: 'symbol', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'k' }, y: { scale: 'y', field: 'm' }, fill: { value: 'orange' }, size: { value: 60 } } } },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'width_', [1, 2, 0.4, 1.5], 1200);
  return () => stage.dispose();
};

export default mount;
