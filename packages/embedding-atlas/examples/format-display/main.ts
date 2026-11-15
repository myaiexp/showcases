// columnStyles display set to full, badge and hidden
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'display: full': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'source', 'words'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { source: { display: 'full' } },
      },
      'display: badge': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'source', 'words'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { source: { display: 'badge' } },
      },
      'display: hidden': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'source', 'words'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { source: { display: 'hidden' } },
      },
    },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
