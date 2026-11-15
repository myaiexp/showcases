// A wind field of arrows coloured by speed, swirling over a time-varying vector field
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const nx = 18;
const ny = 11;

/** A prevailing westerly with two drifting vortices, sampled on the grid at time t. */
function field(t: number): { u: number[]; v: number[]; speed: number[] } {
  const u: number[] = [];
  const v: number[] = [];
  const speed: number[] = [];
  const vortices = [
    { x: 5 + 2 * Math.sin(t / 3), y: 5, g: 6 },
    { x: 12 + 2 * Math.cos(t / 4), y: 4 + Math.sin(t / 5), g: -5 },
  ];
  for (let j = 0; j < ny; j += 1) {
    for (let i = 0; i < nx; i += 1) {
      let uu = 1.2 + 0.05 * j;
      let vv = 0.2 * Math.sin(i / 3 + t / 4);
      for (const w of vortices) {
        const dx = i - w.x;
        const dy = j - w.y;
        const r2 = dx * dx + dy * dy + 1.5;
        uu += (-w.g * dy) / r2;
        vv += (w.g * dx) / r2;
      }
      u.push(uu);
      v.push(vv);
      speed.push(Math.hypot(uu, vv));
    }
  }
  return { u, v, speed };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const x: number[] = [];
  const y: number[] = [];
  for (let j = 0; j < ny; j += 1) {
    for (let i = 0; i < nx; i += 1) {
      x.push(i);
      y.push(j);
    }
  }
  const f0 = field(0);

  await Plotly.newPlot(
    stage.div,
    [{ type: 'quiver', x, y, u: f0.u, v: f0.v, anchor: 'center', marker: { color: f0.speed, colorscale: 'Turbo', cmin: 0, cmax: 3.5, showscale: !stage.preview, colorbar: { title: { text: 'speed' } }, line: { width: 2 } } }],
    { template: stage.template, xaxis: { visible: !stage.preview, range: [-1, nx] }, yaxis: { visible: !stage.preview, range: [-1, ny], scaleanchor: 'x' } },
    stage.config,
  );

  // Live data, so it runs in the full view too: each tick sends new u, v and colours.
  stage.every(120, (i) => {
    const f = field(i * 0.25);
    void restyle(stage.div, { u: [f.u], v: [f.v], 'marker.color': [f.speed] }, [0]);
  });

  return () => stage.dispose();
};

export default mount;
