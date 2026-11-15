// texttemplate on a pie: %{label}, %{value} and %{percent} in a free-form string
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TEMPLATES = ['%{label}: %{value} (%{percent})', '%{label}<br>%{percent:.1%}', '<b>%{value:.1f}</b> of %{label}', '%{percent:.0%}', '%{label} #%{text}'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  await Plotly.newPlot(
    stage.div,
    [{ type: 'pie', values: [2, 5, 3, 2.5], labels: ['R', 'Python', 'Java Script', 'Matlab'], text: ['1', '2', '3', '4'], texttemplate: TEMPLATES[0], textposition: 'inside', sort: false }],
    { template: stage.template, showlegend: false },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'texttemplate', TEMPLATES, TEMPLATES[0], (v) => void restyle(stage.div, { texttemplate: v }));
  if (stage.preview) stage.every(1400, (i) => void restyle(stage.div, { texttemplate: pick(TEMPLATES, i) }));
  return () => stage.dispose();
};

export default mount;
