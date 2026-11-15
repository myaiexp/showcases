// dashboard numColumns and numRows with a matching grids key
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      '12 x 6': {
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
          main: {
            type: 'dashboard',
            name: 'Dashboard',
            chartIds: ['words', 'topics', 'table'],
            numColumns: 12,
            numRows: 6,
            grids: {
              '12x6': {
                placements: {
                  words: { x: 0, y: 0, width: 6, height: 6 },
                  topics: { x: 6, y: 0, width: 6, height: 3 },
                  table: { x: 6, y: 3, width: 6, height: 3 },
                },
              },
            },
          },
        },
      },
      '6 x 4': {
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
          main: {
            type: 'dashboard',
            name: 'Dashboard',
            chartIds: ['words', 'topics', 'table'],
            numColumns: 6,
            numRows: 4,
            grids: {
              '6x4': {
                placements: {
                  words: { x: 0, y: 0, width: 3, height: 4 },
                  topics: { x: 3, y: 0, width: 3, height: 2 },
                  table: { x: 3, y: 2, width: 3, height: 2 },
                },
              },
            },
          },
        },
      },
      '12 x 12': {
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
          main: {
            type: 'dashboard',
            name: 'Dashboard',
            chartIds: ['words', 'topics', 'table'],
            numColumns: 12,
            numRows: 12,
            grids: {
              '12x12': {
                placements: {
                  words: { x: 0, y: 0, width: 6, height: 12 },
                  topics: { x: 6, y: 0, width: 6, height: 6 },
                  table: { x: 6, y: 6, width: 6, height: 6 },
                },
              },
            },
          },
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
