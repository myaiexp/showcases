// layout.clickanywhere: plotly_click on blank space, with data coordinates in xvals and yvals
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv } from '../../shared/events-kit.ts';
import type { Ev } from '../../shared/events-kit.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const layout = {
    template: stage.template,
    hovermode: 'closest',
    clickanywhere: true,
    xaxis: { range: [0, 6] },
    yaxis: { range: [0, 6] },
    annotations: [{ text: 'Click anywhere in the plot area', xref: 'paper', yref: 'paper', x: 0.02, y: 0.98, xanchor: 'left', yanchor: 'top', showarrow: false }],
  } as Partial<Layout>;

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5], y: [2, 4, 3, 5, 4], type: 'scatter', mode: 'markers', marker: { size: 14 } }],
    layout,
    stage.config,
  );

  const clicked = (e: Ev): void => {
    const point = e.points[0];
    // points is empty over blank space: the position is then in xvals and yvals.
    const text = point
      ? `Point: x = ${point.x}, y = ${point.y}`
      : `Empty space: x = ${e.xvals?.[0]?.toFixed(2)}, y = ${e.yvals?.[0]?.toFixed(2)}`;
    void relayout(stage.div, { 'annotations[0].text': text });
  };
  stage.div.on('plotly_click', (e) => clicked(asEv(e)));

  // Cards: alternate a click on a marker with clicks on empty space, handing the
  // handler the payload each would bring.
  if (stage.preview) {
    stage.every(900, (i) => {
      if (i % 3 === 0) clicked({ points: [{ curveNumber: 0, pointNumber: 2, x: 3, y: 3, data: {} }] });
      else clicked({ points: [], xvals: [0.5 + ((i * 1.7) % 5), 0.5], yvals: [0.5 + ((i * 2.3) % 5)] });
    });
  }

  return () => stage.dispose();
};

export default mount;
