// plotly_click bound with div.on: a handler that counts clicks and swells the marker
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, output } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = output(stage, el);
  let clicks = 0;

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5], y: [10, 20, 30, 20, 10], type: 'scatter', mode: 'markers', marker: { size: 20 } }],
    { template: stage.template, hovermode: 'closest', yaxis: { range: [0, 40] }, title: stage.preview ? undefined : { text: 'Click on Points' } },
    stage.config,
  );

  const clicked = (pointNumber: number): void => {
    clicks += 1;
    out.set(`plotly_click fired ${clicks} time${clicks === 1 ? '' : 's'}`);
    void restyle(stage.div, { 'marker.size': [[0, 1, 2, 3, 4].map((i) => (i === pointNumber ? 34 : 20))] });
  };
  stage.div.on('plotly_click', (e) => clicked(asEv(e).points[0]?.pointNumber ?? 0));

  // Cards have no pointer: the same handler runs with the point number a click would carry.
  if (stage.preview) stage.every(800, (i) => clicked(i % 5));

  return () => stage.dispose();
};

export default mount;
