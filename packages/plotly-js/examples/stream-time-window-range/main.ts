// Each tick moves xaxis.range to [now - window, now] before the new point is added
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  let windowSec = stage.preview ? 15 : 30;

  await Plotly.newPlot(
    stage.div,
    [{ x: [new Date()], y: [Math.random()], mode: 'lines', line: { color: '#80CAF6' } }],
    { template: stage.template, xaxis: { type: 'date' }, yaxis: { range: [0, 1] } },
    stage.config,
  );

  if (stage.bar) select(stage.bar, 'window', ['10 s', '30 s', '60 s'], '30 s', (v) => (windowSec = parseInt(v, 10)));
  stage.every(stage.preview ? 300 : 500, () => {
    const now = new Date();
    // The docs set a one minute window; the range is what scrolls, the trace is capped at 400 points.
    const range = [new Date(now.getTime() - windowSec * 1000), now];
    void Plotly.relayout(stage.div, { 'xaxis.range': range as never }).catch(() => {});
    void Plotly.extendTraces(stage.div, { x: [[now]], y: [[Math.random()]] }, [0], 400).catch(() => {});
  });

  return () => stage.dispose();
};

export default mount;
