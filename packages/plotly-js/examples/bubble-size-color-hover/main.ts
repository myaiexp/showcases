// bubble chart: marker.size array, then marker.color and marker.opacity arrays, then hover text
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { toggle } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';

const colors = ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)'];
const text = ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const k = stage.preview ? 0.45 : 1;

  const trace1: Data = {
    x: [1, 2, 3, 4], y: [10, 11, 12, 13], mode: 'markers',
    text, hoverinfo: 'text',
    marker: { size: [40, 60, 80, 100].map((s) => s * k), color: colors, opacity: [1, 0.8, 0.6, 0.4] },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Bubble Chart Hover Text' }, showlegend: false, xaxis: { range: [0, 5] }, yaxis: { range: [9, 14] } },
    stage.config,
  );

  if (stage.bar) {
    toggle(stage.bar, 'marker.color array', true, (on) => void restyle(stage.div, { 'marker.color': on ? [colors] : null }));
    toggle(stage.bar, 'marker.opacity array', true, (on) => void restyle(stage.div, { 'marker.opacity': on ? [[1, 0.8, 0.6, 0.4]] : 1 }));
    toggle(stage.bar, 'hover text', true, (on) => void restyle(stage.div, { hoverinfo: on ? 'text' : 'x+y' }));
  }
  if (stage.preview) stage.every(900, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: i % 4 }));

  return () => stage.dispose();
};

export default mount;
