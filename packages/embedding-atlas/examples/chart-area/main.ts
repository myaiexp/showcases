// the area mark, alone, under a line, and split by a color field
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'area': {
        charts: {
          area: {
            title: 'documents per month',
            layers: [{ mark: 'area', interpolate: 'monotone', encoding: { x: { field: 'published', bin: { desiredCount: 24 } }, y: { aggregate: 'count' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
      'area and line': {
        charts: {
          area: {
            title: 'documents per month',
            layers: [
              { mark: 'area', style: { fillColor: '$markColorFade', strokeColor: null }, encoding: { x: { field: 'published', bin: { desiredCount: 24 } }, y: { aggregate: 'count' } } },
              { mark: 'line', style: { strokeWidth: 2 }, encoding: { x: { field: 'published', bin: { desiredCount: 24 } }, y: { aggregate: 'count' } } },
            ],
          } satisfies BuiltinChartSpec,
        },
      },
      'color: source': {
        charts: {
          area: {
            title: 'documents per month by source',
            layers: [{ mark: 'area', style: { fillOpacity: 0.5 }, encoding: { x: { field: 'published', bin: { desiredCount: 12 } }, y: { aggregate: 'count' }, color: { field: 'source' } } }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
