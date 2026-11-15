// axis.x.labelMaxWidth truncating long category labels
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'default': {
        charts: {
          bars: {
            title: 'documents per topic, default',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'labelMaxWidth: 60': {
        charts: {
          bars: {
            title: 'documents per topic, labelMaxWidth: 60',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
            axis: { x: { labelMaxWidth: 60 } },
          } satisfies BuiltinChartSpec,
        },
      },
      'labelMaxWidth: 20': {
        charts: {
          bars: {
            title: 'documents per topic, labelMaxWidth: 20',
            layers: [{ mark: 'bar', encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
            axis: { x: { labelMaxWidth: 20 } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
