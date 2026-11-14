// Scale type inferred from values: linear, ordinal, utc, point
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const inputs = {
  'numbers -> linear': { values: [3, 8, 14, 15, 27], domain: undefined },
  'strings -> ordinal (point)': { values: ['small', 'medium', 'large', 'medium'], domain: undefined },
  'booleans -> ordinal (point)': { values: [true, false, true, true], domain: undefined },
  'dates -> utc': { values: [new Date('2021-02-01'), new Date('2021-05-15'), new Date('2021-09-30')], domain: undefined },
  'numbers, 3-value domain -> point': { values: [10, 20, 30, 20], domain: [10, 20, 30] },
} as const;
type Input = keyof typeof inputs;
const names = Object.keys(inputs) as Input[];

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { input: names[0] as Input },
    render: ({ input }, { width, height }) => {
      const { values, domain } = inputs[input];
      return Plot.plot({
        width,
        height,
        inset: 10,
        grid: true,
        x: domain ? { domain: [...domain] } : {},
        marks: [Plot.dot(values as readonly unknown[], { x: Plot.identity })],
      });
    },
    step: (_s, i) => ({ input: names[i % names.length] }),
    previewMs: 1800,
    controls: (bar, live) => select(bar, 'channel values ', names, live.state.input, (input) => live.set({ input })),
  });

export default mount;
