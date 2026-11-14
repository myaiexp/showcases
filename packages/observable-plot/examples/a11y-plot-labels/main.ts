// The plot-level ariaLabel and ariaDescription options, read back from the svg
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { csv } from '../../shared/data.ts';
import { ariaReadout, textField } from '../../shared/a11y-readout.ts';
import { mountPlot } from '../../shared/plot.ts';

const PRESETS = [
  { label: 'Penguin bills', description: 'Scatterplot of bill length against bill depth for three species.' },
  { label: 'Three clusters', description: 'Adelie, Chinstrap and Gentoo penguins form three loose groups.' },
  { label: '', description: '' },
];

const mount: Mount = async (el, ctx) => {
  const penguins = await csv('penguins.csv');
  const readout = ariaReadout(el, ctx.preview);
  const stop = mountPlot<{ label: string; description: string }>(el, ctx, {
    initial: PRESETS[0] as (typeof PRESETS)[number],
    render: ({ label, description }, { width, height, preview }) =>
      Plot.plot({
        width,
        height,
        marginTop: preview ? 40 : 20,
        // An empty field falls back to null, the default, so no attribute is written.
        ariaLabel: label || null,
        ariaDescription: description || null,
        // In a card the label is also drawn, so the cycling states are visible.
        title: preview ? label || '(ariaLabel: null)' : undefined,
        grid: true,
        color: { legend: !preview },
        marks: [Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm', stroke: 'species' })],
      }),
    step: (_s, i) => PRESETS[i % PRESETS.length] as (typeof PRESETS)[number],
    previewMs: 2000,
    after: (root) => readout.update(root),
    controls: (bar, live) => {
      textField(bar, 'ariaLabel', live.state.label, (label) => live.set({ label }));
      textField(bar, 'ariaDescription', live.state.description, (description) => live.set({ description }));
    },
  });
  return () => {
    stop();
    readout.remove();
  };
};

export default mount;
