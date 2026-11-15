// a widgets entry of type encoding.normalize with layer, attribute and options
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'normalize: x': {
        charts: {
          heat: {
            title: 'source by topic',
            layers: [{ mark: 'rect', filter: '$filter', encoding: { x: { field: 'topic' }, y: { field: 'source' }, color: { aggregate: 'count', normalize: 'x' } } }],
            selection: { brush: { encoding: 'xy' } },
            widgets: [{ type: 'encoding.normalize', layer: 0, attribute: 'color', options: ['x', 'y'] }],
          } satisfies BuiltinChartSpec,
        },
      },
      'normalize: y': {
        charts: {
          heat: {
            title: 'source by topic',
            layers: [{ mark: 'rect', filter: '$filter', encoding: { x: { field: 'topic' }, y: { field: 'source' }, color: { aggregate: 'count', normalize: 'y' } } }],
            selection: { brush: { encoding: 'xy' } },
            widgets: [{ type: 'encoding.normalize', layer: 0, attribute: 'color', options: ['x', 'y'] }],
          } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
