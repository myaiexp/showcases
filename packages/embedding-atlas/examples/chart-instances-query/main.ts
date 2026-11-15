// instances spec query with $table and $filter
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'words 0 to 150': {
        charts: {
          table: { type: 'instances', title: 'Topic summary', query: 'SELECT topic, count(*) AS documents, round(avg(words)) AS mean_words, round(avg(rating), 2) AS mean_rating FROM $table WHERE $filter GROUP BY topic ORDER BY documents DESC', pageSize: 10, defaultHeight: 300 } satisfies BuiltinChartSpec,
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
      'words 300 to 1000': {
        charts: {
          table: { type: 'instances', title: 'Topic summary', query: 'SELECT topic, count(*) AS documents, round(avg(words)) AS mean_words, round(avg(rating), 2) AS mean_rating FROM $table WHERE $filter GROUP BY topic ORDER BY documents DESC', pageSize: 10, defaultHeight: 300 } satisfies BuiltinChartSpec,
          words: {
            title: 'words',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [300, 1000] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
