// aggregate: "quantile" with the quantile option
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'quantile: 0.1': {
        charts: {
          bars: {
            title: 'words, quantile 0.1',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'quantile', field: 'words', quantile: 0.1 } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'quantile: 0.5': {
        charts: {
          bars: {
            title: 'words, quantile 0.5',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'quantile', field: 'words', quantile: 0.5 } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'quantile: 0.9': {
        charts: {
          bars: {
            title: 'words, quantile 0.9',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'quantile', field: 'words', quantile: 0.9 } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
