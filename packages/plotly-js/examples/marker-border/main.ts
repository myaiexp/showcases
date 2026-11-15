// marker.line: a border that keeps overlapping markers distinct
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { cloud } from '../../shared/fund-util.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['rgb(231, 99, 250)', '#f59e0b', '#ffffff', '#34d399'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const a = cloud(5, 500, 3, 6);
  await Plotly.newPlot(
    stage.div,
    [
      { x: a.x, y: a.y, type: 'scatter', mode: 'markers', marker: { color: 'rgb(17, 157, 255)', size: 20, line: { color: COLORS[0], width: 2 } }, showlegend: false },
      { x: [2], y: [4.5], type: 'scatter', mode: 'markers', marker: { color: 'rgb(17, 157, 255)', size: 60, line: { color: COLORS[0], width: 6 } }, showlegend: false },
    ],
    { template: stage.template },
    stage.config,
  );

  const line = (width: number, color: string): void => {
    void Plotly.restyle(stage.div, { 'marker.line.width': [width, width * 3], 'marker.line.color': [color, color] } as unknown as Plotly.DataUpdate);
  };
  if (stage.bar) {
    let w = 2;
    let c: string = COLORS[0];
    slider(stage.bar, 'marker.line.width (small markers)', [0, 8, 0.5], w, (v) => line((w = v), c));
    select(stage.bar, 'marker.line.color', COLORS, c, (v) => line(w, (c = v)));
  } else {
    stage.every(400, (i) => line(0.5 + (i % 6), COLORS[Math.floor(i / 6) % COLORS.length]!));
  }
  return () => stage.dispose();
};

export default mount;
