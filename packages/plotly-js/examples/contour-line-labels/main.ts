// Contour lines labelled with their level: showlabels, labelfont and labelformat
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { basicZ } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        z: basicZ,
        type: 'contour',
        contours: {
          coloring: 'heatmap',
          showlabels: true,
          labelfont: { family: 'Inter Variable, sans-serif', size: stage.preview ? 9 : 12, color: 'white' },
        },
      },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Contour with labels' } },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'labelfont.size', [8, 22, 1], 12, (v) => void restyle(stage.div, { 'contours.labelfont.size': v }));
    select(stage.bar, 'labelformat', ['', '.1f', '.0f', '.2e'] as const, '', (v) => void restyle(stage.div, { 'contours.labelformat': v }));
    select(stage.bar, 'coloring', ['heatmap', 'fill', 'lines'] as const, 'heatmap', (v) => void restyle(stage.div, { 'contours.coloring': v }));
  } else {
    stage.every(1200, (i) => void restyle(stage.div, { 'contours.labelformat': ['', '.0f', '.1f'][i % 3] }));
  }

  return () => stage.dispose();
};

export default mount;
