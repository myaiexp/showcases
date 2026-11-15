// A funnel on a date axis: %{label} prints the date, with d3-time-format after a pipe
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const TEMPLATES = ['%{label}', '%{label|%b %Y}: %{value}', '%{y|%d %B %Y}', '%{label|%Y} (%{percentInitial:.0%})'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const y = ['2018-01-01', '2018-07-01', '2019-01-01', '2020-01-01'];

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'funnel', name: 'Montreal', orientation: 'h', y, x: [100, 60, 40, 20], textposition: 'inside', texttemplate: '%{label}' },
      { type: 'funnel', name: 'Vancouver', orientation: 'h', y, x: [90, 70, 50, 10], textposition: 'inside', textinfo: 'label' },
    ],
    { template: stage.template, yaxis: { type: 'date' }, showlegend: !stage.preview },
    stage.config,
  );
  if (stage.bar) select(stage.bar, "Montreal's texttemplate", TEMPLATES, TEMPLATES[0], (v) => void restyle(stage.div, { texttemplate: v }, [0]));
  if (stage.preview) stage.every(1500, (i) => void restyle(stage.div, { texttemplate: pick(TEMPLATES, i) }, [0]));
  return () => stage.dispose();
};

export default mount;
