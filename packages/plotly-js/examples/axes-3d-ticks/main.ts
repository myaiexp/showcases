// 3D axis ticks: custom tick text, a font and suffix, and outside tick marks
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(8);
  const scene = {
    xaxis: { ticktext: ['H20', 'C02', 'O2'], tickvals: [-30, -45, -65, -10] },
    yaxis: { nticks: 5, tickfont: { color: '#34d399', family: 'Old Standard TT, serif', size: 14 }, ticksuffix: '$' },
    zaxis: { ticks: 'outside', tick0: 0, tickwidth: 4 },
  };
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter3d', mode: 'markers', opacity: 0.6, marker: { size: 3, color: '#f59e0b' }, x: randoms(r, 50, -75), y: randoms(r, 50, -75), z: randoms(r, 50, -75) }],
    { template: stage.template, margin: { l: 0, r: 0, t: 0, b: 0 }, scene: { ...(scene as object), camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } } } },
    stage.config,
  );

  // null puts an attribute back to its default.
  const apply = (styled: boolean): void => {
    const on = <T,>(v: T): T | null => (styled ? v : null);
    void Plotly.relayout(stage.div, {
      'scene.xaxis.ticktext': on(scene.xaxis.ticktext),
      'scene.xaxis.tickvals': on(scene.xaxis.tickvals),
      'scene.yaxis.nticks': on(5),
      'scene.yaxis.tickfont': on(scene.yaxis.tickfont),
      'scene.yaxis.ticksuffix': on('$'),
      'scene.zaxis.ticks': on('outside'),
      'scene.zaxis.tickwidth': on(4),
    });
  };
  if (stage.bar) toggle(stage.bar, 'custom ticks on all three axes', true, apply);
  else {
    stage.every(120, (i) => void Plotly.relayout(stage.div, { 'scene.camera.eye': { x: 2.1 * Math.cos(i / 25 + 0.8), y: 2.1 * Math.sin(i / 25 + 0.8), z: 0.9 } }));
  }
  return () => stage.dispose();
};

export default mount;
