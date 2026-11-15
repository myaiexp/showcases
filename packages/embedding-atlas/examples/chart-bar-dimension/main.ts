// Bar width Dimension forms: number, { ratio }, { gap }, { gap, clampToRatio }
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'width: 12': {
        charts: {
          bars: {
            title: 'width: 12',
            layers: [{ mark: 'bar', width: 12, encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'width: { ratio: 0.3 }': {
        charts: {
          bars: {
            title: 'width: { ratio: 0.3 }',
            layers: [{ mark: 'bar', width: { ratio: 0.3 }, encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'width: { gap: 20 }': {
        charts: {
          bars: {
            title: 'width: { gap: 20 }',
            layers: [{ mark: 'bar', width: { gap: 20 }, encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'width: { gap: 1, clampToRatio: 0.2 }': {
        charts: {
          bars: {
            title: 'width: { gap: 1, clampToRatio: 0.2 }',
            layers: [{ mark: 'bar', width: { gap: 1, clampToRatio: 0.2 }, encoding: { x: { field: 'topic' }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
