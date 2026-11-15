// list layout chartsOrder and chartVisibility
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'chartsOrder: words first': {
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
        layouts: { main: { type: 'list', name: 'List', chartIds: ['topics', 'words', 'table'], showEmbedding: false, chartsOrder: ['words', 'topics', 'table'] } },
      },
      'chartsOrder: reversed': {
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
        layouts: { main: { type: 'list', name: 'List', chartIds: ['topics', 'words', 'table'], showEmbedding: false, chartsOrder: ['table', 'words', 'topics'] } },
      },
      'chartVisibility: topics hidden': {
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
        layouts: { main: { type: 'list', name: 'List', chartIds: ['topics', 'words', 'table'], showEmbedding: false, chartVisibility: { topics: false } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
