// Violin options: bandwidth, span mode, points and side on the bill data
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { csv, unpackNum } from '../../shared/data.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const rows = await csv('violin_data.csv');
  if (ctx.signal.aborted) return () => {};
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [{ type: 'violin', y: unpackNum(rows, 'total_bill'), points: 'all', pointpos: -0.5, jitter: 0.3, bandwidth: 3, spanmode: 'soft', box: { visible: true }, meanline: { visible: true }, fillcolor: '#8dd3c7', opacity: 0.6, line: { color: '#8dd3c7' } }],
    { template: stage.template, yaxis: { zeroline: false } },
    stage.config,
  );

  const set = (key: string, v: unknown): void => void Plotly.restyle(stage.div, { [key]: v });
  if (stage.bar) {
    slider(stage.bar, 'bandwidth', [0.5, 10, 0.5], 3, (v) => set('bandwidth', v));
    select(stage.bar, 'points', ['all', 'outliers', 'suspectedoutliers', 'none'] as const, 'all', (v) => set('points', v === 'none' ? false : v));
    select(stage.bar, 'spanmode', ['soft', 'hard'] as const, 'soft', (v) => set('spanmode', v));
    select(stage.bar, 'side', ['both', 'positive', 'negative'] as const, 'both', (v) => set('side', v));
  } else {
    stage.every(140, (i) => set('bandwidth', 1 + 4 * (1 + Math.sin(i / 8))));
  }

  return () => stage.dispose();
};

export default mount;
