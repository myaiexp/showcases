// instances spec columns, sort, pageSize and the saved page offset
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'sort descending': {
        charts: {
          table: { type: 'instances', title: 'sort descending', columns: ['topic', 'source', 'words', 'rating'], sort: [{ column: 'words', direction: 'descending' }], pageSize: 8, defaultHeight: 300 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'sort ascending': {
        charts: {
          table: { type: 'instances', title: 'sort ascending', columns: ['topic', 'source', 'words', 'rating'], sort: [{ column: 'words', direction: 'ascending' }], pageSize: 8, defaultHeight: 300 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'two sort keys': {
        charts: {
          table: { type: 'instances', title: 'two sort keys', columns: ['topic', 'source', 'words', 'rating'], sort: [{ column: 'source', direction: 'ascending' }, { column: 'rating', direction: 'descending' }], pageSize: 8, defaultHeight: 300 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'offset: 16': {
        charts: {
          table: { type: 'instances', title: 'offset: 16', columns: ['topic', 'source', 'words', 'rating'], sort: [{ column: 'words', direction: 'descending' }], pageSize: 8, defaultHeight: 300 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { table: { offset: 16 } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
