// A box trace that also draws its points, jittered (boxpoints, jitter, pointpos)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [{ y: [0, 1, 1, 2, 3, 5, 8, 13, 21], boxpoints: 'all', jitter: 0.3, pointpos: -1.8, type: 'box' }],
    { template: stage.template },
    stage.config,
  );

  const set = (key: string, v: number | string): void => void Plotly.restyle(stage.div, { [key]: v });
  if (stage.bar) {
    select(stage.bar, 'boxpoints', ['all', 'outliers', 'suspectedoutliers'] as const, 'all', (v) => set('boxpoints', v));
    slider(stage.bar, 'jitter', [0, 1, 0.05], 0.3, (v) => set('jitter', v));
    slider(stage.bar, 'pointpos', [-2, 2, 0.1], -1.8, (v) => set('pointpos', v));
  } else {
    stage.every(120, (i) => {
      set('jitter', 0.5 + 0.5 * Math.sin(i / 8));
      set('pointpos', -1.8 + 1.8 * Math.abs(Math.sin(i / 20)));
    });
  }

  return () => stage.dispose();
};

export default mount;
