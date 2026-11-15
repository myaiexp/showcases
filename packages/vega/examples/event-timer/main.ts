// timer{ms} fires on an interval with no input at all
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 160,
    padding: 5,

    signals: [
      // For timer streams the number in braces is the interval, not a throttle.
      { name: 'seconds', value: 0, on: [{ events: 'timer{1000}', update: 'seconds + 1' }] },
      { name: 'angle', value: 0, on: [{ events: 'timer{50}', update: '(angle + 0.12) % (2 * PI)' }] },
    ],

    marks: [
      line("'timer{1000}: ' + seconds + ' s'", 4),
      line("'timer{50}: sweeping hand'", 24, { fill: { value: '#9ad' } }),
      {
        type: 'symbol',
        encode: { update: { x: { value: 260 }, y: { value: 90 }, size: { value: 9000 }, fill: { value: null }, stroke: { value: '#667' } } },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 260 },
            y: { value: 90 },
            x2: { signal: '260 + 52 * sin(angle)' },
            y2: { signal: '90 - 52 * cos(angle)' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 3 },
          },
        },
      },
      {
        type: 'rect',
        encode: {
          update: { x: { value: 10 }, y: { value: 120 }, height: { value: 14 }, width: { signal: '20 * (seconds % 11)' }, fill: { value: 'steelblue' } },
        },
      },
    ],
  };

  await stage.render(spec);
  // The timers run inside the spec; this no-op keeps the card from getting the idle wipe.
  if (stage.preview) stage.every(60_000, () => undefined);
  return () => stage.dispose();
};

export default mount;
