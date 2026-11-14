// The mark option: the same AAPL data drawn as dot, line, area, rule or bar
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const marks = ['dot', 'line', 'area', 'rule', 'bar'] as const;
type MarkName = (typeof marks)[number];

const mount: Mount = async (el, ctx) => {
  const aapl = (await csv('aapl.csv')).slice(-250);
  return mountPlot(el, ctx, {
    initial: { mark: 'dot' as MarkName },
    render: ({ mark }, { width, height }) => Plot.auto(aapl, { x: 'Date', y: 'Close', mark }).plot({ width, height }),
    step: (_s, i) => ({ mark: marks[i % marks.length] }),
    previewMs: 2000,
    controls: (bar, live) => select(bar, 'mark', marks, live.state.mark, (mark) => live.set({ mark })),
  });
};

export default mount;
