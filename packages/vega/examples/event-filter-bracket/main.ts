// Bracket filters pick events by their properties: held buttons, modifier keys
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { fire, line, sleep } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,

    signals: [
      { name: 'hover', value: [60, 120], on: [{ events: 'mousemove', update: '[x(), y()]' }] },
      // Filter expressions may read the event but never signals.
      { name: 'pressed', value: [60, 120], on: [{ events: 'mousemove[event.buttons]', update: '[x(), y()]' }] },
      { name: 'shiftClick', on: [{ events: 'click[event.shiftKey]', update: '{x: x(), y: y()}' }] },
    ],

    // A trigger turns each shift-click into a data row; after six rings the oldest start over.
    data: [
      {
        name: 'stamps',
        values: [],
        on: [
          { trigger: 'shiftClick && length(data("stamps")) >= 6', remove: true },
          { trigger: 'shiftClick', insert: 'shiftClick' },
        ],
      },
    ],

    marks: [
      line('"grey: mousemove   orange: mousemove[event.buttons]"', 4, { fontSize: { value: 11 } }),
      line('"green rings: click[event.shiftKey]"', 20, { fontSize: { value: 11 } }),
      { type: 'symbol', encode: { update: { x: { signal: 'hover[0]' }, y: { signal: 'hover[1]' }, size: { value: 200 }, fill: { value: '#888' } } } },
      { type: 'symbol', encode: { update: { x: { signal: 'pressed[0]' }, y: { signal: 'pressed[1]' }, size: { value: 120 }, fill: { value: 'orange' } } } },
      {
        type: 'symbol',
        from: { data: 'stamps' },
        encode: { update: { x: { field: 'x' }, y: { field: 'y' }, size: { value: 700 }, fill: { value: null }, stroke: { value: '#2ecc71' }, strokeWidth: { value: 3 } } },
      },
    ],
  };
  const view = await stage.render(spec);

  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(2600, async (i) => {
      ghost.move(80 + (i % 3) * 90, 60);
      await sleep(250);
      await ghost.drag([80 + (i % 3) * 90, 60], [140 + (i % 3) * 90, 150], 700, 10);
      fire(view, 'click', 100 + (i % 4) * 70, 160, { shiftKey: true });
    });
  }
  return () => stage.dispose();
};

export default mount;
