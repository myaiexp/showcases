// scene.aspectmode: how a 3D scene's box relates to the data's ranges
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['cube', 'data', 'auto', 'manual'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(21);
  // Ranges 4, 3 and 5 on purpose: they only show up in the box under 'data' or 'manual'.
  await Plotly.newPlot(
    stage.div,
    [{ type: 'mesh3d', x: randoms(r, 20, 4), y: randoms(r, 20, 3), z: randoms(r, 20, 5), opacity: 0.5, color: '#60a5fa', flatshading: true }],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: { aspectmode: 'cube', aspectratio: { x: 1, y: 1, z: 2 }, camera: { eye: { x: 1.7, y: 1.5, z: 0.9 } } },
    },
    stage.config,
  );

  const set = (mode: Mode): void => void Plotly.relayout(stage.div, { 'scene.aspectmode': mode });
  if (stage.bar) {
    select(stage.bar, 'scene.aspectmode', MODES, 'cube', set);
    slider(stage.bar, 'manual aspectratio z', [0.5, 4, 0.1], 2, (v) => void Plotly.relayout(stage.div, { 'scene.aspectratio.z': v }));
  } else {
    stage.every(1500, (i) => {
      const a = i * 0.25;
      void Plotly.relayout(stage.div, { 'scene.aspectmode': MODES[i % 4], 'scene.camera.eye': { x: 1.9 * Math.cos(a), y: 1.9 * Math.sin(a), z: 0.9 } });
    });
  }
  return () => stage.dispose();
};

export default mount;
