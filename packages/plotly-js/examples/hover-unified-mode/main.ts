// hovermode 'x unified' and 'y unified': a single hover label for the closest x or y
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';

const MODES = ['x unified', 'y unified', 'x', 'y', 'closest'] as const;
const MONTHS = ['2020-01-01', '2020-02-01', '2020-03-01', '2020-04-01'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [
      { x: MONTHS, y: [10, 15, 12, 18], mode: 'markers+lines', name: 'Series A', type: 'scatter' },
      { x: MONTHS, y: [8, 12, 16, 14], mode: 'markers+lines', name: 'Series B', type: 'scatter' },
    ],
    {
      template: stage.template,
      title: { text: stage.preview ? '' : "layout.hovermode='x unified'" },
      hovermode: 'x unified',
      xaxis: { title: { text: stage.preview ? '' : 'Date' } },
      yaxis: { title: { text: stage.preview ? '' : 'Value' } },
    },
    stage.config,
  );
  if (stage.bar) select(stage.bar, 'layout.hovermode', MODES, 'x unified', (v) => void relayout(stage.div, { hovermode: v, title: { text: `layout.hovermode='${v}'` } }));
  if (stage.preview) stage.every(1000, (i) => Fx.hover(stage.div, { xval: MONTHS[i % MONTHS.length] }));
  return () => stage.dispose();
};

export default mount;
