// surface.connectgaps: null cells leave holes, or get bridged when the toggle is on
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { linspace, margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const axis = linspace(-3, 3, 31);
  // Two blocks of cells are null.
  const z = axis.map((y, j) =>
    axis.map((x, i) => {
      const hole = (i > 8 && i < 14 && j > 6 && j < 20) || (i > 19 && i < 25 && j > 14 && j < 25);
      return hole ? null : Math.sin(x * 1.4) * Math.cos(y * 1.4) + 0.15 * x;
    }),
  );

  await Plotly.newPlot(
    stage.div,
    [{ type: 'surface', x: axis, y: axis, z, connectgaps: false, colorscale: 'Viridis', showscale: false }],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.5, y: -1.7, z: 1.2 } } } },
    stage.config,
  );

  if (stage.bar) toggle(stage.bar, 'connectgaps', false, (on) => void restyle(stage.div, { connectgaps: on }));
  else stage.every(1800, (i) => void restyle(stage.div, { connectgaps: i % 2 === 1 }));
  orbit(stage, { radius: 2.6, start: -1 });
  return () => stage.dispose();
};

export default mount;
