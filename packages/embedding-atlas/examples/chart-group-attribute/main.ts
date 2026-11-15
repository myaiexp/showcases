// the group and color encodings split a line into series
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'group: topic': {
        charts: {
          lines: {
            title: 'group: topic',
            layers: [{ mark: 'line', encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' }, group: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'color: topic': {
        charts: {
          lines: {
            title: 'color: topic',
            layers: [{ mark: 'line', encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' }, color: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'color: source': {
        charts: {
          lines: {
            title: 'color: source',
            layers: [{ mark: 'line', encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' }, color: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
