// lineBreak and array text give lines; limit truncates with an ellipsis
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 220, padding: 5,
    signals: [
      { name: 'lineHeight', value: 18, bind: { input: 'range', min: 10, max: 40, step: 1 } },
      { name: 'limit', value: 0, bind: { input: 'range', min: 0, max: 300, step: 5 } },
      { name: 'ellipsis', value: '…', bind: { input: 'select', options: ['…', '...', ' [more]', ''] } },
      { name: 'dir', value: 'ltr', bind: { input: 'radio', options: ['ltr', 'rtl'] } },
    ],
    marks: [
      {
        type: 'text',
        encode: {
          enter: { x: { value: 10 }, y: { value: 20 }, text: { value: 'split on a break\nsecond line\nthird line' }, lineBreak: { value: '\n' }, fill: { value: '#4fa3e0' } },
          update: { lineHeight: { signal: 'lineHeight' } },
        },
      },
      {
        type: 'text',
        encode: {
          enter: { x: { value: 230 }, y: { value: 20 }, text: { value: ['an array', 'is one line', 'per item'] }, fill: { value: '#7fd18b' } },
          update: { lineHeight: { signal: 'lineHeight' } },
        },
      },
      {
        type: 'text',
        encode: {
          enter: { x: { value: 10 }, y: { value: 150 }, text: { value: 'The quick brown fox jumps over the lazy dog' }, fill: { value: 'orange' } },
          update: { limit: { signal: 'limit' }, ellipsis: { signal: 'ellipsis' }, dir: { signal: 'dir' } },
        },
      },
      { type: 'rule', encode: { update: { x: { value: 10 }, x2: { signal: '10 + limit' }, y: { value: 160 }, stroke: { value: '#667' }, strokeDash: { value: [3, 3] }, opacity: { signal: 'limit > 0 ? 1 : 0' } } } },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ limit: 0, lineHeight: 16, dir: 'ltr' }, { limit: 200, lineHeight: 26, dir: 'ltr' }, { limit: 110, lineHeight: 34, dir: 'ltr' }, { limit: 110, lineHeight: 20, dir: 'rtl' }, { limit: 70, lineHeight: 14, dir: 'rtl' }], 1400);
  return () => stage.dispose();
};

export default mount;
