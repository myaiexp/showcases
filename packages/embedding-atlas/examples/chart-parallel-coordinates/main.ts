// a parallel-coordinates chart with fields, color, opacity and brushes
import type { BuiltinChartSpec } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await chartBoard(
    el,
    ctx,
    {
      'color: topic': {
        charts: {
          par: { type: 'parallel-coordinates', title: 'documents', data: { fields: ['words', 'score', 'rating', 'published'], color: 'topic', filter: '$filter' } } satisfies BuiltinChartSpec,
        },
      },
      'opacity: 0.2': {
        charts: {
          par: { type: 'parallel-coordinates', title: 'documents', opacity: 0.2, data: { fields: ['words', 'score', 'rating'], color: 'topic', filter: '$filter' } } satisfies BuiltinChartSpec,
        },
      },
      'brush on score': {
        charts: {
          par: { type: 'parallel-coordinates', title: 'documents, brushed', data: { fields: ['words', 'score', 'rating'], color: 'topic' } } satisfies BuiltinChartSpec,
          topics: { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec,
        },
        chartStates: { par: { brush: [null, [0.1, 0.4], null] } },
      },
      'scales.color range': {
        charts: {
          par: { type: 'parallel-coordinates', title: 'colored by score', data: { fields: ['words', 'rating', 'score'], color: 'score' }, scales: { color: { range: ['#38bdf8', '#f43f5e'] } } } satisfies BuiltinChartSpec,
        },
      },
    },
    {},
  );
  return stage.dispose;
};

export default mount;
