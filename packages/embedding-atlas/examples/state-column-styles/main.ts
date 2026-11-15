// columnStyles in initialState: renderer, options and display per column
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'columnStyles': {
        charts: {
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'rating', 'source', 'words'], pageSize: 6, defaultHeight: 380 } satisfies BuiltinChartSpec,
        },
        columnStyles: {
          rating: { renderer: 'liquid-template', options: { template: '{% if value >= 4 %}**{{ value }}**{% else %}{{ value }}{% endif %} of 5' } },
          source: { renderer: 'markdown', display: 'badge' },
          words: { display: 'hidden' },
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
