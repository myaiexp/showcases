// A waffleX of apples: automatic square cells, or a fixed multiple and padding
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const MULTIPLES = ['auto', '4', '8', '16'] as const;

const mount: Mount = (el, ctx) =>
  mountPlot(el, ctx, {
    initial: { apples: 512, multiple: 'auto' as (typeof MULTIPLES)[number], padding: 0.1 },
    render: ({ apples, multiple, padding }, { width, height }) =>
      Plot.waffleX([apples], { y: ['apples'], multiple: multiple === 'auto' ? undefined : Number(multiple) }).plot({
        width,
        height: height ?? 240,
        y: { padding },
      }),
    step: (_s, i) => ({ apples: [512, 130, 900, 300, 700][i % 5] ?? 512 }),
    previewMs: 1800,
    controls: (bar, live) => {
      slider(bar, 'apples', [10, 1028, 1], live.state.apples, (apples) => live.set({ apples }));
      select(bar, 'multiple', MULTIPLES, live.state.multiple, (multiple) => live.set({ multiple }));
      slider(bar, 'y padding', [0, 0.9, 0.05], live.state.padding, (padding) => live.set({ padding }));
    },
  });

export default mount;
