// encoding.x.bin.desiredCount sets how many bins a histogram aims for
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'desiredCount: 6': {
        charts: {
        score: {
          title: "score, desiredCount 6",
          layers: [
            { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'score', bin: { desiredCount: 6 } }, y: { aggregate: 'count' } } },
            { mark: 'bar', filter: '$filter', encoding: { x: { field: 'score', bin: { desiredCount: 6 } }, y: { aggregate: 'count' } } },
          ],
          selection: { brush: { encoding: 'x' } },
        } satisfies BuiltinChartSpec,
        },
      },
      'desiredCount: 15': {
        charts: {
        score: {
          title: "score, desiredCount 15",
          layers: [
            { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'score', bin: { desiredCount: 15 } }, y: { aggregate: 'count' } } },
            { mark: 'bar', filter: '$filter', encoding: { x: { field: 'score', bin: { desiredCount: 15 } }, y: { aggregate: 'count' } } },
          ],
          selection: { brush: { encoding: 'x' } },
        } satisfies BuiltinChartSpec,
        },
      },
      'desiredCount: 40': {
        charts: {
        score: {
          title: "score, desiredCount 40",
          layers: [
            { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'score', bin: { desiredCount: 40 } }, y: { aggregate: 'count' } } },
            { mark: 'bar', filter: '$filter', encoding: { x: { field: 'score', bin: { desiredCount: 40 } }, y: { aggregate: 'count' } } },
          ],
          selection: { brush: { encoding: 'x' } },
        } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
