// Two polar charts of the same line, one showing only a sector of the circle
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
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
  const font = { size: 8 };

  await Plotly.newPlot(
    stage.div,
    [
      { ...trace, subplot: 'polar' },
      { ...trace, subplot: 'polar2' },
    ],
    {
      template: stage.template,
      showlegend: false,
      polar: { sector: [145, 215], domain: { x: [0, 0.4], y: [0, 1] }, radialaxis: { tickfont: font }, angularaxis: { tickfont: font } },
      polar2: { domain: { x: [0.6, 1], y: [0, 1] }, radialaxis: { tickfont: font }, angularaxis: { tickfont: font } },
    },
    stage.config,
  );

  // sector [start, end] in degrees: the circle is cut to that wedge and the axes are redrawn to fill the box.
  const sector = (a: number, b: number): void => void relayout(stage.div, { 'polar.sector': [a, b] });
  if (stage.bar) {
    let lo = 145;
    let hi = 215;
    slider(stage.bar, 'sector start', [0, 360, 5], lo, (v) => sector((lo = v), hi));
    slider(stage.bar, 'sector end', [0, 360, 5], hi, (v) => sector(lo, (hi = v)));
  } else stage.every(120, (i) => sector(180 - 120 * Math.abs(Math.sin(i / 14)) - 20, 180 + 120 * Math.abs(Math.sin(i / 14)) + 20));

  return () => stage.dispose();
};

export default mount;
