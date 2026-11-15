// A polar chart of six categories with sliders for the angular rotation, hole and radial range
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 500 });
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatterpolar', mode: 'lines+markers', name: 'Rain (mm)', r: [78, 64, 58, 46, 40, 24, 12, 18, 38, 62, 78, 90], theta: months, fill: 'toself' },
      { type: 'scatterpolar', mode: 'lines+markers', name: 'Sun (hours)', r: [20, 38, 66, 88, 112, 128, 140, 130, 90, 56, 30, 16], theta: months, fill: 'toself' },
    ],
    {
      template: stage.template,
      showlegend: !stage.preview,
      polar: { angularaxis: { rotation: 90, direction: 'clockwise' }, radialaxis: { range: [0, 150], angle: 90, tickangle: 90 }, hole: 0.1 },
    },
    stage.config,
  );

  // Categories sit at equal angles; rotation puts the first at the chosen compass point.
  if (stage.bar) {
    slider(stage.bar, 'angularaxis.rotation', [0, 360, 15], 90, (v) => void relayout(stage.div, { 'polar.angularaxis.rotation': v }));
    slider(stage.bar, 'hole', [0, 0.7, 0.05], 0.1, (v) => void relayout(stage.div, { 'polar.hole': v }));
    slider(stage.bar, 'radialaxis.range max', [60, 200, 10], 150, (v) => void relayout(stage.div, { 'polar.radialaxis.range': [0, v] }));
    select(stage.bar, 'radialaxis.type', ['linear', 'log'] as const, 'linear', (v) => void relayout(stage.div, { 'polar.radialaxis.type': v, 'polar.radialaxis.autorange': v === 'log' }));
  } else stage.every(100, (i) => void relayout(stage.div, { 'polar.angularaxis.rotation': (90 + i * 3) % 360 }));

  return () => stage.dispose();
};

export default mount;
