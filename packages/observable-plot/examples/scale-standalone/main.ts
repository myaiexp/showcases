// Plot.scale builds a standalone color scale; apply reads it
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { readout } from '../../shared/controls.ts';
import { mountPlot } from '../../shared/plot.ts';

const schemes = ['Tableau10', 'Set1', 'Dark2', 'Pastel1', 'Observable10'] as Plot.ColorScheme[];
const fruits = ['apple', 'orange', 'pear'];

const mount: Mount = (el, ctx) => {
  const out = ctx.preview ? null : readout(el);
  const stop = mountPlot(el, ctx, {
    initial: { scheme: 'Tableau10' as Plot.ColorScheme },
    render: ({ scheme }, { width, height }) => {
      const color = Plot.scale({ color: { scheme, domain: fruits } });
      if (out) {
        out.textContent = [
          `color.domain       ${JSON.stringify(color.domain)}`,
          `color.apply("apple") ${color.apply('apple')}`,
          `color.range        ${JSON.stringify(color.range)}`,
        ].join('\n');
      }
      return Plot.cellX(['apple', 'apple', 'orange', 'pear', 'orange']).plot({ width, height, color });
    },
    step: (_s, i) => ({ scheme: schemes[i % schemes.length] }),
    previewMs: 1500,
    controls: (bar, live) => select(bar, 'scheme ', schemes, live.state.scheme, (scheme) => live.set({ scheme })),
  });
  return () => {
    stop();
    out?.remove();
  };
};

export default mount;
