// the image renderer on { bytes, path } objects
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
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'thumb_bytes'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { thumb_bytes: { renderer: 'image', options: { size: 32 } } },
      },
      'size: 64': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'thumb_bytes'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: { thumb_bytes: { renderer: 'image', options: { size: 64 } } },
      },
    },
    {
      extra: formatColumns,
      height: 440,
      setup: async (m, t) => {
        await m.exec(`ALTER TABLE ${t} ADD COLUMN thumb_bytes STRUCT(bytes BLOB, path VARCHAR)`);
        await m.exec(`UPDATE ${t} SET thumb_bytes = {'bytes': from_base64(thumb_b64), 'path': 'thumb.png'}`);
      },
    },
  );
  return stage.dispose;
};

export default mount;
