// Every colour string format Plotly.js v4 parses, one bar each
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'bar',
        x: ['named', 'hex', 'hex + alpha', 'rgb', 'rgb / alpha', 'hsl', 'hwb'],
        y: [1, 1, 1, 1, 1, 1, 1],
        marker: {
          color: ['crimson', '#2ca02c', '#1f77b4aa', 'rgb(255 127 14)', 'rgba(148, 103, 189, 0.45)', 'hsl(180, 70%, 40%)', 'hwb(320 10% 20%)'],
          // The docs' #444 border vanishes on a dark page; a light one keeps the translucent bars edged.
          line: { color: '#a6acb8', width: 1 },
        },
      },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Accepted Color String Formats' }, yaxis: { visible: false } },
    stage.config,
  );

  // A card has no pointer, so the colours rotate along the bars.
  if (stage.preview) {
    const base = ['crimson', '#2ca02c', '#1f77b4aa', 'rgb(255 127 14)', 'rgba(148, 103, 189, 0.45)', 'hsl(180, 70%, 40%)', 'hwb(320 10% 20%)'];
    stage.every(500, (i) => void Plotly.restyle(stage.div, { 'marker.color': [base.map((c, k) => (k === i % 7 ? c : base[(k + 1) % 7]!))] }));
  }
  return () => stage.dispose();
};

export default mount;
