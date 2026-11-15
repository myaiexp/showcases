// Countpattern default pattern: count each distinct word, with case folding and stopwords
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rowsOf } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const lines = [
  { line: 'The river bends where the old mill stood and the water is slow' },
  { line: 'A heron stands in the water and watches the mill wheel turn' },
  { line: 'The wheel turns and the river carries the mill dust to the sea' },
  { line: 'Old water, slow water, the river is the road to the sea' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 210,
    padding: 5,
    signals: [
      { name: 'caseMode', value: 'mixed', bind: { input: 'select', options: ['mixed', 'lower', 'upper'] } },
      { name: 'skip', value: false, bind: { input: 'checkbox' } },
    ],
    data: [
      { name: 'lines', values: lines },
      {
        name: 'words',
        source: 'lines',
        transform: [
          {
            type: 'countpattern',
            field: 'line',
            case: { signal: 'caseMode' },
            // Stopwords is a regular expression, matched against each whole token.
            stopwords: { signal: "skip ? 'the|a|and|is|to|in|where' : ''" },
          },
          { type: 'collect', sort: { field: ['count', 'text'], order: ['descending', 'ascending'] } },
        ],
      },
      rowsOf('top', 'words', 9),
    ],
    scales: [
      { name: 'y', type: 'band', domain: { data: 'top', field: 'text' }, range: 'height', padding: 0.15 },
      { name: 'x', type: 'linear', domain: { data: 'top', field: 'count' }, nice: true, zero: true, range: 'width' },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x', tickMinStep: 1 }],
    title: { text: { signal: "'case ' + caseMode + (skip ? ', stopwords on' : ', no stopwords') + ': ' + length(data('words')) + ' distinct'" }, color: '#ddd' },
    marks: [
      {
        type: 'rect',
        from: { data: 'top' },
        encode: {
          update: {
            y: { scale: 'y', field: 'text' },
            height: { scale: 'y', band: 1 },
            x: { value: 0 },
            x2: { scale: 'x', field: 'count' },
            fill: { value: 'steelblue' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const steps: [string, boolean][] = [['mixed', false], ['lower', false], ['lower', true], ['upper', true]];
    stage.every(1600, async (i) => {
      const [c, s] = steps[i % steps.length]!;
      view.signal('caseMode', c).signal('skip', s);
      await view.runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
