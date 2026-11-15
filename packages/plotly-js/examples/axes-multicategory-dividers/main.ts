// Multi-category x values (an array of arrays) with tickson and dividers
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const animals = ['giraffes', 'orangutans', 'monkeys'];

  await Plotly.newPlot(
    stage.div,
    [
      { x: [['SF Zoo', 'SF Zoo', 'SF Zoo'], animals], y: [20, 14, 23], name: 'SF Zoo', type: 'bar' },
      { x: [['LA Zoo', 'LA Zoo', 'LA Zoo'], animals], y: [12, 18, 29], name: 'LA Zoo', type: 'bar' },
    ],
    {
      template: stage.template,
      showlegend: false,
      xaxis: { tickson: 'boundaries', ticklen: 15, showdividers: true, dividercolor: '#9aa3b5', dividerwidth: 2 },
    } as Partial<Layout>,
    stage.config,
  );
  if (stage.bar) {
    select(stage.bar, 'xaxis.tickson', ['labels', 'boundaries'] as const, 'boundaries', (v) => void relayout(stage.div, { 'xaxis.tickson': v }));
    toggle(stage.bar, 'showdividers', true, (v) => void relayout(stage.div, { 'xaxis.showdividers': v }));
  }
  if (stage.preview) {
    stage.every(1400, (i) => void relayout(stage.div, { 'xaxis.tickson': i % 2 ? 'labels' : 'boundaries', 'xaxis.showdividers': i % 4 < 2 }));
  }
  return () => stage.dispose();
};

export default mount;
