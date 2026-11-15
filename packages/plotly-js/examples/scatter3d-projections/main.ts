// scatter3d.projection draws a shadow of the line on each wall of the scene
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const t = linspace(0, 4 * Math.PI, 160);
  const proj = (show: boolean) => ({ show, opacity: 0.6, scale: 0.6 });

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatter3d',
        mode: 'lines+markers',
        x: t.map((v) => Math.cos(v) * (1 + v / 12)),
        y: t.map((v) => Math.sin(v) * (1 + v / 12)),
        z: t.map((v) => v / 4),
        line: { width: 5, color: t, colorscale: 'Portland' },
        marker: { size: 2.5, color: t, colorscale: 'Portland' },
        projection: { x: proj(true), y: proj(true), z: proj(true) },
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.7, y: 1.5, z: 0.9 } } } },
    stage.config,
  );

  if (stage.bar) {
    for (const axis of ['x', 'y', 'z']) {
      toggle(stage.bar, `projection.${axis}`, true, (on) => void restyle(stage.div, { [`projection.${axis}.show`]: on }));
    }
  } else {
    stage.every(1400, (i) => {
      const axis = 'xyz'[i % 3]!;
      void restyle(stage.div, { [`projection.${axis}.show`]: i % 6 < 3 });
    });
  }
  orbit(stage, { radius: 2.4 });
  return () => stage.dispose();
};

export default mount;
