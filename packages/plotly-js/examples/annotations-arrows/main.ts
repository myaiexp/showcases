// layout.annotations: a text, an arrow to (x, y), and the offset ax, ay from it
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

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
        { x: 2, y: 5, xref: 'x', yref: 'y', text: 'Annotation Text', showarrow: true, arrowhead: 7, ax: 0, ay: -40 },
        { x: 4, y: 4, xref: 'x', yref: 'y', text: 'Annotation Text 2', showarrow: true, arrowhead: 7, ax: 0, ay: -40 },
      ],
    },
    stage.config,
  );
  const both = (key: string, v: unknown): Promise<void> => relayout(stage.div, { [`annotations[0].${key}`]: v, [`annotations[1].${key}`]: v });
  if (stage.bar) {
    slider(stage.bar, 'ax', [-100, 100, 5], 0, (v) => void both('ax', v));
    slider(stage.bar, 'ay', [-100, 100, 5], -40, (v) => void both('ay', v));
    select(stage.bar, 'arrowhead', ['0', '1', '2', '3', '4', '5', '6', '7', '8'] as const, '7', (v) => void both('arrowhead', Number(v)));
    toggle(stage.bar, 'second annotation', true, (v) => void relayout(stage.div, { 'annotations[1].visible': v }));
  }
  if (stage.preview) {
    stage.every(120, (i) => {
      void both('ax', Math.sin(i / 8) * 50);
      void both('ay', -40 + Math.cos(i / 8) * 25);
      if (i % 12 === 0) void both('arrowhead', (i / 12) % 9);
    });
  }
  return () => stage.dispose();
};

export default mount;
