// Two Apple price lines (high, low) over a date axis; hover mode selectable
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { Fx } from '../../shared/fx.ts';
import { createStage } from '../../shared/stage.ts';
import { appleOhlc } from '../../shared/stat-data.ts';

const MODES = ['x', 'x unified', 'closest'] as const;

const mount: Mount = async (el, ctx) => {
  const d = await appleOhlc();
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'scatter', mode: 'lines', name: 'AAPL High', x: d.x, y: d.high, line: { color: '#17BECF' } },
      { type: 'scatter', mode: 'lines', name: 'AAPL Low', x: d.x, y: d.low, line: { color: '#7F7F7F' } },
    ],
    { template: stage.template, title: { text: stage.preview ? '' : 'Date' }, hovermode: 'x', showlegend: !stage.preview },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'hovermode', MODES, 'x', (v) => void Plotly.relayout(stage.div, { hovermode: v }));
  else stage.every(900, (i) => Fx.hover(stage.div, { xval: d.x[(i * 41) % d.x.length] }));

  return () => stage.dispose();
};

export default mount;
