// config.staticPlot: an image of a chart, with no hover, no zoom, no mode bar
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const size = [20, 40, 25, 10, 60, 90, 30];
  const draw = (staticPlot: boolean): Promise<unknown> =>
    Plotly.newPlot(
      stage.div,
      [{ x: [0, 1, 2, 3, 4, 5, 6], y: [1, 9, 4, 7, 5, 2, 4], mode: 'markers', marker: { size, color: '#a3e635' } }],
      { template: stage.template, title: { text: stage.preview ? '' : staticPlot ? 'A static chart: hover and drag do nothing' : 'The same chart, interactive' }, showlegend: false },
      { ...stage.config, staticPlot },
    );
  await draw(true);

  if (stage.bar) toggle(stage.bar, 'staticPlot', true, (v) => void draw(v));
  if (stage.preview) {
    stage.every(800, (i) => void Plotly.restyle(stage.div, { 'marker.size': [size.map((s, k) => s * (0.75 + 0.25 * Math.sin(i / 2 + k)))] }));
  }
  return () => stage.dispose();
};

export default mount;
