// yaxis.tickformat (d3-format), tickprefix and ticksuffix with their show rules
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['%', '.1%', '.0%', '.2f', ',.2f', '$.2f', '.2s', '+.2f'] as const;
const SHOWS = ['all', 'first', 'last', 'none'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [0.18, 0.38, 0.56, 0.46, 0.59, 0.4, 0.78, 0.77, 0.74, 0.42, 0.45, 0.39], type: 'scatter' }],
    { template: stage.template, yaxis: { tickformat: '%', tickprefix: '~', ticksuffix: ' ok', showtickprefix: 'none', showticksuffix: 'none' } },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'tickformat', FORMATS, '%', (v) => void relayout(stage.div, { 'yaxis.tickformat': v }));
    select(stage.bar, "showtickprefix ('~')", SHOWS, 'none', (v) => void relayout(stage.div, { 'yaxis.showtickprefix': v }));
    select(stage.bar, "showticksuffix (' ok')", SHOWS, 'none', (v) => void relayout(stage.div, { 'yaxis.showticksuffix': v }));
  }
  if (stage.preview) stage.every(1200, (i) => void relayout(stage.div, { 'yaxis.tickformat': pick(FORMATS, i), 'yaxis.showtickprefix': pick(SHOWS, i >> 1), 'yaxis.showticksuffix': pick(SHOWS, i + 2) }));
  return () => stage.dispose();
};

export default mount;
