// the url renderer turning strings into links
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'renderer: url': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'link'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { link: { renderer: 'url' } },
      },
      'no renderer': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'link'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
      },
    },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
