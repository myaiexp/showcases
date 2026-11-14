// Plot.filter as an explicit transform: a test function or a field name
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const TESTS = ['function', 'field name'] as const;
type Test = (typeof TESTS)[number];

const mount: Mount = async (el, ctx) => {
  // A boolean field so the test can be given as a field name, not only as a function.
  const alphabet = (await csv('alphabet.csv')).map((d) => ({ ...d, vowel: /[aeiouy]/i.test(d.letter) }));
  return mountPlot<{ test: Test; min: number }>(el, ctx, {
    initial: { test: 'function', min: 0.04 },
    render: ({ test, min }, { width, height }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true },
        marks: [
          Plot.barY(alphabet, { x: 'letter', y: 'frequency', fillOpacity: 0.3 }),
          // Plot.filter wraps the options and returns them with the index filtered.
          Plot.barY(alphabet, Plot.filter(test === 'function' ? (d: any) => d.frequency > min : 'vowel', { x: 'letter', y: 'frequency', fill: 'orange' })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ test }) => ({ test: test === 'function' ? 'field name' : 'function' }),
    previewMs: 2600,
    controls: (bar, live) => {
      select(bar, 'test given as', TESTS, live.state.test, (test) => live.set({ test }));
      slider(bar, 'frequency above (function)', [0, 0.12, 0.005], live.state.min, (min) => live.set({ min }));
    },
  });
};

export default mount;
