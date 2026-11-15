// The shape of a plotly_click payload: event keys, point keys, then the headline fields
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { asEv, output } from '../../shared/events-kit.ts';
import type { Ev } from '../../shared/events-kit.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const out = output(stage, el);
  const x = [1, 2, 3, 4, 5];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [200, 400, 300, 500, 450], type: 'bar', name: 'sales' },
      { x, y: [100, 250, 600, 350, 150], type: 'scatter', mode: 'lines+markers', name: 'costs', marker: { size: 12 } },
    ],
    { template: stage.template, hovermode: 'closest' },
    stage.config,
  );

  const show = (e: Ev): void => {
    const p = e.points[0];
    if (!p) return;
    const lines = [
      stage.preview ? '' : `event keys:  ${Object.keys(e).join(', ')}`,
      stage.preview ? '' : `point keys:  ${Object.keys(p).join(', ')}`,
      `curveNumber ${p.curveNumber}, pointNumber ${p.pointNumber}, x ${p.x}, y ${p.y}`,
    ].filter(Boolean);
    out.set(lines.join('\n'));
  };
  stage.div.on('plotly_click', (e) => show(asEv(e)));

  if (stage.preview) {
    stage.every(900, (i) => show({ points: [{ curveNumber: i % 2, pointNumber: i % 5, x: x[i % 5], y: 100 * (1 + ((i * 3) % 6)), data: {} }] }));
  }

  return () => stage.dispose();
};

export default mount;
