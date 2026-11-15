// A derived stream: an existing stream plus filter and debounce
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { fire, line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 150,
    padding: 5,

    signals: [
      { name: 'clicks', value: 0, on: [{ events: 'rect:click', update: 'clicks + 1' }] },
      // `stream` is an input stream; filter and debounce modify it. Only shift-clicks pass,
      // and a burst of them is delivered once, 500 ms after the last.
      {
        name: 'shiftBursts',
        value: 0,
        on: [{ events: { stream: { marktype: 'rect', type: 'click' }, filter: 'event.shiftKey', debounce: 500 }, update: 'shiftBursts + 1' }],
      },
    ],

    marks: [
      line("'rect clicks                 ' + clicks", 4),
      line("'shift-click bursts (500 ms) ' + shiftBursts", 24, { fill: { value: 'orange' } }),
      line('"shift-click the rect several times quickly"', 44, { fill: { value: '#999' }, fontSize: { value: 11 } }),
      { type: 'rect', encode: { update: { x: { value: 130 }, y: { value: 80 }, width: { value: 160 }, height: { value: 60 }, fill: { value: 'steelblue' } } } },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    // Three fast shift-clicks, a pause, then two plain clicks.
    stage.every(2200, async (i) => {
      for (let k = 0; k < 3; k++) {
        fire(view, 'click', 160 + k * 30, 110, { shiftKey: i % 2 === 1 });
        await new Promise((r) => setTimeout(r, 70));
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
