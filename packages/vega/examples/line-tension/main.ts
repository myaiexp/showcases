// bundle, cardinal and catmull-rom lines on one data set, one tension signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 220, padding: 5,
    signals: [{ name: 'tension', value: 0.5, bind: { input: 'range', min: 0, max: 1, step: 0.05 } }],
    data: [{ name: 'table', values: [[1, 20], [2, 80], [3, 30], [4, 90], [5, 25], [6, 70], [7, 45]].map(([u, v]) => ({ u, v })) }],
    scales: [
      { name: 'x', type: 'linear', domain: [1, 7], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'kind', type: 'ordinal', domain: ['bundle', 'cardinal', 'catmull-rom'], range: ['#f59e0b', '#4fa3e0', '#7fd18b'] },
    ],
    legends: [{ stroke: 'kind', orient: 'top-right', symbolType: 'stroke' }],
    marks: [
      ...(['bundle', 'cardinal', 'catmull-rom'] as const).map((kind) => ({
        type: 'line' as const,
        from: { data: 'table' },
        encode: {
          update: {
            x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' },
            interpolate: { value: kind }, tension: { signal: 'tension' },
            stroke: { scale: 'kind', value: kind }, strokeWidth: { value: 3 },
          },
        },
      })),
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'tension', [0, 0.5, 1, 0.8, 0.2], 1200);
  return () => stage.dispose();
};

export default mount;
