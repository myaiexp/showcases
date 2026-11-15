// Several isosurfaces with caps; surface.pattern and surface.count change which triangles draw
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { clebsch } from '../../shared/field3d.ts';
import { margin3d, orbit } from '../../shared/scene3d.ts';
import { createStage } from '../../shared/stage.ts';

const PATTERNS = ['odd', 'even', 'all', 'A', 'B', 'C', 'D', 'E', 'A+B', 'C+D'] as const;

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
        isomin: -10,
        isomax: 10,
        surface: { show: true, count: 4, fill: 1, pattern: 'odd' },
        caps: { x: { show: true }, y: { show: true }, z: { show: true } },
        showscale: false,
      },
    ],
    { template: stage.template, margin: margin3d(stage), scene: { camera: { eye: { x: 1.86, y: 0.61, z: 0.98 } } } },
    stage.config,
  );

  const pattern = (p: string): void => void restyle(stage.div, { 'surface.pattern': p });
  if (stage.bar) {
    select(stage.bar, 'surface.pattern', PATTERNS, 'odd', pattern);
    slider(stage.bar, 'surface.count', [1, 8, 1], 4, (v) => void restyle(stage.div, { 'surface.count': v }));
    slider(stage.bar, 'surface.fill', [0, 1, 0.05], 1, (v) => void restyle(stage.div, { 'surface.fill': v }));
    for (const axis of ['x', 'y', 'z']) toggle(stage.bar, `caps.${axis}.show`, true, (on) => void restyle(stage.div, { [`caps.${axis}.show`]: on }));
  } else {
    stage.every(1500, (i) => pattern(PATTERNS[i % PATTERNS.length]!));
  }
  orbit(stage, { radius: 2.2, height: 0.98, start: 0.3 });
  return () => stage.dispose();
};

export default mount;
