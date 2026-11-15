// instances viewMode cards with the default card
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'three columns': {
        charts: {
          table: { type: 'instances', title: 'three columns', viewMode: 'cards', columns: ['topic', 'text', 'rating'], pageSize: 6, defaultHeight: 360 } satisfies BuiltinChartSpec,
        },
      },
      'five columns': {
        charts: {
          table: { type: 'instances', title: 'five columns', viewMode: 'cards', columns: ['topic', 'source', 'words', 'rating', 'score'], pageSize: 6, defaultHeight: 360 } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
