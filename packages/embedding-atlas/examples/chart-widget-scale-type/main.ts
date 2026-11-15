// a widgets entry of type scale.type lets the reader change the scale
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'brush 0 to 200': {
        charts: {
          words: {
            title: 'words, with a scale.type widget',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            widgets: [{ type: 'scale.type', channel: 'x' }, { type: 'scale.type', channel: 'y' }],
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [0, 200] } } },
      },
      'brush 200 to 500': {
        charts: {
          words: {
            title: 'words, with a scale.type widget',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            widgets: [{ type: 'scale.type', channel: 'x' }, { type: 'scale.type', channel: 'y' }],
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [200, 500] } } },
      },
      'brush 500 to 1000': {
        charts: {
          words: {
            title: 'words, with a scale.type widget',
            layers: [
              { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
              { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            ],
            selection: { brush: { encoding: 'x' } },
            widgets: [{ type: 'scale.type', channel: 'x' }, { type: 'scale.type', channel: 'y' }],
          } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { words: { brush: { x: [500, 1000] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
