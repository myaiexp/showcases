// yaxis.exponentformat and showexponent on large tick values
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { pick, relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const FORMATS = ['e', 'E', 'power', 'SI', 'B', 'none'] as const;
const SHOW = ['all', 'first', 'last', 'none'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], y: [68000, 52000, 60000, 20000, 95000, 40000, 60000, 79000, 74000, 42000, 20000, 90000], type: 'scatter' }],
    { template: stage.template, yaxis: { showexponent: 'all', exponentformat: 'e' } },
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'exponentformat', FORMATS, 'e', (v) => void relayout(stage.div, { 'yaxis.exponentformat': v }));
    select(stage.bar, 'showexponent', SHOW, 'all', (v) => void relayout(stage.div, { 'yaxis.showexponent': v }));
    toggle(stage.bar, 'separatethousands', false, (v) => void relayout(stage.div, { 'yaxis.separatethousands': v }));
  }
  if (stage.preview) stage.every(1300, (i) => void relayout(stage.div, { 'yaxis.exponentformat': pick(FORMATS, i), 'yaxis.showexponent': pick(SHOW, i >> 2) }));
  return () => stage.dispose();
};

export default mount;
