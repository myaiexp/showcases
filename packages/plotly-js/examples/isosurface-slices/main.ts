// isosurface.slices cuts the field with planes; the sliders move the z slices
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { toggle, slider } from '../../shared/controls.ts';
import { clebsch } from '../../shared/field3d.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const d = await clebsch(ctx.preview);
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 520 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'isosurface',
        x: d.x,
        y: d.y,
        z: d.z,
        value: d.value,
        isomin: -100,
        isomax: 100,
        surface: { show: true, count: 1, fill: 0.8 },
        slices: { z: { show: true, locations: [-0.3, 0.5] } },
        caps: { x: { show: false }, y: { show: false }, z: { show: false } },
        showscale: !stage.preview,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.86, y: 0.61, z: 0.98 } } } },
    stage.config,
  );

  const move = (a: number, b: number): void => void restyle(stage.div, { 'slices.z.locations': [[a, b]] });
  if (stage.bar) {
    const loc = [-0.3, 0.5];
    slider(stage.bar, 'slices.z.locations[0]', [-1, 1, 0.05], -0.3, (v) => { loc[0] = v; move(loc[0]!, loc[1]!); });
    slider(stage.bar, 'slices.z.locations[1]', [-1, 1, 0.05], 0.5, (v) => { loc[1] = v; move(loc[0]!, loc[1]!); });
    toggle(stage.bar, 'slices.x.show', false, (on) => void restyle(stage.div, { 'slices.x.show': on, 'slices.x.locations': [[0]] }));
    toggle(stage.bar, 'surface.show', true, (on) => void restyle(stage.div, { 'surface.show': on }));
  } else {
    stage.every(110, (i) => move(0.8 * Math.sin(i / 9), 0.8 * Math.sin(i / 9 + 2.4)));
  }
  orbit(stage, { radius: 2.2, height: 1 });
  return () => stage.dispose();
};

export default mount;
