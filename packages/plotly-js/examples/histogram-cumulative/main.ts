// cumulative.enabled turns bar counts into a running total (direction, currentbin)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { rng, uniform } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ x: uniform(rng(13), 500), type: 'histogram', cumulative: { enabled: true } }],
    { template: stage.template, bargap: 0.02 },
    stage.config,
  );

  const set = (key: string, v: unknown): void => void Plotly.restyle(stage.div, { [key]: v });
  if (stage.bar) {
    toggle(stage.bar, 'cumulative.enabled', true, (v) => set('cumulative.enabled', v));
    select(stage.bar, 'direction', ['increasing', 'decreasing'] as const, 'increasing', (v) => set('cumulative.direction', v));
    select(stage.bar, 'currentbin', ['include', 'exclude', 'half'] as const, 'include', (v) => set('cumulative.currentbin', v));
  } else {
    stage.every(1500, (i) => {
      set('cumulative.enabled', i % 4 !== 0);
      set('cumulative.direction', i % 4 === 2 ? 'decreasing' : 'increasing');
    });
  }

  return () => stage.dispose();
};

export default mount;
