// A plotly_hover handler that calls Fx.hover for the same pointNumber on every trace
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, normals } from '../../shared/events-kit.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const N = 12;

  await Plotly.newPlot(
    stage.div,
    [
      { x: normals(81, N), y: normals(84, N), text: MONTHS, type: 'scatter', name: '2014', hoverinfo: 'text+x+y', mode: 'markers', marker: { color: 'rgba(200, 50, 100, .8)', size: 16 } },
      { x: normals(82, N), y: normals(85, N), text: MONTHS, type: 'scatter', name: '2015', hoverinfo: 'text+x+y', mode: 'markers', marker: { color: 'rgba(160, 90, 220, .8)', size: 16 } },
      { x: normals(83, N), y: normals(86, N), text: MONTHS, type: 'scatter', name: '2016', hoverinfo: 'text+x+y', mode: 'markers', marker: { color: 'rgba(10, 180, 180, .85)', size: 16 } },
    ],
    {
      template: stage.template,
      hovermode: 'closest',
      title: stage.preview ? undefined : { text: 'Display Hover Info for Related Points' },
      xaxis: { zeroline: false, hoverformat: '.2r' },
      yaxis: { zeroline: false, hoverformat: '.2r' },
    },
    stage.config,
  );

  stage.div.on('plotly_hover', (e) => {
    const pointNumber = asEv(e).points[0]?.pointNumber ?? 0;
    Fx.hover(stage.div, [0, 1, 2].map((curveNumber) => ({ curveNumber, pointNumber })));
  });

  // Card: hover trace 0; the handler above does the coupling.
  if (stage.preview) stage.every(1000, (i) => Fx.hover(stage.div, { curveNumber: 0, pointNumber: (i * 5) % N }));

  return () => stage.dispose();
};

export default mount;
