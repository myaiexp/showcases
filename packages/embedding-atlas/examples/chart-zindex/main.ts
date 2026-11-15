// layer zIndex above and below the grid lines
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'area zIndex: 1': {
        charts: {
          layers: {
            title: 'area zIndex: 1',
            layers: [
              { mark: 'bar', zIndex: 0, encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' } } },
              { mark: 'area', zIndex: 1, style: { fillColor: '#f59e0b', fillOpacity: 0.6 }, encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' } } },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
      'area zIndex: -1': {
        charts: {
          layers: {
            title: 'area zIndex: -1',
            layers: [
              { mark: 'bar', zIndex: 0, encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' } } },
              { mark: 'area', zIndex: -1, style: { fillColor: '#f59e0b', fillOpacity: 0.6 }, encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' } } },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
      'area zIndex: -2, bars zIndex: -1': {
        charts: {
          layers: {
            title: 'area zIndex: -2, bars zIndex: -1',
            layers: [
              { mark: 'bar', zIndex: -1, encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' } } },
              { mark: 'area', zIndex: -2, style: { fillColor: '#f59e0b', fillOpacity: 0.6 }, encoding: { x: { field: 'words', bin: { desiredCount: 12 } }, y: { aggregate: 'count' } } },
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
