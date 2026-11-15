// count-plot categoryWidth sizing the label column
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'categoryWidth: 40': {
        charts: {
          plot: { type: 'count-plot', title: 'categoryWidth: 40', data: { field: { sql: "source || ' (published)'" } }, categoryWidth: 40, labels: '#' } satisfies BuiltinChartSpec,
        },
      },
      'categoryWidth: 90': {
        charts: {
          plot: { type: 'count-plot', title: 'categoryWidth: 90', data: { field: { sql: "source || ' (published)'" } }, categoryWidth: 90, labels: '#' } satisfies BuiltinChartSpec,
        },
      },
      'categoryWidth: 160': {
        charts: {
          plot: { type: 'count-plot', title: 'categoryWidth: 160', data: { field: { sql: "source || ' (published)'" } }, categoryWidth: 160, labels: '#' } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
