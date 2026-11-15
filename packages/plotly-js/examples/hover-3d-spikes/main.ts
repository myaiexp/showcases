// Spike lines on a 3D hover: colour, thickness and whether they reach the walls
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { randoms } from '../../shared/fund-util.ts';
import { rng } from '../../shared/stat-data.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#1fe5bd', '#f59e0b', '#f472b6', '#ffffff'] as const;
const AXES = ['x', 'y', 'z'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const r = rng(89);
  await Plotly.newPlot(
    stage.div,
    [{ type: 'scatter3d', mode: 'markers', opacity: 0.6, marker: { size: 4, color: '#60a5fa' }, x: randoms(r, 50, -75), y: randoms(r, 50, -75), z: randoms(r, 50, -75) }],
    {
      template: stage.template,
      margin: { l: 0, r: 0, t: 0, b: 0 },
      scene: {
        xaxis: { spikecolor: '#1fe5bd', spikesides: false, spikethickness: 6 },
        yaxis: { spikecolor: '#1fe5bd', spikesides: false, spikethickness: 6 },
        zaxis: { spikecolor: '#1fe5bd', spikethickness: 6 },
        camera: { eye: { x: 1.6, y: 1.6, z: 0.9 } },
      },
    },
    stage.config,
  );

  const all = (attr: string, v: unknown): void => void Plotly.relayout(stage.div, Object.fromEntries(AXES.map((a) => [`scene.${a}axis.${attr}`, v])) as never);
  if (stage.bar) {
    select(stage.bar, 'spikecolor', COLORS, COLORS[0], (v) => all('spikecolor', v));
    slider(stage.bar, 'spikethickness', [1, 12, 1], 6, (v) => all('spikethickness', v));
    toggle(stage.bar, 'spikesides on x and y', false, (v) => void Plotly.relayout(stage.div, { 'scene.xaxis.spikesides': v, 'scene.yaxis.spikesides': v }));
    toggle(stage.bar, 'showspikes', true, (v) => all('showspikes', v));
  } else {
    // Hover has no pointer here, so the card turns the view and swaps the spike colour.
    stage.every(120, (i) => {
      const up: Record<string, unknown> = { 'scene.camera.eye': { x: 2 * Math.cos(i / 25 + 0.8), y: 2 * Math.sin(i / 25 + 0.8), z: 0.9 } };
      if (i % 20 === 0) for (const a of AXES) up[`scene.${a}axis.spikecolor`] = COLORS[(i / 20) % COLORS.length];
      void Plotly.relayout(stage.div, up as never);
    });
  }
  return () => stage.dispose();
};

export default mount;
