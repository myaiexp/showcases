// stdev, stdevp, variance, variancep and product aggregates over groups
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'stdev': {
        charts: {
          bars: {
            title: 'stdev of rating per topic',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'stdev', field: 'rating' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'stdevp': {
        charts: {
          bars: {
            title: 'stdevp of rating per topic',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'stdevp', field: 'rating' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'variance': {
        charts: {
          bars: {
            title: 'variance of rating per topic',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'variance', field: 'rating' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'variancep': {
        charts: {
          bars: {
            title: 'variancep of rating per topic',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'variancep', field: 'rating' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'distinct': {
        charts: {
          bars: {
            title: 'distinct of source per topic',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'distinct', field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
