// shapes of type 'path': M, L, Q, C and Z commands in data coordinates
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const quad = (cy: number): string => `M 4,4 Q 6,${cy} 8,4`;
  const cubic = (cy: number): string => `M 1,4 C 2,${cy} 6,4 8,8`;

  await Plotly.newPlot(
    stage.div,
    [{ x: [2, 1, 8, 8], y: [0.25, 9, 2, 6], text: ['filled triangle', 'filled Polygon', 'Quadratic Bezier Curves', 'Cubic Bezier Curves'], mode: 'text', textfont: { size: stage.preview ? 8 : 12 } }],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Basic Arbitrary SVG Paths' },
      xaxis: { range: [0, 9], zeroline: false },
      yaxis: { range: [0, 11], showgrid: false },
      shapes: [
        { type: 'path', path: quad(0), line: { color: 'rgb(93, 164, 214)' } },
        { type: 'path', path: cubic(8), line: { color: 'rgb(207, 114, 255)' } },
        { type: 'path', path: 'M 1 1 L 1 3 L 4 1 Z', fillcolor: 'rgba(44, 160, 101, 0.5)', line: { color: 'rgb(44, 160, 101)' } },
        { type: 'path', path: ' M 3,7 L2,8 L2,9 L3,10, L4,10 L5,9 L5,8 L4,7 Z', fillcolor: 'rgba(255, 140, 184, 0.5)', line: { color: 'rgb(255, 140, 184)' } },
      ],
    },
    stage.config,
  );
  if (stage.bar) {
    slider(stage.bar, 'quadratic control y', [-4, 8, 0.5], 0, (v) => void relayout(stage.div, { 'shapes[0].path': quad(v) }));
    slider(stage.bar, 'cubic control y', [0, 12, 0.5], 8, (v) => void relayout(stage.div, { 'shapes[1].path': cubic(v) }));
  }
  if (stage.preview) stage.every(100, (i) => void relayout(stage.div, { 'shapes[0].path': quad(2 + Math.sin(i / 6) * 3), 'shapes[1].path': cubic(6 + Math.cos(i / 6) * 3) }));
  return () => stage.dispose();
};

export default mount;
