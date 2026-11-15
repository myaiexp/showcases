// a predicates chart with named items and a preselected predicate
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'rating >= 4': {
        charts: {
          preds: {
            type: 'predicates',
            title: 'Filters',
            items: [
              { name: 'Good ratings', predicate: 'rating >= 4' },
              { name: 'Short documents', predicate: 'words < 120' },
              { name: 'From the wiki', predicate: "source = 'wiki'" },
            ],
          } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { preds: { selection: ["rating >= 4"] } },
      },
      'words < 120': {
        charts: {
          preds: {
            type: 'predicates',
            title: 'Filters',
            items: [
              { name: 'Good ratings', predicate: 'rating >= 4' },
              { name: 'Short documents', predicate: 'words < 120' },
              { name: 'From the wiki', predicate: "source = 'wiki'" },
            ],
          } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { preds: { selection: ["words < 120"] } },
      },
      "source = 'wiki'": {
        charts: {
          preds: {
            type: 'predicates',
            title: 'Filters',
            items: [
              { name: 'Good ratings', predicate: 'rating >= 4' },
              { name: 'Short documents', predicate: 'words < 120' },
              { name: 'From the wiki', predicate: "source = 'wiki'" },
            ],
          } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { preds: { selection: ["source = 'wiki'"] } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
