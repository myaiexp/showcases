// an embedding chart spec with data columns, mode, pointSize and downsampling
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'points': {
        charts: {
          emb: { type: 'embedding', title: 'points', data: { x: 'x', y: 'y', text: 'text', category: 'topic' } } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'mode: density': {
        charts: {
          emb: { type: 'embedding', title: 'mode: density', data: { x: 'x', y: 'y', category: 'topic' }, mode: 'density', minimumDensity: 0.00005 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'pointSize: 6': {
        charts: {
          emb: { type: 'embedding', title: 'pointSize: 6', data: { x: 'x', y: 'y', category: 'topic' }, pointSize: 6 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'downsampleMaxPoints: 500': {
        charts: {
          emb: { type: 'embedding', title: 'downsampleMaxPoints: 500', data: { x: 'x', y: 'y', category: 'topic' }, downsampleMaxPoints: 500 } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
      'config': {
        charts: {
          emb: { type: 'embedding', title: 'config', data: { x: 'x', y: 'y', text: 'text', category: 'topic' }, config: { autoLabelEnabled: false, pointSize: 3 } } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
