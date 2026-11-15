// scale.color.discontinuityAtZero on a heatmap with empty cells
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'discontinuityAtZero: true': {
        charts: {
          heat: {
            title: 'rating by score, discontinuityAtZero: true',
            layers: [{ mark: 'rect', encoding: { x: { field: 'rating', bin: { desiredCount: 16 } }, y: { field: 'score', bin: { desiredCount: 16 } }, color: { aggregate: 'count' } } }],
            scale: { color: { discontinuityAtZero: true } },
          } satisfies BuiltinChartSpec,
        },
      },
      'discontinuityAtZero: false': {
        charts: {
          heat: {
            title: 'rating by score, discontinuityAtZero: false',
            layers: [{ mark: 'rect', encoding: { x: { field: 'rating', bin: { desiredCount: 16 } }, y: { field: 'score', bin: { desiredCount: 16 } }, color: { aggregate: 'count' } } }],
            scale: { color: { discontinuityAtZero: false } },
          } satisfies BuiltinChartSpec,
        },
      },
      'type: log': {
        charts: {
          heat: {
            title: 'rating by score, type: log',
            layers: [{ mark: 'rect', encoding: { x: { field: 'rating', bin: { desiredCount: 16 } }, y: { field: 'score', bin: { desiredCount: 16 } }, color: { aggregate: 'count' } } }],
            scale: { color: { type: 'log', discontinuityAtZero: true } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
