// the layer size option for point marks
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'size: 30': {
        charts: {
          points: {
            title: 'topic means, size 30',
            layers: [{ mark: 'point', size: 30, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'size: 100': {
        charts: {
          points: {
            title: 'topic means, size 100',
            layers: [{ mark: 'point', size: 100, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'size: 400': {
        charts: {
          points: {
            title: 'topic means, size 400',
            layers: [{ mark: 'point', size: 400, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, color: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
