// init evaluates once at startup; later events keep updating the signal
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 110,
    padding: 5,

    signals: [
      // init runs exactly once, when the view starts: it is not re-run when the clock ticks.
      { name: 'started', init: 'now()' },
      // A timer stream updates `elapsed` twice a second, measured from `started`.
      { name: 'elapsed', value: 0, on: [{ events: 'timer{500}', update: 'now() - started' }] },
      // `init` can read built-in signals such as width; `update` would also follow later changes.
      { name: 'mid', init: 'width / 2' },
    ],

    marks: [
      line("'started (init): ' + timeFormat(started, '%H:%M:%S')", 6),
      line("'elapsed (timer{500}): ' + format(elapsed / 1000, '.1f') + ' s'", 32),
      line("'mid (init width / 2): ' + mid", 58),
      {
        type: 'rect',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 90 },
            height: { value: 12 },
            width: { signal: 'width * (elapsed % 5000) / 5000' },
            fill: { value: 'steelblue' },
          },
        },
      },
    ],
  };

  await stage.render(spec);
  // The timer runs inside the spec; mark the card as animated so it gets no wipe.
  if (stage.preview) stage.every(60_000, () => undefined);
  return () => stage.dispose();
};

export default mount;
