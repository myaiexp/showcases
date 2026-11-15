// a rule mark drawing a mean, median or quantile over a histogram
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'mean': {
        charts: {
          words: {
            title: 'words, mean',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'rule', style: { strokeColor: '#f59e0b', strokeWidth: 2 }, encoding: { x: { aggregate: 'mean', field: 'words' } } },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
      'median': {
        charts: {
          words: {
            title: 'words, median',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'rule', style: { strokeColor: '#f59e0b', strokeWidth: 2 }, encoding: { x: { aggregate: 'median', field: 'words' } } },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
      'quantile 0.9': {
        charts: {
          words: {
            title: 'words, quantile 0.9',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'rule', style: { strokeColor: '#f59e0b', strokeWidth: 2 }, encoding: { x: { aggregate: 'quantile', field: 'words', quantile: 0.9 } } },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
