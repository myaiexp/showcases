// strokeColor, strokeWidth, strokeOpacity, strokeCap and strokeJoin on a line
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'butt cap, miter join': {
        charts: {
          line: {
            title: 'butt cap, miter join',
            layers: [{ mark: 'line', style: { strokeWidth: 10, strokeCap: 'butt', strokeJoin: 'miter' }, encoding: { x: { field: 'words', bin: { desiredCount: 8 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'round cap, round join': {
        charts: {
          line: {
            title: 'round cap, round join',
            layers: [{ mark: 'line', style: { strokeWidth: 10, strokeCap: 'round', strokeJoin: 'round' }, encoding: { x: { field: 'words', bin: { desiredCount: 8 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'square cap, miter join': {
        charts: {
          line: {
            title: 'square cap, miter join',
            layers: [{ mark: 'line', style: { strokeWidth: 10, strokeCap: 'square', strokeJoin: 'miter' }, encoding: { x: { field: 'words', bin: { desiredCount: 8 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'bevel join': {
        charts: {
          line: {
            title: 'bevel join',
            layers: [{ mark: 'line', style: { strokeWidth: 10, strokeJoin: 'bevel' }, encoding: { x: { field: 'words', bin: { desiredCount: 8 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'strokeOpacity: 0.4': {
        charts: {
          line: {
            title: 'strokeOpacity: 0.4',
            layers: [{ mark: 'line', style: { strokeWidth: 6, strokeColor: '#f59e0b', strokeOpacity: 0.4 }, encoding: { x: { field: 'words', bin: { desiredCount: 8 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
