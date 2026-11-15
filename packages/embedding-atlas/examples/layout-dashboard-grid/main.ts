// dashboard grids placements and order for overlapping charts
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'three placements': {
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
            grids: {
              '24x18': {
                placements: {
                  words: { x: 0, y: 0, width: 14, height: 18 },
                  topics: { x: 14, y: 0, width: 10, height: 8 },
                  table: { x: 14, y: 8, width: 10, height: 10 },
                },
              },
            },
          },
        },
      },
      'order: topics on top': {
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
            chartIds: ['words', 'topics'],
            grids: {
              '24x18': {
                placements: {
                  words: { x: 0, y: 0, width: 18, height: 18 },
                  topics: { x: 10, y: 4, width: 14, height: 10 },
                },
                order: ['words', 'topics'],
              },
            },
          },
        },
      },
      'order: words on top': {
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
            chartIds: ['words', 'topics'],
            grids: {
              '24x18': {
                placements: {
                  words: { x: 0, y: 0, width: 18, height: 18 },
                  topics: { x: 10, y: 4, width: 14, height: 10 },
                },
                order: ['topics', 'words'],
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
