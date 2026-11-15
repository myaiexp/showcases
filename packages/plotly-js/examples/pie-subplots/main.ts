// four pie traces: domain by grid row/column and by explicit x/y, per-slice marker.colors
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { restyle } from '../../shared/basic-util.ts';

// The docs' slice colours include near-black ones; each channel is lifted so they read on dark.
const lift = (rgb: string): string => rgb.replace(/\d+/g, (n) => String(Math.min(255, Number(n) + 70)));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  const allLabels = ['1st', '2nd', '3rd', '4th', '5th'];
  const allValues = [[38, 27, 18, 10, 7], [28, 26, 21, 15, 10], [38, 19, 16, 14, 13], [31, 24, 19, 18, 8]];
  const ultimateColors = [
    ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
    ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
    ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
    ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)'],
  ].map((row) => row.map(lift));

  const data: Data[] = [
    { values: allValues[0], labels: allLabels, type: 'pie', name: 'Starry Night', marker: { colors: ultimateColors[0] }, domain: { row: 0, column: 0 }, hoverinfo: 'label+percent+name', textinfo: 'none' },
    { values: allValues[1], labels: allLabels, type: 'pie', name: 'Sunflowers', marker: { colors: ultimateColors[1] }, domain: { row: 1, column: 0 }, hoverinfo: 'label+percent+name', textinfo: 'none' },
    { values: allValues[2], labels: allLabels, type: 'pie', name: 'Irises', marker: { colors: ultimateColors[2] }, domain: { row: 0, column: 1 }, hoverinfo: 'label+percent+name', textinfo: 'none' },
    { values: allValues[3], labels: allLabels, type: 'pie', name: 'The Night Cafe', marker: { colors: ultimateColors[3] }, domain: { x: [0.52, 1], y: [0, 0.48] }, hoverinfo: 'label+percent+name', textinfo: 'none' },
  ];

  await Plotly.newPlot(stage.div, data, { template: stage.template, grid: { rows: 2, columns: 2 }, showlegend: !stage.preview }, stage.config);

  if (stage.preview) stage.every(60, (i) => void restyle(stage.div, { rotation: [i * 3, -i * 2, i * 5, -i * 4].map((r) => ((r % 360) + 360) % 360) }));

  return () => stage.dispose();
};

export default mount;
