// Four subplots with hand-set x and y domains; two sliders move the vertical and horizontal split
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

/** sx: where the left column ends; sy: where the bottom band ends. */
function domains(sx: number, sy: number): Record<string, number[]> {
  const mid = sy + (1 - sy) / 2 + 0.025;
  return {
    'xaxis.domain': [0, sx - 0.05],
    'yaxis.domain': [sy + 0.05, 1],
    'xaxis2.domain': [sx + 0.05, 1],
    'yaxis2.domain': [mid + 0.025, 1],
    'xaxis3.domain': [sx + 0.05, 1],
    'yaxis3.domain': [sy + 0.05, mid - 0.025],
    'xaxis4.domain': [0, 1],
    'yaxis4.domain': [0, sy],
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const trace = (n: number, name: string) => ({
    x: [1, 2],
    y: [1, 2],
    type: 'scatter' as const,
    name,
    xaxis: n === 1 ? 'x' : `x${n}`,
    yaxis: n === 1 ? 'y' : `y${n}`,
  });
  await Plotly.newPlot(
    stage.div,
    [trace(1, '(1,1)'), trace(2, '(1,2)'), trace(3, '(2,2)'), trace(4, '(3,1)')],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Multiple Custom Sized Subplots' },
      showlegend: false,
      xaxis: { domain: [0, 0.45], anchor: 'y' },
      yaxis: { domain: [0.5, 1], anchor: 'x' },
      xaxis2: { domain: [0.55, 1], anchor: 'y2' },
      yaxis2: { domain: [0.8, 1], anchor: 'x2' },
      xaxis3: { domain: [0.55, 1], anchor: 'y3' },
      yaxis3: { domain: [0.5, 0.75], anchor: 'x3' },
      xaxis4: { domain: [0, 1], anchor: 'y4' },
      yaxis4: { domain: [0, 0.45], anchor: 'x4' },
    },
    stage.config,
  );

  if (stage.bar) {
    let [sx, sy] = [0.5, 0.45];
    slider(stage.bar, 'left column ends', [0.2, 0.8, 0.02], sx, (v) => { sx = v; void relayout(stage.div, domains(sx, sy)); });
    slider(stage.bar, 'bottom band ends', [0.15, 0.7, 0.02], sy, (v) => { sy = v; void relayout(stage.div, domains(sx, sy)); });
  } else {
    stage.every(100, (i) => void relayout(stage.div, domains(0.5 + 0.2 * Math.sin(i / 9), 0.45 + 0.15 * Math.cos(i / 7))));
  }
  return () => stage.dispose();
};

export default mount;
