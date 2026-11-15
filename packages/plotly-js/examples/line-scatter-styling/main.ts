// scatter marker.color / marker.size and line.color / line.width
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';
import { restyle } from '../../shared/basic-util.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  const trace1: Data = { x: [1, 2, 3, 4], y: [10, 15, 13, 17], mode: 'markers', marker: { color: 'rgb(219, 64, 82)', size: 12 } };
  const trace2: Data = { x: [2, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', line: { color: 'rgb(55, 128, 191)', width: 3 } };
  const trace3: Data = {
    x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers',
    marker: { color: 'rgb(128, 0, 128)', size: 8 }, line: { color: 'rgb(128, 0, 128)', width: 1 },
  };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3],
    { template: stage.template, title: stage.preview ? undefined : { text: 'Line and Scatter Styling' }, showlegend: !stage.preview },
    stage.config,
  );

  if (stage.bar) {
    slider(stage.bar, 'Red marker size', [2, 30, 1], 12, (s) => void restyle(stage.div, { 'marker.size': s }, [0]));
    slider(stage.bar, 'Blue line width', [0.5, 12, 0.5], 3, (w) => void restyle(stage.div, { 'line.width': w }, [1]));
    slider(stage.bar, 'Purple line width', [0.5, 12, 0.5], 1, (w) => void restyle(stage.div, { 'line.width': w }, [2]));
    slider(stage.bar, 'Purple marker size', [2, 30, 1], 8, (s) => void restyle(stage.div, { 'marker.size': s }, [2]));
  }
  if (stage.preview) stage.every(100, (i) => {
    const t = Math.sin(i / 7);
    void restyle(stage.div, { 'marker.size': 12 + 6 * t }, [0]);
    void restyle(stage.div, { 'line.width': 3 + 2.5 * t }, [1]);
    void restyle(stage.div, { 'line.width': 3.5 - 2.5 * t }, [2]);
  });

  return () => stage.dispose();
};

export default mount;
