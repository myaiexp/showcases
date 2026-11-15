// Arrows of a shear flow coloured by speed through marker.color and a colorscale
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const scales = ['Viridis', 'Plasma', 'Turbo', 'RdBu', 'Cividis'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const x: number[] = [];
  const y: number[] = [];
  const u: number[] = [];
  const v: number[] = [];
  const speed: number[] = [];
  // Horizontal velocity grows with y, with a small vertical wobble.
  for (let i = 0; i <= 8; i += 1) {
    for (let j = 0; j <= 6; j += 1) {
      const ui = 0.2 + 0.25 * j;
      const vi = 0.4 * Math.sin(i / 2);
      x.push(i);
      y.push(j);
      u.push(ui);
      v.push(vi);
      speed.push(Math.hypot(ui, vi));
    }
  }

  await Plotly.newPlot(
    stage.div,
    [{ type: 'quiver', x, y, u, v, marker: { color: speed, colorscale: 'Viridis', showscale: !stage.preview, colorbar: { title: { text: 'speed' } }, line: { width: stage.preview ? 1.5 : 2 } } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Shear flow, arrows coloured by speed' }, xaxis: { title: { text: 'x' } }, yaxis: { title: { text: 'y' } } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'marker.colorscale', scales, 'Viridis', (s) => void restyle(stage.div, { 'marker.colorscale': s }));
  else stage.every(1200, (i) => void restyle(stage.div, { 'marker.colorscale': pick(scales, i) }));

  return () => stage.dispose();
};

export default mount;
