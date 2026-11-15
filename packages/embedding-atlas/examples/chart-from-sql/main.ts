// layer.from as a table name and as a { sql } table expression
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'from: table name': (table: string) => ({
        charts: {
          bars: {
            title: 'from: the table by name',
            layers: [{ from: table, mark: 'bar', encoding: { x: { field: 'source' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      }),
      'from: { sql } with GROUP BY': (table: string) => ({
        charts: {
          bars: {
            title: 'from: SQL averages per topic',
            layers: [
              {
                from: { sql: `SELECT topic, avg(score) AS mean_score FROM ${table} GROUP BY topic` },
                mark: 'bar',
                encoding: { x: { field: 'topic' }, y: { field: 'mean_score' } },
              },
            ],
          } satisfies BuiltinChartSpec,
        },
      }),
      'from: { sql } with $filter': (table: string) => ({
        charts: {
          words: {
            title: 'from: SQL reading $filter',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              {
                from: { sql: `SELECT * FROM ${table} WHERE $filter` },
                mark: 'bar',
                encoding: { x: { field: 'words' }, y: { aggregate: 'count' } },
              },
            ],
            selection: { brush: { encoding: 'x' } },
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' } } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 200] } } },
      }),
    },
    {},
  );
  return stage.dispose;
};

export default mount;
