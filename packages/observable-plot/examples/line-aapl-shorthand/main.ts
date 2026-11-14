// Line chart of Apple closes, from x/y channels or the pair shorthand
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const forms = ['x and y channels', 'array of pairs'] as const;
type Form = (typeof forms)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = await csv('aapl.csv');
  return mountPlot<{ form: Form; labels: boolean }>(el, ctx, {
    initial: { form: forms[0], labels: false },
    render: ({ form, labels }, { width, height }) =>
      form === forms[0]
        ? Plot.line(aapl, { x: 'Date', y: 'Close' }).plot({ width, height, y: { grid: true } })
        : // Without x and y options each datum is a [x, y] point; the axis labels are lost.
          Plot.line(aapl.map((d) => [d.Date, d.Close])).plot({
            width,
            height,
            x: labels ? { label: 'Date' } : {},
            y: labels ? { label: 'Close', grid: true } : { grid: true },
          }),
    step: ({ form }) => ({ form: form === forms[0] ? forms[1] : forms[0] }),
    previewMs: 3000,
    controls: (bar, live) => {
      select(bar, 'data form', forms, live.state.form, (form) => live.set({ form }));
      toggle(bar, 'restore labels (label option)', live.state.labels, (labels) => live.set({ labels }));
    },
  });
};

export default mount;
