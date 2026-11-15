// texttemplate on bars: %{y:format} d3 number formats, plus %{x} and %{customdata}
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TEMPLATES = ['%{y:.2s}', '%{y:$,.0f}', '%{y:,.1f} units', '%{x}: %{y:,}', '%{customdata}', '%{y:+.2e}'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  await Plotly.newPlot(
    stage.div,
    [
      {
        type: 'bar',
        x: ['Q1', 'Q2', 'Q3', 'Q4'],
        y: [12340, 28710, 19990, 40150],
        customdata: ['slow start', 'spring push', 'summer dip', 'year end'],
        texttemplate: '%{y:.2s}',
        textposition: 'outside',
        textfont: { size: stage.preview ? 10 : 14 },
      },
    ],
    { template: stage.template, yaxis: { range: [0, 50000] } },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'texttemplate', TEMPLATES, TEMPLATES[0], (v) => void restyle(stage.div, { texttemplate: v }));
  if (stage.preview) stage.every(1300, (i) => void restyle(stage.div, { texttemplate: pick(TEMPLATES, i) }));
  return () => stage.dispose();
};

export default mount;
