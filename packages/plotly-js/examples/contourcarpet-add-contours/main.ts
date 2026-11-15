// A contourcarpet trace on a carpet: z values at carpet points, contoured along the curved grid
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const a = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];
  const b = [4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6];

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'contourcarpet',
        carpet: 'c1',
        a,
        b,
        z: [1, 1.96, 2.56, 3.0625, 4, 5.0625, 1, 7.5625, 9, 12.25, 15.21, 14.0625],
        autocontour: false,
        contours: { start: 1, end: 14, size: 1 },
        line: { width: 2, smoothing: 0 },
        colorbar: { len: 0.4, y: 0.25 },
      },
      {
        type: 'carpet',
        carpet: 'c1',
        a,
        b,
        x: [2, 3, 4, 5, 2.2, 3.1, 4.1, 5.1, 1.5, 2.5, 3.5, 4.5],
        y: [1, 1.4, 1.6, 1.75, 2, 2.5, 2.7, 2.75, 3, 3.5, 3.7, 3.75],
        aaxis: { tickprefix: 'a = ', smoothing: 0, minorgridcount: 9, type: 'linear' },
        baxis: { tickprefix: 'b = ', smoothing: 0, minorgridcount: 9, type: 'linear' },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Cheater plot with 1d input' },
      margin: stage.preview ? undefined : { t: 40, r: 30, b: 30, l: 30 },
      yaxis: { range: [0.388, 4.361] },
      xaxis: { range: [0.667, 5.932] },
    },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'contours.size', [0.5, 4, 0.5], 1, (v) => void restyle(stage.div, { 'contours.size': v }, [0]));
    slider(stage.bar, 'line.smoothing', [0, 1.3, 0.1], 0, (v) => void restyle(stage.div, { 'line.smoothing': v }, [0]));
    select(stage.bar, 'contours.coloring', ['fill', 'lines', 'none'] as const, 'fill', (v) => void restyle(stage.div, { 'contours.coloring': v }, [0]));
  } else {
    stage.every(130, (i) => void restyle(stage.div, { 'line.smoothing': 0.65 + 0.65 * Math.sin(i / 8), 'contours.size': [1, 1, 2][i % 3] }, [0]));
  }

  return () => stage.dispose();
};

export default mount;
