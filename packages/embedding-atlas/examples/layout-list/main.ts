// a list layout with showTable, showEmbedding and showCharts
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'charts and table': {
        charts: {
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'source', 'words'], pageSize: 6 } satisfies BuiltinChartSpec,
        },
        layouts: { main: { type: 'list', name: 'List', chartIds: ['topics', 'words', 'table'], showEmbedding: false, showTable: true, showCharts: true } },
      },
      'showTable: false': {
        charts: {
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'source', 'words'], pageSize: 6 } satisfies BuiltinChartSpec,
        },
        layouts: { main: { type: 'list', name: 'List', chartIds: ['topics', 'words', 'table'], showEmbedding: false, showTable: false, showCharts: true } },
      },
      'showCharts: false': {
        charts: {
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
          table: { type: 'instances', title: 'Documents', columns: ['topic', 'source', 'words'], pageSize: 6 } satisfies BuiltinChartSpec,
        },
        layouts: { main: { type: 'list', name: 'List', chartIds: ['topics', 'words', 'table'], showEmbedding: false, showTable: true, showCharts: false } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
