// scale.size with range and type on a bubble chart
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'range: [20, 200]': {
        charts: {
          bubbles: {
            title: 'size range: [20, 200]',
            layers: [{ mark: 'point', style: { fillOpacity: 0.3 }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, size: { aggregate: 'count' }, group: { field: 'source' } } }],
            scale: { size: { range: [20, 200] } },
          } satisfies BuiltinChartSpec,
        },
      },
      'range: [100, 1500]': {
        charts: {
          bubbles: {
            title: 'size range: [100, 1500]',
            layers: [{ mark: 'point', style: { fillOpacity: 0.3 }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, size: { aggregate: 'count' }, group: { field: 'source' } } }],
            scale: { size: { range: [100, 1500] } },
          } satisfies BuiltinChartSpec,
        },
      },
      'type: log, range: [20, 600]': {
        charts: {
          bubbles: {
            title: 'size type: log, range: [20, 600]',
            layers: [{ mark: 'point', style: { fillOpacity: 0.3 }, encoding: { x: { aggregate: 'mean', field: 'words' }, y: { aggregate: 'mean', field: 'score' }, size: { aggregate: 'count' }, group: { field: 'source' } } }],
            scale: { size: { type: 'log', range: [20, 600] } },
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
