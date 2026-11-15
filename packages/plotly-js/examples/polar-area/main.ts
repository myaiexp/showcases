// Filled wedges on a polar chart: each scatterpolar trace is a closed sector shape
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const wedges = [
  { r: [0, 1.5, 1.5, 0, 2.5, 2.5, 0], theta: [0, 10, 25, 0, 205, 215, 0], fill: '#709BFF' },
  { r: [0, 3.5, 3.5, 0], theta: [0, 55, 75, 0], fill: '#E4FF87' },
  { r: [0, 4.5, 4.5, 0, 4.5, 4.5, 0], theta: [0, 100, 120, 0, 305, 320, 0], fill: '#FFAA70' },
  { r: [0, 4, 4, 0], theta: [0, 165, 195, 0], fill: '#FFDF70' },
  { r: [0, 3, 3, 0], theta: [0, 262.5, 277.5, 0], fill: '#B6FFB4' },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });

  // A wedge is a triangle from the centre (r 0) out to two points at the same radius.
  await Plotly.newPlot(
    stage.div,
    wedges.map((w) => ({
      type: 'scatterpolar' as const,
      mode: 'lines' as const,
      r: w.r,
      theta: w.theta,
      fill: 'toself' as const,
      fillcolor: w.fill,
      line: { color: '#0f1115' },
    })),
    { template: stage.template, polar: { radialaxis: { visible: true, range: [0, 5] } }, showlegend: false },
    stage.config,
  );

  // Turning every wedge: add the same angle to each theta.
  const turn = (deg: number): void => void restyle(stage.div, { theta: wedges.map((w) => w.theta.map((t) => t + deg)) }, wedges.map((_, i) => i));
  if (stage.bar) slider(stage.bar, 'rotate all wedges (deg)', [0, 360, 5], 0, turn);
  else stage.every(100, (i) => turn(i * 4));

  return () => stage.dispose();
};

export default mount;
