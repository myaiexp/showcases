// rect layers with y1/y2 encodings of min, max and quantiles make a box plot
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'words per topic': {
        charts: {
          box: {
            title: 'words per topic',
            layers: [
              { mark: 'rect', filter: '$filter', width: 1, style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'topic' }, y1: { aggregate: 'min', field: 'words' }, y2: { aggregate: 'max', field: 'words' } } },
              { mark: 'rect', filter: '$filter', width: { gap: 1, clampToRatio: 0.1 }, encoding: { x: { field: 'topic' }, y1: { aggregate: 'quantile', quantile: 0.25, field: 'words' }, y2: { aggregate: 'quantile', quantile: 0.75, field: 'words' } } },
              { mark: 'rect', filter: '$filter', height: 1, width: { gap: 1, clampToRatio: 0.1 }, style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'topic' }, y: { aggregate: 'median', field: 'words' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            axis: { y: { title: 'words' } },
          } satisfies BuiltinChartSpec,
        },
      },
      'rating per source': {
        charts: {
          box: {
            title: 'rating per source',
            layers: [
              { mark: 'rect', filter: '$filter', width: 1, style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'source' }, y1: { aggregate: 'min', field: 'rating' }, y2: { aggregate: 'max', field: 'rating' } } },
              { mark: 'rect', filter: '$filter', width: { gap: 1, clampToRatio: 0.1 }, encoding: { x: { field: 'source' }, y1: { aggregate: 'quantile', quantile: 0.25, field: 'rating' }, y2: { aggregate: 'quantile', quantile: 0.75, field: 'rating' } } },
              { mark: 'rect', filter: '$filter', height: 1, width: { gap: 1, clampToRatio: 0.1 }, style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'source' }, y: { aggregate: 'median', field: 'rating' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            axis: { y: { title: 'rating' } },
          } satisfies BuiltinChartSpec,
        },
      },
      'score per topic': {
        charts: {
          box: {
            title: 'score per topic',
            layers: [
              { mark: 'rect', filter: '$filter', width: 1, style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'topic' }, y1: { aggregate: 'min', field: 'score' }, y2: { aggregate: 'max', field: 'score' } } },
              { mark: 'rect', filter: '$filter', width: { gap: 1, clampToRatio: 0.1 }, encoding: { x: { field: 'topic' }, y1: { aggregate: 'quantile', quantile: 0.25, field: 'score' }, y2: { aggregate: 'quantile', quantile: 0.75, field: 'score' } } },
              { mark: 'rect', filter: '$filter', height: 1, width: { gap: 1, clampToRatio: 0.1 }, style: { fillColor: '$ruleColor' }, encoding: { x: { field: 'topic' }, y: { aggregate: 'median', field: 'score' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            axis: { y: { title: 'score' } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
