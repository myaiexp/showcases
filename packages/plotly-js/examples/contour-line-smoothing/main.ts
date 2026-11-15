// Two contour traces side by side, line.smoothing 0 against a slider-set value
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const z = [
  [2, 4, 7, 12, 13, 14, 15, 16],
  [3, 1, 6, 11, 12, 13, 16, 17],
  [4, 2, 7, 7, 11, 14, 17, 18],
  [5, 3, 8, 8, 13, 15, 18, 19],
  [7, 4, 10, 9, 16, 18, 20, 19],
  [9, 10, 5, 27, 23, 21, 21, 21],
  [11, 14, 17, 26, 25, 24, 23, 22],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      { z, type: 'contour', line: { smoothing: 0 }, showscale: false, xaxis: 'x', yaxis: 'y' },
      { z, type: 'contour', line: { smoothing: 0.85 }, showscale: !stage.preview, xaxis: 'x2', yaxis: 'y2' },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Smoothing contour lines' },
      xaxis: { domain: [0, 0.45], anchor: 'y' },
      yaxis: { domain: [0, 1], anchor: 'x' },
      xaxis2: { domain: [0.55, 1], anchor: 'y2' },
      yaxis2: { domain: [0, 1], anchor: 'x2' },
    },
    stage.config,
  );

  // line.smoothing runs from 0 (straight segments) to 1.3.
  const set = (v: number): void => void restyle(stage.div, { 'line.smoothing': v }, [1]);
  if (stage.bar) slider(stage.bar, 'right panel line.smoothing', [0, 1.3, 0.05], 0.85, set);
  else stage.every(120, (i) => set(0.65 + 0.65 * Math.sin(i / 8)));

  return () => stage.dispose();
};

export default mount;
