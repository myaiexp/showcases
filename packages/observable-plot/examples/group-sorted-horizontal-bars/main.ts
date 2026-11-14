// groupY with barX makes horizontal bars; sort: {y: "x"} orders sports by count
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const olympians = await csv('athletes.csv');
  return mountPlot<{ sorted: boolean }>(el, ctx, {
    initial: { sorted: true },
    render: ({ sorted }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginLeft: preview ? 10 : 100,
        x: { grid: true },
        y: { label: null, axis: preview ? null : 'left' },
        marks: [Plot.barX(olympians, Plot.groupY({ x: 'count' }, { y: 'sport', sort: sorted ? { y: 'x' } : undefined })), Plot.ruleX([0])],
      }),
    step: ({ sorted }) => ({ sorted: !sorted }),
    controls: (bar, live) => toggle(bar, 'sort y by x', live.state.sorted, (sorted) => live.set({ sorted })),
  });
};

export default mount;
