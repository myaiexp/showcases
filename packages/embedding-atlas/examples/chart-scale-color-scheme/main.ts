// scale.color.range given as a predefined interpolate scheme name
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      "range: 'viridis'": {
        charts: {
          heat: {
            title: 'count, viridis',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            scale: { color: { range: 'viridis' } },
          } satisfies BuiltinChartSpec,
        },
      },
      "range: 'magma'": {
        charts: {
          heat: {
            title: 'count, magma',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            scale: { color: { range: 'magma' } },
          } satisfies BuiltinChartSpec,
        },
      },
      "range: 'rdylgn'": {
        charts: {
          heat: {
            title: 'count, rdylgn',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            scale: { color: { range: 'rdylgn' } },
          } satisfies BuiltinChartSpec,
        },
      },
      "range: 'blues'": {
        charts: {
          heat: {
            title: 'count, blues',
            layers: [{ mark: 'rect', encoding: { x: { field: 'words', bin: { desiredCount: 20 } }, y: { field: 'score', bin: { desiredCount: 20 } }, color: { aggregate: 'count' } } }],
            scale: { color: { range: 'blues' } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
