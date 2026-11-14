// A threshold color scale: legend "swatches" shows its bins, "ramp" a gradient
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

const KINDS = ['swatches', 'ramp'] as const;

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot<{ legend: (typeof KINDS)[number] }>(el, ctx, {
    initial: { legend: 'swatches' },
    render: ({ legend }, { width, height }) =>
      Plot.plot({
        width,
        height: height && height - 62, // leaves room for the legend in a card
        color: { type: 'threshold', domain: [-0.5, 0, 0.5, 1], scheme: 'BuRd', legend, label: 'Anomaly (°C)' },
        marks: [Plot.ruleY([0]), Plot.dot(gistemp, { x: 'Date', y: 'Anomaly', stroke: 'Anomaly' })],
      }),
    step: ({ legend }) => ({ legend: legend === 'ramp' ? 'swatches' : 'ramp' }),
    previewMs: 2200,
    controls: (bar, live) => {
      select(bar, 'legend', KINDS, live.state.legend, (legend) => live.set({ legend }));
    },
  });
};

export default mount;
