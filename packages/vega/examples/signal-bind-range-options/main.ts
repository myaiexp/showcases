// A range binding with min, max, step, a custom name and a debounce
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 140,
    padding: 5,

    signals: [
      // min, max and step shape the slider; `name` replaces the signal name as its label.
      { name: 'radius', value: 12, bind: { input: 'range', min: 4, max: 20, step: 2, name: 'Dot radius (px)' } },
      { name: 'opacity', value: 0.8, bind: { input: 'range', min: 0.1, max: 1, step: 0.05, name: 'Opacity' } },
      // debounce waits until the slider rests for 400 ms before the signal changes.
      { name: 'count', value: 8, bind: { input: 'range', min: 1, max: 14, step: 1, name: 'Dots (debounced 400 ms)', debounce: 400 } },
    ],

    // sequence generates 0 ... count - 1, and regenerates when the signal changes.
    data: [{ name: 'dots', transform: [{ type: 'sequence', start: 0, stop: { signal: 'count' }, as: 'i' }] }],

    marks: [
      {
        type: 'symbol',
        from: { data: 'dots' },
        encode: {
          update: {
            x: { signal: '24 + datum.i * 30' },
            y: { signal: 'height / 2' },
            size: { signal: 'radius * radius * 3.14' },
            fill: { value: 'steelblue' },
            fillOpacity: { signal: 'opacity' },
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
      { radius: 6, opacity: 1, count: 12 },
      { radius: 16, opacity: 0.4, count: 6 },
      { radius: 10, opacity: 0.8, count: 14 },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
