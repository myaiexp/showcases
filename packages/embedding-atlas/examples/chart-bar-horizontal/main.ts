// a bar layer with orientation horizontal
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'score 0 to 40': {
        charts: {
          sources: {
            title: 'documents per source',
            layers: [
              { mark: 'bar', orientation: 'horizontal', style: { fillColor: '$markColorFade' }, encoding: { y: { field: 'source' }, x: { aggregate: 'count' } } },
              { mark: 'bar', orientation: 'horizontal', filter: '$filter', encoding: { y: { field: 'source' }, x: { aggregate: 'count' } } },
            ],
          } satisfies BuiltinChartSpec,
          score: {
            title: 'score',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'score' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'score' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { score: { brush: { x: [0, 40] } } },
      },
      'score 40 to 70': {
        charts: {
          sources: {
            title: 'documents per source',
            layers: [
              { mark: 'bar', orientation: 'horizontal', style: { fillColor: '$markColorFade' }, encoding: { y: { field: 'source' }, x: { aggregate: 'count' } } },
              { mark: 'bar', orientation: 'horizontal', filter: '$filter', encoding: { y: { field: 'source' }, x: { aggregate: 'count' } } },
            ],
          } satisfies BuiltinChartSpec,
          score: {
            title: 'score',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'score' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'score' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { score: { brush: { x: [40, 70] } } },
      },
      'score 70 to 100': {
        charts: {
          sources: {
            title: 'documents per source',
            layers: [
              { mark: 'bar', orientation: 'horizontal', style: { fillColor: '$markColorFade' }, encoding: { y: { field: 'source' }, x: { aggregate: 'count' } } },
              { mark: 'bar', orientation: 'horizontal', filter: '$filter', encoding: { y: { field: 'source' }, x: { aggregate: 'count' } } },
            ],
          } satisfies BuiltinChartSpec,
          score: {
            title: 'score',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'score' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'score' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { score: { brush: { x: [70, 100] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
