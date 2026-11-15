// extendTraces with x and y for two traces that live on different axes
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { x: [], y: [], mode: 'lines', line: { color: '#80CAF6', shape: 'spline' } },
      { x: [], y: [], xaxis: 'x2', yaxis: 'y2', mode: 'lines', line: { color: '#DF56F1' } },
    ],
    {
      template: stage.template,
      showlegend: false,
      xaxis: { type: 'date', domain: [0, 1], showticklabels: false },
      yaxis: { domain: [0.6, 1], range: [0, 1] },
      xaxis2: { type: 'date', anchor: 'y2', domain: [0, 1] },
      yaxis2: { anchor: 'x2', domain: [0, 0.4], range: [0, 1] },
    } as unknown as Partial<Layout>,
    stage.config,
  );

  stage.every(stage.preview ? 400 : 1000, () => {
    const time = new Date();
    void Plotly.extendTraces(stage.div, { x: [[time], [time]], y: [[Math.random()], [Math.random()]] }, [0, 1], 60).catch(() => {});
  });

  return () => stage.dispose();
};

export default mount;
