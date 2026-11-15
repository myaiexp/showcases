// scene axis backgrounds: tinted walls, grid and zero-line colours on the three planes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

// The docs' pastel walls with white grids, darkened one step so they sit on a dark page.
const WALLS = { xaxis: 'rgb(70, 70, 120)', yaxis: 'rgb(110, 70, 120)', zaxis: 'rgb(110, 110, 70)' } as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(13);
  const cloud = (n: number, mul: number, opacity: number): Plotly.Data => ({
    type: 'scatter3d', mode: 'markers', opacity, marker: { size: 3 }, x: randoms(r, n, mul), y: randoms(r, n, mul), z: randoms(r, n, mul),
  });
  const axis = (key: keyof typeof WALLS, on: boolean): object => ({
    backgroundcolor: WALLS[key],
    showbackground: on,
    gridcolor: 'rgb(255, 255, 255)',
    zerolinecolor: 'rgb(255, 255, 255)',
  });
  const scene = (on: boolean): object => ({ xaxis: axis('xaxis', on), yaxis: axis('yaxis', on), zaxis: axis('zaxis', on) });

  await Plotly.newPlot(
    stage.div,
    [cloud(50, 75, 0.4), cloud(75, 75, 0.5), cloud(75, 100, 0.5)],
    { template: stage.template, margin: { l: 0, r: 0, t: 0, b: 0 }, showlegend: false, scene: { ...scene(true), camera: { eye: { x: 1.7, y: 1.7, z: 0.9 } } } },
    stage.config,
  );
  if (stage.bar) toggle(stage.bar, 'showbackground', true, (on) => void Plotly.relayout(stage.div, { 'scene.xaxis.showbackground': on, 'scene.yaxis.showbackground': on, 'scene.zaxis.showbackground': on }));
  else stage.every(120, (i) => void Plotly.relayout(stage.div, { 'scene.camera.eye': { x: 2.2 * Math.cos(i / 25 + 0.8), y: 2.2 * Math.sin(i / 25 + 0.8), z: 0.9 } }));
  return () => stage.dispose();
};

export default mount;
