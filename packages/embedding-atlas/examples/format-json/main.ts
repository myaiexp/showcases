// the json renderer on a struct column and a list column
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'struct column': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'meta'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { meta: { renderer: 'json' } },
      },
      'list column': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'tags'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { tags: { renderer: 'json' } },
      },
    },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
