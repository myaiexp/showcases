// A test-guarded value array: the first true test wins, the last entry is else
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(11);
  const rows = Array.from({ length: 16 }, (_, i) => ({ i, v: Math.round(8 + rand() * 84) }));

  const spec: Spec = {
    width: 440, height: 220, padding: 5,
    signals: [
      { name: 'hi', value: 70, bind: { input: 'range', min: 40, max: 100, step: 1 } },
      { name: 'lo', value: 30, bind: { input: 'range', min: 0, max: 60, step: 1 } },
    ],
    data: [{ name: 'table', values: rows }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'i' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y' }],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'x', field: 'i' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', value: 0 },
          },
          update: {
            // Tests run top to bottom; the entry without a test is the else.
            fill: [
              { test: 'datum.v > hi', value: 'tomato' },
              { test: 'datum.v < lo', value: '#4fa3e0' },
              { value: '#8a93a6' },
            ],
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 }, x2: { signal: 'width' },
            y: { signal: "scale('y', hi)" },
            stroke: { value: 'tomato' }, strokeDash: { value: [4, 3] },
          },
        },
      },
      {
        type: 'rule',
        encode: {
          update: {
            x: { value: 0 }, x2: { signal: 'width' },
            y: { signal: "scale('y', lo)" },
            stroke: { value: '#4fa3e0' }, strokeDash: { value: [4, 3] },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ hi: 70, lo: 30 }, { hi: 85, lo: 15 }, { hi: 55, lo: 45 }, { hi: 95, lo: 40 }], 1400);
  return () => stage.dispose();
};

export default mount;
