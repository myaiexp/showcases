// A scatterternary trace of eleven points on journalist, developer and designer axes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const raw = [
  { journalist: 75, developer: 25, designer: 0, label: 'point 1' },
  { journalist: 70, developer: 10, designer: 20, label: 'point 2' },
  { journalist: 75, developer: 20, designer: 5, label: 'point 3' },
  { journalist: 5, developer: 60, designer: 35, label: 'point 4' },
  { journalist: 10, developer: 80, designer: 10, label: 'point 5' },
  { journalist: 10, developer: 90, designer: 0, label: 'point 6' },
  { journalist: 20, developer: 70, designer: 10, label: 'point 7' },
  { journalist: 10, developer: 20, designer: 70, label: 'point 8' },
  { journalist: 15, developer: 5, designer: 80, label: 'point 9' },
  { journalist: 10, developer: 10, designer: 80, label: 'point 10' },
  { journalist: 20, developer: 10, designer: 70, label: 'point 11' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });

  const axis = (title: string, tickangle: number, size: number) => ({
    title: { text: title, font: { size } },
    tickangle,
    tickfont: { size: stage.preview ? 8 : 15 },
    ticklen: 5,
    showline: true,
    showgrid: true,
  });
  const size = stage.preview ? 11 : 20;

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatterternary',
        mode: 'markers',
        a: raw.map((d) => d.journalist),
        b: raw.map((d) => d.developer),
        c: raw.map((d) => d.designer),
        text: raw.map((d) => d.label),
        marker: { symbol: 100, color: '#DB7365', size: stage.preview ? 9 : 14, line: { width: 2 } },
      },
    ],
    {
      template: stage.template,
      // The docs' sum: 100 makes the three values read as percentages.
      ternary: { sum: 100, aaxis: axis('Journalist', 0, size), baxis: axis('<br>Developer', 45, size), caxis: axis('<br>Designer', -45, size) },
    },
    stage.config,
  );

  // Card: the points take turns growing.
  if (stage.preview) {
    stage.every(300, (i) => {
      const sizes = raw.map((_, k) => (k === i % raw.length ? 18 : 9));
      void Plotly.restyle(stage.div, { 'marker.size': [sizes] } as never, [0]).catch(() => {});
    });
  }

  return () => stage.dispose();
};

export default mount;
