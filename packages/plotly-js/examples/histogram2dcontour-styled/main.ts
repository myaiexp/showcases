// Contour labels (showlabels, labelfont) and a restyled hover label
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(47);

  await Plotly.newPlot(
    stage.div,
    [
      {
        x: uniform(rand, 500),
        y: uniform(rand, 500, 1, 1),
        colorscale: 'Blues',
        type: 'histogram2dcontour',
        contours: { showlabels: true, labelfont: { family: 'Raleway', color: 'white' } },
        hoverlabel: { bgcolor: 'white', bordercolor: 'black', font: { family: 'Raleway', color: 'black' } },
      },
    ],
    { template: stage.template },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'contours.showlabels', true, (v) => void Plotly.restyle(stage.div, { 'contours.showlabels': v }));
  else {
    const spots = [{ xval: 0.3, yval: 1.3 }, { xval: 0.6, yval: 1.6 }, { xval: 0.8, yval: 1.2 }];
    stage.every(1200, (i) => Fx.hover(stage.div, spots[i % spots.length] ?? spots[0]!));
  }

  return () => stage.dispose();
};

export default mount;
