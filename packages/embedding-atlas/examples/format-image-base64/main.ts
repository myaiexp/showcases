// the image renderer on base64 strings without a data: prefix
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { formatColumns } from '../../shared/chart-formats.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'size: 32': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'thumb_b64'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { thumb_b64: { renderer: 'image', options: { size: 32 } } },
      },
      'size: 64': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'thumb_b64'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { thumb_b64: { renderer: 'image', options: { size: 64 } } },
      },
    },
    { extra: formatColumns, height: 440 },
  );
  return stage.dispose;
};

export default mount;
