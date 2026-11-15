// Two polar charts of the same data: angular axis direction and rotation chosen separately
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });
  const trace = {
    type: 'scatterpolar' as const,
    mode: 'lines+markers' as const,
    r: [1, 2, 3, 4, 5],
    theta: [0, 90, 180, 360, 0],
    line: { color: '#ff66ab' },
    marker: { color: '#8090c7', symbol: 'square' as const, size: 8 },
  };
  const small = { size: 8 };

  await Plotly.newPlot(
    stage.div,
    [
      { ...trace, subplot: 'polar' },
      { ...trace, subplot: 'polar2' },
    ],
    {
      template: stage.template,
      showlegend: false,
      polar: { domain: { x: [0, 0.4], y: [0, 1] }, radialaxis: { tickfont: small }, angularaxis: { tickfont: small, rotation: 90, direction: 'counterclockwise' } },
      polar2: { domain: { x: [0.6, 1], y: [0, 1] }, radialaxis: { tickfont: small }, angularaxis: { tickfont: small, direction: 'clockwise' } },
    },
    stage.config,
  );

  // rotation sets where 0 degrees sits (counterclockwise from east); direction sets which way theta grows.
  if (stage.bar) {
    slider(stage.bar, 'left rotation', [0, 360, 15], 90, (v) => void relayout(stage.div, { 'polar.angularaxis.rotation': v }));
    select(stage.bar, 'left direction', ['counterclockwise', 'clockwise'] as const, 'counterclockwise', (v) => void relayout(stage.div, { 'polar.angularaxis.direction': v }));
    select(stage.bar, 'right direction', ['clockwise', 'counterclockwise'] as const, 'clockwise', (v) => void relayout(stage.div, { 'polar2.angularaxis.direction': v }));
  } else stage.every(120, (i) => void relayout(stage.div, { 'polar.angularaxis.rotation': (90 + i * 6) % 360, 'polar2.angularaxis.rotation': (-i * 6) % 360 }));

  return () => stage.dispose();
};

export default mount;
