// onStateChange and onPredicateChange: the state and the filter, printed
import type { BuiltinChartSpec, EmbeddingAtlasState } from 'embedding-atlas';
import type { Mount } from '@/types.ts';
import { chartBoard } from '../../shared/chart-board.ts';
import { readout } from '../../shared/controls.ts';

const words = {
  title: 'words',
  layers: [
    { mark: 'bar', style: { fillColor: '$markColorFade' }, encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
    { mark: 'bar', filter: '$filter', encoding: { x: { field: 'words' }, y: { aggregate: 'count' } } },
  ],
  selection: { brush: { encoding: 'x' } },
} satisfies BuiltinChartSpec;

const topics = { type: 'count-plot', title: 'Topic', data: { field: 'topic' }, labels: '#/#' } satisfies BuiltinChartSpec;

const mount: Mount = async (el, ctx) => {
  let stateOut: HTMLElement | null = null;
  let predicateOut: HTMLElement | null = null;
  const props = {
    onStateChange: (state: EmbeddingAtlasState) => {
      if (stateOut) stateOut.textContent = 'onStateChange: ' + JSON.stringify({ chartStates: state.chartStates, currentLayout: state.currentLayout });
    },
    onPredicateChange: (p: string | null) => {
      if (predicateOut) predicateOut.textContent = 'onPredicateChange: ' + (p ?? 'null');
    },
  };
  const stage = await chartBoard(
    el,
    ctx,
    {
      'brush 0 to 200': { charts: { words, topics }, chartStates: { words: { brush: { x: [0, 200] } } }, props },
      'brush 300 to 700': { charts: { words, topics }, chartStates: { words: { brush: { x: [300, 700] } } }, props },
    },
    {},
  );
  if (stage.bar) {
    stateOut = readout(stage.box, 'onStateChange: (waiting)');
    predicateOut = readout(stage.box, 'onPredicateChange: (waiting)');
  }
  return stage.dispose;
};

export default mount;
