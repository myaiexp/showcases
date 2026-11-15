// { sql } in a field and in an aggregate
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'field: { sql }': {
        charts: {
          expr: {
            title: 'words / 100',
            layers: [{ mark: 'bar', encoding: { x: { field: { sql: 'floor(words / 100)' } }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'aggregate: { sql }': {
        charts: {
          expr: {
            title: 'share of documents over 300 words',
            layers: [
              {
                mark: 'bar',
                encoding: { x: { field: 'topic' }, y: { aggregate: { sql: 'avg(CASE WHEN words > 300 THEN 1.0 ELSE 0.0 END)' } } },
              },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
