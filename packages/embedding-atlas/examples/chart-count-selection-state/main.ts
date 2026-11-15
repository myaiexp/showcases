// CountPlotState selection saved in chartStates
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'one topic': {
        charts: {
          plot: { type: 'count-plot', title: 'topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { plot: { selection: ['astronomy'] } },
      },
      'two topics': {
        charts: {
          plot: { type: 'count-plot', title: 'topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { plot: { selection: ['chess', 'music'] } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
