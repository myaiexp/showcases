// a rect mark with x, y and an aggregated color
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'brush x 0-300, y 0-50': {
        charts: {
          heat: {
            title: 'words by score',
            layers: [
              { mark: 'rect', filter: '$filter', zIndex: -1, encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } },
              { mark: 'rect', zIndex: -2, encoding: { color: { value: 0 } } },
            ],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { x: [0,300], y: [0,50] } } },
      },
      'brush x 200-600, y 40-100': {
        charts: {
          heat: {
            title: 'words by score',
            layers: [
              { mark: 'rect', filter: '$filter', zIndex: -1, encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } },
              { mark: 'rect', zIndex: -2, encoding: { color: { value: 0 } } },
            ],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { heat: { brush: { x: [200,600], y: [40,100] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
