// layouts with layoutOrder and currentLayout
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'currentLayout: overview': {
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
        layouts: {
          overview: {
            type: 'dashboard',
            name: 'Overview',
            chartIds: ['words', 'topics'],
            grids: { '24x18': { placements: { words: { x: 0, y: 0, width: 14, height: 18 }, topics: { x: 14, y: 0, width: 10, height: 18 } } } },
          },
          details: { type: 'list', name: 'Details', chartIds: ['topics', 'table'], showEmbedding: false },
        },
        layoutOrder: ['details', 'overview'],
        currentLayout: 'overview',
      },
      'currentLayout: details': {
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
        layouts: {
          overview: {
            type: 'dashboard',
            name: 'Overview',
            chartIds: ['words', 'topics'],
            grids: { '24x18': { placements: { words: { x: 0, y: 0, width: 14, height: 18 }, topics: { x: 14, y: 0, width: 10, height: 18 } } } },
          },
          details: { type: 'list', name: 'Details', chartIds: ['topics', 'table'], showEmbedding: false },
        },
        layoutOrder: ['details', 'overview'],
        currentLayout: 'details',
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
