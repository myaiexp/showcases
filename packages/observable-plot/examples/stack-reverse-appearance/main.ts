// Appearance order with reverse: layers enter from the bottom, not the top
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const riaa = await csv('riaa-us-revenue.csv');
  return mountPlot<{ reverse: boolean }>(el, ctx, {
    initial: { reverse: true },
    render: ({ reverse }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        y: { grid: true, label: 'Annual revenue (billions, adj.)', transform: (d: number) => d / 1000 },
        color: { legend: !preview },
        marks: [
          Plot.areaY(riaa, Plot.stackY({ order: 'appearance', reverse }, { x: 'year', y: 'revenue', z: 'format', fill: 'group' })),
          Plot.ruleY([0]),
        ],
      }),
    step: ({ reverse }) => ({ reverse: !reverse }),
    previewMs: 3000,
    controls: (bar, live) => {
      toggle(bar, 'reverse', live.state.reverse, (reverse) => live.set({ reverse }));
    },
  });
};

export default mount;
