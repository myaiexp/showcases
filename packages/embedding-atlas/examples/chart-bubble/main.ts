// a point mark with x, y and size encodings and an xy brush
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'brush x 0-250': {
        charts: {
          bubbles: {
            title: 'topics by mean words and score',
            layers: [
              {
                mark: 'point',
                filter: '$filter',
                style: { fillColor: '$encoding', fillOpacity: 0.3, strokeColor: '$encoding' },
                encoding: {
                  x: { aggregate: 'mean', field: 'words' },
                  y: { aggregate: 'mean', field: 'score' },
                  size: { aggregate: 'count' },
                  color: { field: 'topic' },
                },
              },
            ],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
          docs: { type: 'count-plot', title: 'Source', data: { field: 'source' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { bubbles: { brush: { x: [0,250], y: [0,100] } } },
      },
      'brush x 250-600': {
        charts: {
          bubbles: {
            title: 'topics by mean words and score',
            layers: [
              {
                mark: 'point',
                filter: '$filter',
                style: { fillColor: '$encoding', fillOpacity: 0.3, strokeColor: '$encoding' },
                encoding: {
                  x: { aggregate: 'mean', field: 'words' },
                  y: { aggregate: 'mean', field: 'score' },
                  size: { aggregate: 'count' },
                  color: { field: 'topic' },
                },
              },
            ],
            selection: { brush: { encoding: 'xy' } },
          } satisfies BuiltinChartSpec,
          docs: { type: 'count-plot', title: 'Source', data: { field: 'source' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { bubbles: { brush: { x: [250,600], y: [40,100] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
