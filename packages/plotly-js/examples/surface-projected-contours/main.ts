// surface.contours: coloured contour lines on the surface and projected onto the walls
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpack } from '../../shared/data.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle } from '../../shared/controls.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('api_docs/mt_bruno_elevation.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 540 });
  const z: string[][] = [];
  for (let i = 0; i < 24; i++) z.push(unpack(rows, String(i)));

  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'surface',
        z,
        showscale: false,
        contours: { z: { show: true, usecolormap: true, highlightcolor: '#42f462', project: { z: true } } },
      },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Mt Bruno Elevation With Projected Contours' },
      margin: margin3d(stage, { l: 0, r: 0, t: 50, b: 0 }),
      scene: { camera: { eye: { x: 1.87, y: 0.88, z: -0.64 } } },
    },
    stage.config,
  );

  if (stage.bar) {
    const bar = stage.bar;
    for (const axis of ['x', 'y', 'z']) {
      toggle(bar, `contours.${axis}.show`, axis === 'z', (on) => void restyle(stage.div, { [`contours.${axis}.show`]: on }));
    }
    toggle(bar, 'contours.z.project.z', true, (on) => void restyle(stage.div, { 'contours.z.project.z': on }));
    toggle(bar, 'contours.z.usecolormap', true, (on) => void restyle(stage.div, { 'contours.z.usecolormap': on }));
  } else {
    stage.every(1600, (i) => void restyle(stage.div, { 'contours.z.project.z': i % 2 === 0, 'contours.x.show': i % 4 >= 2 }));
  }
  orbit(stage, { radius: 2.2, height: 0.3, start: 0.5 });
  return () => stage.dispose();
};

export default mount;
