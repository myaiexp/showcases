// boxpoints variants on one dataset: all, none, suspected outliers, outliers
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const y = [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.8, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.9, 22.3, 23.25];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { y, type: 'box', name: 'All Points', jitter: 0.3, pointpos: -1.8, marker: { color: 'rgb(107,174,214)' }, boxpoints: 'all' },
      { y, type: 'box', name: 'Only Whiskers', marker: { color: 'rgb(9,56,125)' }, boxpoints: false },
      {
        y,
        type: 'box',
        name: 'Suspected Outlier',
        marker: { color: 'rgb(8,81,156)', outliercolor: 'rgba(219, 64, 82, 0.6)', line: { outliercolor: 'rgba(219, 64, 82, 1.0)', outlierwidth: 2 } },
        boxpoints: 'suspectedoutliers',
      },
      { y, type: 'box', name: 'Whiskers and Outliers', marker: { color: 'rgb(107,174,214)' }, boxpoints: 'outliers' },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Box Plot Styling Outliers' }, showlegend: !stage.preview },
    stage.config,
  );

  // Cards: a hover label walks the outliers.
  if (stage.preview) {
    stage.every(1100, (i) => Fx.hover(stage.div, { curveNumber: 2 + (i % 2), pointNumber: 22 + (i % 4) }));
  }

  return () => stage.dispose();
};

export default mount;
