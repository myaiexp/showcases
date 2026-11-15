// xaxis.hoverformat and yaxis.hoverformat: d3 number formats for hover values
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';

const FORMATS = ['.2f', '.2r', '.0f', '.4f', ',.1e', '$.2f'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const normal = gauss(rng(8));
  const N = 40;
  const x = Array.from({ length: N }, normal);
  const y1 = Array.from({ length: N }, normal);
  const y2 = Array.from({ length: N }, normal);

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: y1, type: 'scatter', mode: 'markers', marker: { color: 'rgba(200, 50, 100, .7)', size: 16 }, hoverinfo: 'x+y' },
      { x, y: y2, type: 'scatter', mode: 'markers', marker: { color: 'rgba(10, 180, 180, .8)', size: 16 }, hoverinfo: 'x+y' },
    ],
    {
      template: stage.template,
      hovermode: 'closest',
      showlegend: false,
      title: { text: stage.preview ? '' : 'Formatting X & Y Hover Values' },
      xaxis: { zeroline: false, hoverformat: '.2f', title: { text: stage.preview ? '' : 'Rounded: 2 values after the decimal point on hover' } },
      yaxis: { zeroline: false, hoverformat: '.2r', title: { text: stage.preview ? '' : 'Rounded: 2 significant values on hover' } },
    },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'xaxis.hoverformat', FORMATS, '.2f', (v) => void relayout(stage.div, { 'xaxis.hoverformat': v }));
    select(stage.bar, 'yaxis.hoverformat', FORMATS, '.2r', (v) => void relayout(stage.div, { 'yaxis.hoverformat': v }));
  }
  if (stage.preview) {
    stage.every(1100, (i) => {
      void relayout(stage.div, { 'xaxis.hoverformat': FORMATS[i % FORMATS.length], 'yaxis.hoverformat': FORMATS[(i + 1) % FORMATS.length] });
      Fx.hover(stage.div, { curveNumber: i % 2, pointNumber: (i * 7) % N });
    });
  }
  return () => stage.dispose();
};

export default mount;
