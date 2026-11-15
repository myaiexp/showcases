// Annotation styling: font, bgcolor, bordercolor, borderwidth, borderpad, arrow*, opacity
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#ff7f0e', '#1f77b4', '#2ca02c', '#d62728', '#9467bd'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [0, 1, 3, 2, 4, 3, 4, 6, 5], type: 'scatter' },
      { x, y: [0, 4, 5, 1, 2, 2, 3, 4, 2], type: 'scatter' },
    ],
    {
      template: stage.template,
      showlegend: false,
      annotations: [
        {
          x: 2, y: 5, xref: 'x', yref: 'y', text: 'max=5', showarrow: true,
          font: { family: 'Courier New, monospace', size: 16, color: '#ffffff' },
          align: 'center', arrowhead: 2, arrowsize: 1, arrowwidth: 2, arrowcolor: '#9aa3b5',
          ax: 20, ay: -30, bordercolor: '#c7c7c7', borderwidth: 2, borderpad: 4, bgcolor: '#ff7f0e', opacity: 0.8,
        },
      ],
    },
    stage.config,
  );
  const set = (key: string, v: unknown): Promise<void> => relayout(stage.div, { [`annotations[0].${key}`]: v });
  if (stage.bar) {
    select(stage.bar, 'bgcolor', COLORS, COLORS[0], (v) => void set('bgcolor', v));
    slider(stage.bar, 'borderwidth', [0, 10, 1], 2, (v) => void set('borderwidth', v));
    slider(stage.bar, 'borderpad', [0, 20, 1], 4, (v) => void set('borderpad', v));
    slider(stage.bar, 'arrowwidth', [0.5, 8, 0.5], 2, (v) => void set('arrowwidth', v));
    slider(stage.bar, 'arrowsize', [0.3, 4, 0.1], 1, (v) => void set('arrowsize', v));
    slider(stage.bar, 'opacity', [0.1, 1, 0.05], 0.8, (v) => void set('opacity', v));
  }
  if (stage.preview) {
    stage.every(900, (i) => {
      void set('bgcolor', pick(COLORS, i));
      void set('borderwidth', 1 + (i % 4) * 2);
      void set('arrowsize', 0.6 + (i % 4) * 0.5);
      void set('text', ['max=5', 'peak', '<b>5!</b>'][i % 3]);
    });
  }
  return () => stage.dispose();
};

export default mount;
