// Axis lines: gridwidth, zerolinewidth, linewidth and mirror on both axes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const MIRRORS = ['ticks', 'all', 'allticks', 'false'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const axis = {
    showgrid: true,
    zeroline: true,
    showline: true,
    mirror: 'ticks' as const,
    gridcolor: '#5b6272',
    gridwidth: 2,
    zerolinecolor: '#969696',
    zerolinewidth: 4,
    linecolor: '#9aa3b5',
    linewidth: 6,
  };

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [8, 7, 6, 5, 4, 3, 2, 1, 0], type: 'scatter' },
      { x, y: x, type: 'scatter' },
    ],
    { template: stage.template, xaxis: { ...axis }, yaxis: { ...axis } },
    stage.config,
  );

  const both = (key: string, value: unknown): Promise<void> => relayout(stage.div, { [`xaxis.${key}`]: value, [`yaxis.${key}`]: value });
  if (stage.bar) {
    slider(stage.bar, 'gridwidth', [0, 8, 1], 2, (v) => void both('gridwidth', v));
    slider(stage.bar, 'zerolinewidth', [0, 12, 1], 4, (v) => void both('zerolinewidth', v));
    slider(stage.bar, 'linewidth', [0, 12, 1], 6, (v) => void both('linewidth', v));
    select(stage.bar, 'mirror', MIRRORS, 'ticks', (v) => void both('mirror', v === 'false' ? false : v));
  }
  if (stage.preview) {
    stage.every(900, (i) => {
      void both('linewidth', 1 + ((i * 3) % 9));
      void both('gridwidth', 1 + (i % 5));
      void both('mirror', i % 2 ? 'all' : 'ticks');
    });
  }
  return () => stage.dispose();
};

export default mount;
