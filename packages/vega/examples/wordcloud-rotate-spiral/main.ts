// rotate, padding and spiral: word angles come from a data field, spacing and spiral from signals
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { words } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    padding: 0,
    autosize: 'none',
    signals: [
      { name: 'rotate', value: 45, bind: { input: 'select', options: [0, 30, 45, 60, 90] } },
      { name: 'wordPadding', value: 1, bind: { input: 'range', min: 0, max: 8, step: 1 } },
      { name: 'spiral', value: 'archimedean', bind: { input: 'radio', options: ['archimedean', 'rectangular'] } },
    ],
    data: [
      {
        name: 'table',
        values: words(9, 45),
        transform: [
          // Angles are -rotate, 0 or +rotate, picked by word length so the choice is repeatable.
          { type: 'formula', as: 'angle', expr: '[-rotate, 0, rotate][length(datum.text) % 3]' },
          {
            type: 'wordcloud',
            size: [{ signal: 'width' }, { signal: 'height' }],
            text: { field: 'text' },
            font: 'Helvetica Neue, Arial',
            fontSize: { field: 'count' },
            fontSizeRange: [10, 40],
            rotate: { field: 'angle' },
            padding: { signal: 'wordPadding' },
            spiral: { signal: 'spiral' },
          },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: { data: 'table', field: 'text' }, range: { scheme: 'category20' } }],
    marks: [
      {
        type: 'text',
        from: { data: 'table' },
        encode: {
          enter: {
            text: { field: 'text' },
            align: { value: 'center' },
            baseline: { value: 'alphabetic' },
            fill: { scale: 'color', field: 'text' },
            font: { value: 'Helvetica Neue, Arial' },
          },
          update: { x: { field: 'x' }, y: { field: 'y' }, angle: { field: 'angle' }, fontSize: { field: 'fontSize' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { rotate: 90, wordPadding: 1, spiral: 'archimedean' },
    { rotate: 30, wordPadding: 5, spiral: 'rectangular' },
    { rotate: 0, wordPadding: 2, spiral: 'archimedean' },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
