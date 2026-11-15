// layout.scattermode group puts markers of one category side by side; scattergap spaces them
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { select, slider } from '../../shared/controls.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const country = ['South Korea', 'China', 'Canada'];

  const trace1: Data = { x: country, y: [24, 10, 9], name: 'Gold', type: 'scatter', mode: 'markers', marker: { size: stage.preview ? 9 : 14 } };
  const trace2: Data = { x: country, y: [13, 15, 12], name: 'Silver', type: 'scatter', mode: 'markers', marker: { size: stage.preview ? 9 : 14 } };
  const trace3: Data = { x: country, y: [11, 8, 12], name: 'Bronze', type: 'scatter', mode: 'markers', marker: { size: stage.preview ? 9 : 14 } };

  await Plotly.newPlot(
    stage.div,
    [trace1, trace2, trace3],
    {
      template: stage.template,
      scattermode: 'group',
      scattergap: 0.2,
      title: stage.preview ? undefined : { text: 'Grouped by Country' },
      xaxis: { title: stage.preview ? undefined : { text: 'Country' } },
      yaxis: { title: stage.preview ? undefined : { text: 'Medals' } },
    },
    stage.config,
  );

  if (stage.bar) {
    select(stage.bar, 'scattermode', ['group', 'overlay'], 'group', (m) => void Plotly.relayout(stage.div, { scattermode: m }));
    slider(stage.bar, 'scattergap', [0, 0.95, 0.05], 0.2, (g) => void Plotly.relayout(stage.div, { scattergap: g }));
  }
  // The card breathes the gap open and shut.
  if (stage.preview) stage.every(120, (i) => {
    void Plotly.relayout(stage.div, { scattergap: 0.1 + 0.8 * (0.5 + 0.5 * Math.sin(i / 8)) });
  });

  return () => stage.dispose();
};

export default mount;
