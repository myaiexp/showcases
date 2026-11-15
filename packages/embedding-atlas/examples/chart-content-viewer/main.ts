// a content-viewer chart showing a field of the last selected row
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'text': {
        charts: {
          viewer: { type: 'content-viewer', title: 'text', field: 'text' } satisfies BuiltinChartSpec,
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'text', 'words'], pageSize: 20 } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
