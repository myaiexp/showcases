// texttemplate on scatterternary with %{a}, %{b}, %{c} formats and an array textfont
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TEMPLATES = ['%{text}<br>(%{a:.2f}, %{b:.2f}, %{c:.2f})', '%{text}: a=%{a:.0f}', '%{a:.1%} / %{b:.1%} / %{c:.1%}', '%{text}'] as const;
const POSITIONS = ['bottom center', 'top center', 'middle right', 'middle left'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 460 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'scatterternary',
        a: [3, 2, 5],
        b: [2, 5, 2],
        c: [5, 2, 2],
        mode: 'markers+text',
        marker: { size: 9 },
        text: ['A', 'B', 'C'],
        texttemplate: TEMPLATES[0],
        textposition: 'bottom center',
        textfont: { family: 'Times', size: stage.preview ? [10, 11, 10] : [18, 21, 20], color: ['IndianRed', 'MediumPurple', 'DarkOrange'] },
      },
    ],
    { template: stage.template, ternary: { sum: 10 }, margin: stage.preview ? { l: 40, r: 40, t: 20, b: 20 } : undefined },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'texttemplate', TEMPLATES, TEMPLATES[0], (v) => void restyle(stage.div, { texttemplate: v }));
    select(stage.bar, 'textposition', POSITIONS, 'bottom center', (v) => void restyle(stage.div, { textposition: v }));
  }
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { texttemplate: pick(TEMPLATES, i), textposition: pick(POSITIONS, i) }));
  return () => stage.dispose();
};

export default mount;
