// The hovered point carries its axis objects: l2p turns data values into pixel offsets
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, normals, output } from '../../shared/events-kit.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const N = 16;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = output(stage, el);
  const x = Array.from({ length: N }, (_, i) => i);

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: normals(61, N), type: 'scatter', name: 'Trial 1', mode: 'markers', marker: { size: 16 } },
      { x, y: normals(62, N), type: 'scatter', name: 'Trial 2', mode: 'markers', marker: { size: 16 } },
    ],
    { template: stage.template, hovermode: 'closest', title: stage.preview ? undefined : { text: 'Hover on Points to see<br>Pixel Coordinates' } },
    stage.config,
  );

  stage.div.on('plotly_hover', (raw) => {
    const e = asEv(raw);
    const first = e.points[0];
    if (!first?.xaxis || !first.yaxis) return;
    const { xaxis, yaxis } = first;
    out.set(e.points.map((d) => `width: ${Math.round(xaxis.l2p(Number(d.x)))}, height: ${Math.round(yaxis.l2p(Number(d.y)))}`).join('\n'));
  });
  stage.div.on('plotly_unhover', () => out.set(''));

  if (stage.preview) stage.every(800, (i) => Fx.hover(stage.div, [{ curveNumber: i % 2, pointNumber: (i * 5) % N }]));

  return () => stage.dispose();
};

export default mount;
