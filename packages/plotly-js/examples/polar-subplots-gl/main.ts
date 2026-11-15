// Five polar subplots drawn with scatterpolargl (WebGL), mixing radians, categories and a log radius
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 600 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatterpolargl', r: [1, 2, 3], theta: [50, 100, 200], marker: { symbol: 'square' } },
      { type: 'scatterpolargl', r: [1, 2, 3], theta: [1, 2, 3], thetaunit: 'radians' },
      { type: 'scatterpolargl', r: ['a', 'b', 'c', 'b'], theta: ['D', 'C', 'B', 'A'], subplot: 'polar2' },
      { type: 'scatterpolargl', r: [50, 300, 900], theta: [0, 90, 180], subplot: 'polar3' },
      { type: 'scatterpolargl', mode: 'lines', r: [3, 3, 4, 3], theta: [0, 45, 90, 270], fill: 'toself', subplot: 'polar4' },
    ],
    {
      template: stage.template,
      showlegend: false,
      polar: { domain: { x: [0, 0.46], y: [0.56, 1] }, radialaxis: { range: [1, 4] }, angularaxis: { thetaunit: 'radians' } },
      polar2: { domain: { x: [0, 0.46], y: [0, 0.42] } },
      polar3: { domain: { x: [0.54, 1], y: [0.56, 1] }, radialaxis: { type: 'log', tickangle: 45 }, sector: [0, 180] },
      polar4: { domain: { x: [0.54, 1], y: [0, 0.44] }, radialaxis: { visible: false, range: [0, 6] } },
    },
    stage.config,
  );

  // Each polar subplot has its own sector: the bottom right one sweeps open and closed.
  const sector = (end: number): void => void relayout(stage.div, { 'polar3.sector': [0, end] });
  if (stage.bar) slider(stage.bar, 'polar3.sector end', [30, 360, 10], 180, sector);
  else stage.every(120, (i) => sector(30 + 150 * (1 + Math.sin(i / 10))));

  return () => stage.dispose();
};

export default mount;
