// The title channel as native SVG tooltips, or as a tip mark when tip is on
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { csv, thin } from '../../shared/data.ts';
import { mountPlot, sweepPointer } from '../../shared/plot.ts';

const mount: Mount = async (el, ctx) => {
  const all = (await csv('penguins.csv')).filter((d) => d.sex);
  const penguins = ctx.preview ? thin(all, 4) : all;
  const note = ctx.preview ? null : document.createElement('pre');
  if (note) note.className = 'op-readout';
  const stop = mountPlot<{ tip: boolean }>(el, ctx, {
    initial: { tip: false },
    render: ({ tip }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        grid: true,
        marginTop: preview ? 24 : 20,
        title: preview ? (tip ? 'tip: true' : 'title only') : undefined,
        marks: [
          Plot.dot(penguins, {
            x: 'culmen_length_mm',
            y: 'culmen_depth_mm',
            stroke: 'species',
            // title is a channel: a column name, or here a function building the text.
            title: (d) => `${d.species}, ${d.sex.toLowerCase()}\n${d.body_mass_g} g`,
            tip,
          }),
        ],
      }),
    step: ({ tip }) => ({ tip: !tip }),
    previewMs: 3500,
    after: (root, live, size) => {
      if (note) {
        const titles = root.querySelectorAll('circle > title').length;
        note.textContent = live.state.tip
          ? 'tip: true. The tip mark draws the title text; the dots carry no <title> elements.'
          : `${titles} <title> elements, one per dot: the browser shows one when you hold the pointer over a dot.`;
      }
      return size.preview && live.state.tip ? sweepPointer(root, (t) => [0.2 + 0.6 * t, 0.5], 3000) : undefined;
    },
    controls: (bar, live) => {
      toggle(bar, 'tip', live.state.tip, (tip) => live.set({ tip }));
    },
  });
  if (note) el.append(note);
  return () => {
    stop();
    note?.remove();
  };
};

export default mount;
