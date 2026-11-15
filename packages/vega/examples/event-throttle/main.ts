// {ms} throttles a stream: at most one event per window
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 150,
    padding: 5,

    signals: [
      { name: 'raw', value: [0, 75], on: [{ events: 'mousemove', update: '[x(), y()]' }] },
      { name: 'rawCount', value: 0, on: [{ events: 'mousemove', update: 'rawCount + 1' }] },
      // Throttled: after one event passes, the next 300 ms of moves are ignored.
      { name: 'slow', value: [0, 75], on: [{ events: 'mousemove{300}', update: '[x(), y()]' }] },
      { name: 'slowCount', value: 0, on: [{ events: 'mousemove{300}', update: 'slowCount + 1' }] },
    ],

    marks: [
      line("'mousemove       ' + rawCount + ' events'", 4),
      line("'mousemove{300}  ' + slowCount + ' events'", 24, { fill: { value: 'orange' } }),
      { type: 'symbol', encode: { update: { x: { signal: 'raw[0]' }, y: { signal: 'raw[1]' }, size: { value: 150 }, fill: { value: 'steelblue' } } } },
      {
        type: 'symbol',
        encode: {
          update: { x: { signal: 'slow[0]' }, y: { signal: 'slow[1]', offset: 18 }, size: { value: 150 }, fill: { value: 'orange' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(2200, (i) => (i % 2 ? ghost.drag([380, 90], [30, 70], 1700, 40) : ghost.drag([30, 70], [380, 90], 1700, 40)));
  }
  return () => stage.dispose();
};

export default mount;
