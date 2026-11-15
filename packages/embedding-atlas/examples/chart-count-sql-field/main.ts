// count-plot data.field as a { sql } expression
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'month': {
        charts: {
          plot: { type: 'count-plot', title: 'month', data: { field: { sql: "strftime(published, '%Y-%m')" } }, order: 'alphabetical', limit: 12, labels: '#' } satisfies BuiltinChartSpec,
        },
      },
      'long or short': {
        charts: {
          plot: { type: 'count-plot', title: 'length', data: { field: { sql: "CASE WHEN words > 300 THEN 'long' ELSE 'short' END" } }, labels: '%' } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
