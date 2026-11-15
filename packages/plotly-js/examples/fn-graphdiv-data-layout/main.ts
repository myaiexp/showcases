// newPlot, then graphDiv.data and graphDiv.layout read the figure back
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const graphDiv = stage.div;

  await Plotly.newPlot(
    graphDiv,
    [{ x: [1999, 2000, 2001, 2002], y: [10, 15, 13, 17], type: 'scatter' }],
    {
      template: stage.template,
      title: { text: 'Sales Growth' },
      xaxis: { title: { text: 'Year' }, showgrid: false, zeroline: false },
      yaxis: { title: { text: 'Percent' }, showline: false },
    },
    stage.config,
  );

  if (!stage.preview) {
    // The div keeps what was passed in; the template is left out of the print for brevity.
    const dataRetrievedLater = graphDiv.data;
    const { template: _t, ...layoutRetrievedLater } = graphDiv.layout;
    readout(el).textContent =
      `graphDiv.data = ${JSON.stringify(dataRetrievedLater)}\n` +
      `graphDiv.layout = ${JSON.stringify(layoutRetrievedLater)}`;
  }

  return () => stage.dispose();
};

export default mount;
