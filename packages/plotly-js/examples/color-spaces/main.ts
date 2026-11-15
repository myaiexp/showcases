// CSS Color 4 spaces in Plotly.js v4: lab, lch, oklab, oklch, color(), hue units and none
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const SAMPLES: [string, string][] = [
  ['lab()', 'lab(50% 40 59.5)'],
  ['lch()', 'lch(50% 70 40)'],
  ['oklab()', 'oklab(0.5 0.1 0.1)'],
  ['oklch()', 'oklch(0.7 0.15 180)'],
  ['color(srgb)', 'color(srgb 1 0 0)'],
  ['color(display-p3)', 'color(display-p3 0 1 0)'],
  ['color(rec2020)', 'color(rec2020 0 0 1)'],
  ['hsl deg', 'hsl(0deg 100% 50%)'],
  ['hsl turn', 'hsl(0.5turn 60% 40%)'],
  ['hsl rad', 'hsl(3.14rad 60% 40%)'],
  ['hsl grad', 'hsl(200grad 60% 40%)'],
  ['hsl none', 'hsl(none 60% 40%)'],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'bar',
        orientation: 'h',
        y: SAMPLES.map((s) => s[0]),
        x: SAMPLES.map(() => 1),
        text: SAMPLES.map((s) => s[1]),
        textposition: 'inside',
        insidetextanchor: 'start',
        hovertemplate: '%{text}<extra></extra>',
        marker: { color: SAMPLES.map((s) => s[1]) },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Wide-gamut spaces are clipped into sRGB before they are drawn' },
      xaxis: { visible: false },
      yaxis: { autorange: 'reversed', showticklabels: !stage.preview },
      margin: stage.preview ? { l: 8, r: 8, t: 8, b: 8 } : { l: 130, r: 28, t: 56, b: 24 },
      bargap: 0.12,
    },
    stage.config,
  );
  if (stage.preview) stage.every(900, (i) => void Plotly.restyle(stage.div, { 'marker.line.width': [SAMPLES.map((_, k) => (k === i % SAMPLES.length ? 3 : 0))], 'marker.line.color': '#e6e8ee' } as unknown as Plotly.DataUpdate));
  return () => stage.dispose();
};

export default mount;
