// scale.color range for a nominal color encoding and a quantitative one
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'default': {
        charts: {
          words: {
            title: 'words by source',
            layers: [{ mark: 'bar', encoding: { x: { field: 'words' }, y: { aggregate: 'count' }, color: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'range: 5 colors': {
        charts: {
          words: {
            title: 'words by source',
            layers: [{ mark: 'bar', encoding: { x: { field: 'words' }, y: { aggregate: 'count' }, color: { field: 'source' } } }],
            scale: { color: { range: ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4', '#8b5cf6'] } },
          } satisfies BuiltinChartSpec,
        },
      },
      'range: reversed': {
        charts: {
          words: {
            title: 'words by source',
            layers: [{ mark: 'bar', encoding: { x: { field: 'words' }, y: { aggregate: 'count' }, color: { field: 'source' } } }],
            scale: { color: { range: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'] } },
          } satisfies BuiltinChartSpec,
        },
      },
      'quantitative range': {
        charts: {
          heat: {
            title: 'words by score',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            scale: { color: { range: ['#1e1b4b', '#f97316', '#fef08a'] } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
