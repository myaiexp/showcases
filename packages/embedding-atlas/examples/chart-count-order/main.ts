// count-plot order: total, selected and a custom array
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'order: total-descending': {
        charts: {
          plot: { type: 'count-plot', title: 'order: total-descending', data: { field: 'topic' }, order: 'total-descending', labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 150] } } },
      },
      'order: total-ascending': {
        charts: {
          plot: { type: 'count-plot', title: 'order: total-ascending', data: { field: 'topic' }, order: 'total-ascending', labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 150] } } },
      },
      'order: selected-descending': {
        charts: {
          plot: { type: 'count-plot', title: 'order: selected-descending', data: { field: 'topic' }, order: 'selected-descending', labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 150] } } },
      },
      'order: selected-ascending': {
        charts: {
          plot: { type: 'count-plot', title: 'order: selected-ascending', data: { field: 'topic' }, order: 'selected-ascending', labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 150] } } },
      },
      'order: custom array': {
        charts: {
          plot: { type: 'count-plot', title: 'order: custom array', data: { field: 'topic' }, order: ['sailing', 'chess', 'astronomy', 'music'], labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 150] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
