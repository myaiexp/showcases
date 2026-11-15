// ecdf-value and ecdf-rank aggregates on a line
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
          ecdf: {
            title: 'words, eCDF',
            layers: [
              { mark: 'line', style: { strokeColor: '$markColorGray' }, encoding: { x: { aggregate: 'ecdf-value', field: 'words' }, y: { aggregate: 'ecdf-rank' } } },
              { mark: 'line', filter: '$filter', encoding: { x: { aggregate: 'ecdf-value', field: 'words' }, y: { aggregate: 'ecdf-rank' } } },
            ],
          } satisfies BuiltinChartSpec,
        score: {
          title: "score",
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
          ecdf: {
            title: 'words, eCDF',
            layers: [
              { mark: 'line', style: { strokeColor: '$markColorGray' }, encoding: { x: { aggregate: 'ecdf-value', field: 'words' }, y: { aggregate: 'ecdf-rank' } } },
              { mark: 'line', filter: '$filter', encoding: { x: { aggregate: 'ecdf-value', field: 'words' }, y: { aggregate: 'ecdf-rank' } } },
            ],
          } satisfies BuiltinChartSpec,
        score: {
          title: "score",
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
          ecdf: {
            title: 'words, eCDF',
            layers: [
              { mark: 'line', style: { strokeColor: '$markColorGray' }, encoding: { x: { aggregate: 'ecdf-value', field: 'words' }, y: { aggregate: 'ecdf-rank' } } },
              { mark: 'line', filter: '$filter', encoding: { x: { aggregate: 'ecdf-value', field: 'words' }, y: { aggregate: 'ecdf-rank' } } },
            ],
          } satisfies BuiltinChartSpec,
        score: {
          title: "score",
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
