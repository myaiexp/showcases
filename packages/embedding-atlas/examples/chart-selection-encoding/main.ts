// selection.brush.encoding on x, y and xy and a saved brush in chartStates
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'encoding: x': {
        charts: {
          heat: {
            title: 'words by score, brush x',
            layers: [
              { mark: 'rect', filter: '$filter', zIndex: -1, encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } },
              { mark: 'rect', zIndex: -2, encoding: { color: { value: 0 } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { x: [100, 300] } } },
      },
      'encoding: y': {
        charts: {
          heat: {
            title: 'words by score, brush y',
            layers: [
              { mark: 'rect', filter: '$filter', zIndex: -1, encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } },
              { mark: 'rect', zIndex: -2, encoding: { color: { value: 0 } } },
            ],
            selection: { brush: { encoding: 'y' } },
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { y: [60, 90] } } },
      },
      'encoding: xy': {
        charts: {
          heat: {
            title: 'words by score, brush xy',
            layers: [
              { mark: 'rect', filter: '$filter', zIndex: -1, encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } },
              { mark: 'rect', zIndex: -2, encoding: { color: { value: 0 } } },
            ],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { x: [100, 300], y: [60, 90] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
