// encoding.color.normalize by x or y
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'no normalize': {
        charts: {
          heat: {
            title: 'source by topic, no normalize',
            layers: [{ mark: 'rect', encoding: { x: { field: 'topic' }, y: { field: 'source' }, color: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'normalize: x': {
        charts: {
          heat: {
            title: 'source by topic, normalize: x',
            layers: [{ mark: 'rect', encoding: { x: { field: 'topic' }, y: { field: 'source' }, color: { aggregate: 'count', normalize: 'x' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'normalize: y': {
        charts: {
          heat: {
            title: 'source by topic, normalize: y',
            layers: [{ mark: 'rect', encoding: { x: { field: 'topic' }, y: { field: 'source' }, color: { aggregate: 'count', normalize: 'y' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
