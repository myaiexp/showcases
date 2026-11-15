// the layer interpolate option on a line mark
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'interpolate: linear': {
        charts: {
          line: {
            title: 'score, linear',
            layers: [{ mark: 'line', interpolate: 'linear', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: cardinal': {
        charts: {
          line: {
            title: 'score, cardinal',
            layers: [{ mark: 'line', interpolate: 'cardinal', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: catmull-rom': {
        charts: {
          line: {
            title: 'score, catmull-rom',
            layers: [{ mark: 'line', interpolate: 'catmull-rom', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: natural': {
        charts: {
          line: {
            title: 'score, natural',
            layers: [{ mark: 'line', interpolate: 'natural', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: monotone': {
        charts: {
          line: {
            title: 'score, monotone',
            layers: [{ mark: 'line', interpolate: 'monotone', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: basis': {
        charts: {
          line: {
            title: 'score, basis',
            layers: [{ mark: 'line', interpolate: 'basis', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: step': {
        charts: {
          line: {
            title: 'score, step',
            layers: [{ mark: 'line', interpolate: 'step', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: step-before': {
        charts: {
          line: {
            title: 'score, step-before',
            layers: [{ mark: 'line', interpolate: 'step-before', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'interpolate: step-after': {
        charts: {
          line: {
            title: 'score, step-after',
            layers: [{ mark: 'line', interpolate: 'step-after', encoding: { x: { field: 'words', bin: { desiredCount: 14 } }, y: { aggregate: 'mean', field: 'score' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
