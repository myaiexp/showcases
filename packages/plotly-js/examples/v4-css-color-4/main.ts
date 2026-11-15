// Bars coloured by CSS Color 4 strings that Plotly's v4 colour parser accepts
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each string from the docs' list of new formats (a few with values changed to fit a dark page).
const COLOURS = [
  'rgba(255 80 80 / 0.6)',
  'hsl(200 90% 60% / 0.8)',
  'hwb(140 10% 20%)',
  'lab(70% 40 59.5)',
  'lch(65% 70 300)',
  'oklab(0.75 0.1 0.1)',
  'oklch(0.7 0.15 180)',
  'color(srgb 1 0.8 0.2)',
  'hsl(0.5turn 60% 50%)',
  '#ff00aaaa',
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const values = COLOURS.map((_, i) => 3 + ((i * 7) % 5));

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'bar',
        orientation: 'h',
        y: COLOURS,
        x: values,
        marker: { color: COLOURS },
        text: stage.preview ? undefined : COLOURS,
        hovertemplate: '%{y}<extra></extra>',
      },
    ],
    {
      template: stage.template,
      yaxis: { autorange: 'reversed', showticklabels: !stage.preview, tickfont: { family: 'monospace' } },
      margin: stage.preview ? { l: 6, r: 6, t: 6, b: 6 } : { l: 190 },
      xaxis: { visible: !stage.preview },
    },
    stage.config,
  );

  // Cards grow the bars in turn with restyle so each colour gets a moment.
  if (stage.preview)
    stage.every(500, (i) => {
      const x = values.map((v, j) => (j === i % COLOURS.length ? v + 2 : v));
      void Plotly.restyle(stage.div, { x: [x] });
    });

  return () => stage.dispose();
};

export default mount;
