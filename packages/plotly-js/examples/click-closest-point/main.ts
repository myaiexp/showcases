// plotly_click reports the closest point's coordinates (toPrecision, as the docs do)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, fakeEv, normals, output } from '../../shared/events-kit.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const N = 16;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = output(stage, el);

  await Plotly.newPlot(
    stage.div,
    [{ x: Array.from({ length: N }, (_, i) => i), y: normals(31, N), type: 'scatter', mode: 'markers', marker: { size: 16, color: Array.from({ length: N }, () => '#60a5fa') } }],
    { template: stage.template, hovermode: 'closest', title: stage.preview ? undefined : { text: 'Click on Points' } },
    stage.config,
  );

  const clicked = (data: ReturnType<typeof asEv>): void => {
    // The docs loop over data.points and keep the last; with hovermode closest there is one.
    const p = data.points[data.points.length - 1];
    if (!p) return;
    out.set(`Closest point clicked:\nx = ${p.x}\ny = ${Number(p.y).toPrecision(4)}`);
    void restyle(stage.div, { 'marker.color': [Array.from({ length: N }, (_, i) => (i === p.pointNumber ? '#f59e0b' : '#60a5fa'))] });
  };
  stage.div.on('plotly_click', (e) => clicked(asEv(e)));

  // Cards: the handler receives a payload built from the graph's own x and y.
  if (stage.preview) stage.every(800, (i) => clicked(fakeEv(stage.div, [[0, (i * 5) % N]])));

  return () => stage.dispose();
};

export default mount;
