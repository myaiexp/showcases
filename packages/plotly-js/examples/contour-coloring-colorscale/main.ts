// A contour trace's coloring mode and named colorscale, chosen from lists
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { basicZ } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const colorings = ['fill', 'heatmap', 'lines', 'none'] as const;
const scales = ['Viridis', 'Jet', 'Portland', 'Electric', 'Hot', 'Blues', 'Cividis', 'Picnic'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        z: basicZ,
        type: 'contour',
        colorscale: 'Jet',
        contours: { coloring: 'fill' },
        line: { width: 1.5 },
      },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Coloring and colorscale' } },
    stage.config,
  );

  // 'lines' draws only the contour lines, coloured by the colorscale; 'none' leaves them one colour.
  if (stage.bar) {
    select(stage.bar, 'contours.coloring', colorings, 'fill', (v) => void restyle(stage.div, { 'contours.coloring': v }));
    select(stage.bar, 'colorscale', scales, 'Jet', (v) => void restyle(stage.div, { colorscale: v }));
  } else {
    stage.every(1300, (i) => {
      void restyle(stage.div, { colorscale: pick(scales, i), 'contours.coloring': pick(colorings, Math.floor(i / 3)) });
    });
  }

  return () => stage.dispose();
};

export default mount;
