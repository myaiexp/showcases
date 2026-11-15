// Contour and heatmap traces over a z matrix with null gaps, with connectgaps off and on
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const z = [
  [null, null, null, 12, 13, 14, 15, 16],
  [null, 1, null, 11, null, null, null, 17],
  [null, 2, 6, 7, null, null, null, 18],
  [null, 3, null, 8, null, null, null, 19],
  [5, 4, 10, 9, null, null, null, 20],
  [null, null, null, 27, null, null, null, 21],
  [null, null, null, 26, 25, 24, 23, 22],
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });

  // Top row contour, bottom row heatmap with zsmooth 'best'; the right column fills the gaps.
  await Plotly.newPlot(
    stage.div,
    [
      { z, type: 'contour', showscale: false, xaxis: 'x', yaxis: 'y', connectgaps: false },
      { z, type: 'contour', showscale: false, xaxis: 'x2', yaxis: 'y2', connectgaps: true },
      { z, type: 'heatmap', zsmooth: 'best', showscale: false, xaxis: 'x3', yaxis: 'y3', connectgaps: false },
      { z, type: 'heatmap', zsmooth: 'best', showscale: false, connectgaps: true, xaxis: 'x4', yaxis: 'y4' },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Connect the gaps between null values in the z matrix' },
      xaxis: { domain: [0, 0.45], anchor: 'y' },
      yaxis: { domain: [0.55, 1], anchor: 'x' },
      xaxis2: { domain: [0.55, 1], anchor: 'y2' },
      yaxis2: { domain: [0.55, 1], anchor: 'x2' },
      xaxis3: { domain: [0, 0.45], anchor: 'y3' },
      yaxis3: { domain: [0, 0.45], anchor: 'x3' },
      xaxis4: { domain: [0.55, 1], anchor: 'y4' },
      yaxis4: { domain: [0, 0.45], anchor: 'x4' },
    },
    stage.config,
  );

  // Both left panels toggle together with the right ones: connectgaps flips on all four.
  if (stage.bar) {
    toggle(stage.bar, 'connectgaps on the left panels', false, (v) => void restyle(stage.div, { connectgaps: v }, [0, 2]));
  } else {
    stage.every(1500, (i) => void restyle(stage.div, { connectgaps: i % 2 === 1 }, [0, 2]));
  }

  return () => stage.dispose();
};

export default mount;
