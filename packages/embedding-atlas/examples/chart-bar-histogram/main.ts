// the default two-layer bar histogram and its $filter layer
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'brush 0 to 150': {
        charts: {
        hist: {
          title: "words",
          layers: [
            { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
          ],
          selection: { brush: { encoding: 'x' } },
        } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { hist: { brush: { x: [0, 150] } } },
      },
      'brush 150 to 400': {
        charts: {
        hist: {
          title: "words",
          layers: [
            { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
          ],
          selection: { brush: { encoding: 'x' } },
        } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { hist: { brush: { x: [150, 400] } } },
      },
      'brush 400 to 900': {
        charts: {
        hist: {
          title: "words",
          layers: [
            { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
            { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
          ],
          selection: { brush: { encoding: 'x' } },
        } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { hist: { brush: { x: [400, 900] } } },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
