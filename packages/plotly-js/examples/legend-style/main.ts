// legend.bgcolor, bordercolor, borderwidth, font and traceorder
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const BACKGROUNDS = ['#E2E2E2', '#1e293b', '#fde68a', 'rgba(0,0,0,0)'] as const;
const ORDERS = ['normal', 'reversed'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [0, 3, 6, 4, 5, 2, 3, 5, 4], type: 'scatter' },
      { x, y: [0, 4, 7, 8, 3, 6, 3, 3, 4], type: 'scatter' },
    ],
    // The docs' light grey legend keeps its dark text: the font colour follows the background.
    { template: stage.template, legend: { x: 0, y: 1, traceorder: 'normal', font: { family: 'sans-serif', size: 12, color: '#000' }, bgcolor: '#E2E2E2', bordercolor: '#FFFFFF', borderwidth: 2 } },
    stage.config,
  );
  const dark = (bg: string): string => (bg === '#1e293b' || bg === 'rgba(0,0,0,0)' ? '#e6e8ee' : '#000');
  if (stage.bar) {
    select(stage.bar, 'bgcolor', BACKGROUNDS, BACKGROUNDS[0], (v) => void relayout(stage.div, { 'legend.bgcolor': v, 'legend.font.color': dark(v) }));
    select(stage.bar, 'traceorder', ORDERS, 'normal', (v) => void relayout(stage.div, { 'legend.traceorder': v }));
    slider(stage.bar, 'borderwidth', [0, 10, 1], 2, (v) => void relayout(stage.div, { 'legend.borderwidth': v }));
    slider(stage.bar, 'font.size', [8, 24, 1], 12, (v) => void relayout(stage.div, { 'legend.font.size': v }));
  }
  if (stage.preview) {
    stage.every(1100, (i) => {
      const bg = BACKGROUNDS[i % BACKGROUNDS.length] as string;
      void relayout(stage.div, { 'legend.bgcolor': bg, 'legend.font.color': dark(bg), 'legend.borderwidth': 1 + (i % 4) * 2, 'legend.traceorder': ORDERS[i % 2] });
    });
  }
  return () => stage.dispose();
};

export default mount;
