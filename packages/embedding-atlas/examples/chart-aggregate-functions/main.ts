// encoding.y.aggregate with count, sum, mean, median, min and max
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'count': {
        charts: {
          bars: {
            title: 'source, count',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'sum': {
        charts: {
          bars: {
            title: 'source, sum of words',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'sum', field: 'words' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'mean': {
        charts: {
          bars: {
            title: 'source, mean of words',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'mean', field: 'words' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'median': {
        charts: {
          bars: {
            title: 'source, median of words',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'median', field: 'words' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'min': {
        charts: {
          bars: {
            title: 'source, min of words',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'min', field: 'words' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'max': {
        charts: {
          bars: {
            title: 'source, max of words',
            layers: [{ mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'max', field: 'words' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
