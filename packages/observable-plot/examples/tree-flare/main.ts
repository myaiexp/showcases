// The flare software package hierarchy as a tree, by package or whole
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const flare = await csv('flare.csv');
  const packages = [...new Set(flare.map((d) => String(d.name).split('.')[1]).filter((d): d is string => !!d))].map((d) => `flare.${d}`);
  const choices = ['all', ...packages] as const;
  return mountPlot(el, ctx, {
    // The whole tree is 1800px tall: a card shows one package at a time, in turn.
    initial: { pkg: ctx.preview ? (packages[0] ?? 'all') : 'all' },
    render: ({ pkg }, { width, height }) => {
      const data = pkg === 'all' ? flare : flare.filter((d) => d.name === 'flare' || d.name.startsWith(`${pkg}.`) || d.name === pkg);
      return Plot.plot({
        width,
        height: height ?? (pkg === 'all' ? 1800 : data.length * 8 + 60),
        axis: null,
        margin: 10,
        marginLeft: 30,
        marginRight: 160,
        marks: [Plot.tree(data, { path: 'name', delimiter: '.', textStroke: 'var(--plot-background)' })],
      });
    },
    step: ({ pkg }, i) => ({ pkg: packages[i % packages.length] ?? pkg }),
    previewMs: 2800,
    controls: (bar, live) => {
      select(bar, 'package', choices, live.state.pkg, (pkg) => live.set({ pkg }));
    },
  });
};

export default mount;
