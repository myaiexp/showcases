// style.paintOrder for fill and stroke
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'paintOrder: fill stroke': {
        charts: {
          bubbles: {
            title: 'paintOrder: fill stroke',
            layers: [{ mark: 'point', size: 1600, style: { fillColor: '$markColor', strokeColor: '#fbbf24', strokeWidth: 14, paintOrder: 'fill stroke' }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, group: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'paintOrder: stroke fill': {
        charts: {
          bubbles: {
            title: 'paintOrder: stroke fill',
            layers: [{ mark: 'point', size: 1600, style: { fillColor: '$markColor', strokeColor: '#fbbf24', strokeWidth: 14, paintOrder: 'stroke fill' }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, group: { field: 'topic' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
