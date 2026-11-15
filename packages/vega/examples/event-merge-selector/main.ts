// Comma-separated selectors merge into one stream; the merge object form does the same
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 170,
    padding: 5,

    signals: [
      // Selector form: a click on a rect OR a double click on a symbol.
      { name: 'picked', value: 'nothing yet', on: [{ events: 'rect:click, symbol:dblclick', update: "event.type + ' on a ' + item().mark.marktype" }] },
      // Object form: one stream made of two streams.
      {
        name: 'entered',
        value: 'nothing yet',
        on: [
          {
            events: { merge: [{ marktype: 'rect', type: 'mouseover' }, { marktype: 'symbol', type: 'mouseover' }] },
            update: "'pointer entered a ' + item().mark.marktype",
          },
        ],
      },
    ],

    marks: [
      line("'rect:click, symbol:dblclick -> ' + picked", 4),
      line("'merge of two mouseovers    -> ' + entered", 24),
      { type: 'rect', encode: { update: { x: { value: 40 }, y: { value: 70 }, width: { value: 130 }, height: { value: 80 }, fill: { value: 'steelblue' } } } },
      { type: 'symbol', encode: { update: { x: { value: 300 }, y: { value: 110 }, size: { value: 4500 }, fill: { value: 'orange' } } } },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(1100, (i) => {
      const k = i % 4;
      if (k === 0) ghost.click(100, 110);
      else if (k === 1) ghost.move(300, 110);
      else if (k === 2) ghost.dblclick(300, 110);
      else ghost.move(90, 100);
    });
  }
  return () => stage.dispose();
};

export default mount;
