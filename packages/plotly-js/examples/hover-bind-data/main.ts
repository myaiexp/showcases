// plotly_hover and plotly_unhover feed a read-out with every hovered point's trace and values
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
      { x, y: normals(51, N), type: 'scatter', name: 'Trial 1', mode: 'markers', marker: { size: 16 } },
      { x, y: normals(52, N), type: 'scatter', name: 'Trial 2', mode: 'markers', marker: { size: 16 } },
    ],
    { template: stage.template, hovermode: 'closest', title: stage.preview ? undefined : { text: 'Hover on Points' } },
    stage.config,
  );

  stage.div.on('plotly_hover', (e) =>
    out.set(asEv(e).points.map((d) => `${d.data.name}: x= ${d.x}, y= ${Number(d.y).toPrecision(3)}`).join('\n')),
  );
  stage.div.on('plotly_unhover', () => out.set(''));

  if (stage.preview) {
    stage.every(800, (i) => Fx.hover(stage.div, [{ curveNumber: i % 2, pointNumber: (i * 3) % N }]));
  }

  return () => stage.dispose();
};

export default mount;
