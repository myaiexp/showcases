// plotly_afterplot fires after every draw: a counter overlay counts them
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { normals } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  stage.div.style.position = 'relative';
  const count = document.createElement('div');
  count.style.cssText = 'position:absolute;right:12px;top:8px;font:600 13px ui-monospace,monospace;color:#f59e0b;pointer-events:none';
  stage.div.append(count);
  let plots = 0;

  // newPlot returns a promise as well: the docs show .then(postPlotHandler) as a one-off alternative.
  await Plotly.newPlot(
    stage.div,
    [{ x: Array.from({ length: 20 }, (_, i) => i), y: normals(5, 20), type: 'scatter', mode: 'markers', marker: { size: 14 } }],
    { template: stage.template },
    stage.config,
  );

  stage.div.on('plotly_afterplot', () => {
    plots += 1;
    count.textContent = `plotly_afterplot x ${plots}`;
  });
  count.textContent = 'plotly_afterplot x 0';

  const nudge = (i: number): void => void relayout(stage.div, { 'xaxis.range': [i % 2 ? 4 : 0, i % 2 ? 15 : 20] });
  if (stage.preview) stage.every(900, nudge);
  if (stage.bar) {
    let i = 0;
    button(stage.bar, 'Zoom in / out', () => nudge(++i));
    button(stage.bar, 'Recolour', () => void Plotly.restyle(stage.div, { 'marker.color': i++ % 2 ? '#60a5fa' : '#f472b6' }));
  }

  return () => stage.dispose();
};

export default mount;
