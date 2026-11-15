// {0, ms} debounces a stream: it fires only after the events pause
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line, sleep } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 150,
    padding: 5,

    signals: [
      { name: 'raw', value: [30, 60], on: [{ events: 'mousemove', update: '[x(), y()]' }] },
      // {0, 400}: no throttle, 400 ms debounce. Every new event restarts the wait, and
      // only the last event of a burst is delivered.
      { name: 'settled', value: [30, 60], on: [{ events: 'mousemove{0,400}', update: '[x(), y()]' }] },
      { name: 'settles', value: 0, on: [{ events: 'mousemove{0,400}', update: 'settles + 1' }] },
    ],

    marks: [
      line("'mousemove{0,400} fired ' + settles + ' times'", 4),
      { type: 'symbol', encode: { update: { x: { signal: 'raw[0]' }, y: { signal: 'raw[1]' }, size: { value: 100 }, fill: { value: 'steelblue' } } } },
      {
        type: 'symbol',
        encode: {
          update: { x: { signal: 'settled[0]' }, y: { signal: 'settled[1]' }, size: { value: 500 }, fill: { value: null }, stroke: { value: 'orange' }, strokeWidth: { value: 3 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  // Cards: a burst of moves, then a pause, so the ring jumps once per burst.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(1800, async (i) => {
      const bx = 50 + (i % 5) * 75;
      for (let k = 0; k < 6; k++) {
        ghost.move(bx + k * 12, 50 + (k % 2) * 40 + (i % 3) * 10);
        await sleep(50);
      }
    });
  }
  return () => stage.dispose();
};

export default mount;
