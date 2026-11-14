// autoSpec: the fully populated options auto chose, printed beside its plot
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const inputs = ['x: weight, y: height, color: count', 'x: weight', 'x: sex, y: weight'] as const;
type Input = (typeof inputs)[number];
const options: Record<Input, Plot.AutoOptions> = {
  'x: weight, y: height, color: count': { x: 'weight', y: 'height', color: 'count' },
  'x: weight': { x: 'weight' },
  'x: sex, y: weight': { x: 'sex', y: 'weight' },
};

// The spec carries the data columns inside markOptions; print them as a count.
const brief = (_key: string, v: unknown): unknown =>
  Array.isArray(v) && v.length > 8 ? `[${v.length} values]` : ArrayBuffer.isView(v) ? `[${(v as Float64Array).length} values]` : v;

const mount: Mount = async (el, ctx) => {
  const athletes = await csv('athletes.csv');
  const olympians = ctx.preview ? thin(athletes, 6) : athletes;
  let out: HTMLPreElement | null = null;
  const cleanup = mountPlot(el, ctx, {
    initial: { input: inputs[0] as Input },
    render: ({ input }, { width, height }) => {
      // autoSpec returns the options with the chosen mark, reducers and bins filled in.
      if (out) out.textContent = JSON.stringify(Plot.autoSpec(olympians, options[input]), brief, 2);
      return Plot.auto(olympians, options[input]).plot({ width, height });
    },
    step: (_s, i) => ({ input: inputs[i % inputs.length] }),
    previewMs: 2400,
    controls: (bar, live) => select(bar, 'options', inputs, live.state.input, (input) => live.set({ input })),
  });
  if (!ctx.preview) {
    out = readout(el);
    out.textContent = JSON.stringify(Plot.autoSpec(olympians, options[inputs[0]]), brief, 2);
  }
  return () => {
    cleanup();
    out?.remove();
  };
};

export default mount;
