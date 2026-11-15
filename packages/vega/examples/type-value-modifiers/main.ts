// Value references: pow(scale(value), exponent) * mult + offset, with signals as modifiers
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 170,
    padding: 5,

    signals: [
      { name: 'expo', value: 2, bind: { input: 'range', min: 0.4, max: 3, step: 0.1, name: 'exponent' } },
      { name: 'amp', value: 120, bind: { input: 'range', min: 40, max: 150, step: 5, name: 'mult' } },
      { name: 'lift', value: 10, bind: { input: 'range', min: 0, max: 50, step: 5, name: 'offset (px)' } },
    ],

    // The scale maps the field i (0 to 10) onto 0 to 1; modifiers then work on that result.
    scales: [{ name: 'u', type: 'linear', domain: [0, 10], range: [0, 1] }],
    data: [{ name: 'bars', transform: [{ type: 'sequence', start: 0, stop: 11, as: 'i' }] }],

    marks: [
      {
        type: 'rect',
        from: { data: 'bars' },
        encode: {
          enter: { width: { value: 30 }, fill: { value: 'steelblue' } },
          // y and y2 share one encode set, or the bar collapses.
          update: {
            y2: { value: 160 },
            x: { field: 'i', mult: 40, offset: 2 },
            // top = pow(u(i), expo) * -amp + (160 - lift): each modifier may itself be a signal reference.
            y: { scale: 'u', field: 'i', exponent: { signal: 'expo' }, mult: { signal: '-amp' }, offset: { signal: '160 - lift' } },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 4 },
            y: { value: 4 },
            baseline: { value: 'top' },
            fill: { value: '#ddd' },
            fontSize: { value: 12 },
            text: { signal: "'y = u(i) ^ ' + expo + ' * -' + amp + ' + (160 - ' + lift + ')'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { expo: 0.5, amp: 100, lift: 20 },
      { expo: 3, amp: 140, lift: 0 },
      { expo: 1, amp: 90, lift: 40 },
      { expo: 2, amp: 120, lift: 10 },
    ],
    1400,
  );
  return () => stage.dispose();
};

export default mount;
