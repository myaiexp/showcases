// surface.contours highlight: the contour line a 3D surface draws under the pointer
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#41a7b3', '#f59e0b', '#f472b6', '#a3e635'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'surface',
        opacity: 0.9,
        x: [10, 20, 30, 40],
        y: [0, 1, 2, 3],
        z: [[2, 2, 2, 3], [1, 1, 1, 1], [1, 1, 0, 0], [0, 0, 0, 0]],
        showscale: false,
        contours: { x: { highlight: true, highlightcolor: '#41a7b3' }, y: { highlight: false }, z: { highlight: false } },
      },
    ],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      // Spike lines are switched off so only the surface's own highlight shows.
      scene: { xaxis: { showspikes: false }, yaxis: { showspikes: false }, zaxis: { showspikes: false }, camera: { eye: { x: 1.7, y: 1.5, z: 0.9 } } },
    },
    stage.config,
  );

  if (stage.bar) {
    for (const a of ['x', 'y', 'z']) toggle(stage.bar, `contours.${a}.highlight`, a === 'x', (v) => void Plotly.restyle(stage.div, { [`contours.${a}.highlight`]: v }));
    select(stage.bar, 'highlightcolor (x)', COLORS, COLORS[0], (v) => void Plotly.restyle(stage.div, { 'contours.x.highlightcolor': v }));
  } else {
    stage.every(120, (i) => void Plotly.relayout(stage.div, { 'scene.camera.eye': { x: 2.2 * Math.cos(i / 25 + 0.6), y: 2.2 * Math.sin(i / 25 + 0.6), z: 0.9 } }));
  }
  return () => stage.dispose();
};

export default mount;
