// Axis booleans: showgrid, zeroline, showline and showticklabels
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { relayout } from '../../shared/basic-util.ts';
import { createStage } from '../../shared/stage.ts';

const KEYS = ['showgrid', 'zeroline', 'showline', 'showticklabels'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const axis = { autorange: true, showgrid: false, zeroline: false, showline: false, autotick: true, ticks: '' as const, showticklabels: false };

  await Plotly.newPlot(
    stage.div,
    [
      { x, y: [8, 7, 6, 5, 4, 3, 2, 1, 0], type: 'scatter' },
      { x, y: x, type: 'scatter' },
    ],
    { template: stage.template, xaxis: { ...axis }, yaxis: { ...axis } },
    stage.config,
  );

  const set = (key: (typeof KEYS)[number], on: boolean): Promise<void> => {
    const update: Record<string, unknown> = {};
    for (const ax of ['xaxis', 'yaxis']) {
      update[`${ax}.${key}`] = on;
      if (key === 'showticklabels') update[`${ax}.ticks`] = on ? 'outside' : '';
    }
    return relayout(stage.div, update);
  };

  if (stage.bar) for (const key of KEYS) toggle(stage.bar, key, false, (on) => void set(key, on));
  // The card lights the four switches in turn, then starts over.
  if (stage.preview) {
    stage.every(900, (i) => {
      const step = i % 5;
      for (const [n, key] of KEYS.entries()) void set(key, n < step);
    });
  }
  return () => stage.dispose();
};

export default mount;
