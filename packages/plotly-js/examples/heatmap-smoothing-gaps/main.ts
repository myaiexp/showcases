// Heatmap zsmooth and the gap between cells, on a 2D function grid
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { pick, restyle } from '../../shared/basic-util.ts';
import { select, slider } from '../../shared/controls.ts';
import { linspace } from '../../shared/sci-data.ts';
import { createStage } from '../../shared/stage.ts';

const smooths = ['false', 'fast', 'best'] as const;
const xs = linspace(-3, 3, 14);
const ys = linspace(-2, 2, 10);
const z = ys.map((y) => xs.map((x) => Math.sin(x * 1.3) * Math.cos(y * 1.7) + 0.3 * x * y * 0.2));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 440 });

  await Plotly.newPlot(
    stage.div,
    [{ x: xs, y: ys, z, type: 'heatmap', colorscale: 'Portland', zsmooth: false, xgap: 2, ygap: 2 }],
    { template: stage.template },
    stage.config,
  );

  // zsmooth interpolates colours between cells; xgap and ygap leave pixels between them (the gaps need zsmooth false).
  const smooth = (v: string): void => void restyle(stage.div, { zsmooth: v === 'false' ? false : v });
  if (stage.bar) {
    select(stage.bar, 'zsmooth', smooths, 'false', smooth);
    slider(stage.bar, 'xgap', [0, 12, 1], 2, (v) => void restyle(stage.div, { xgap: v }));
    slider(stage.bar, 'ygap', [0, 12, 1], 2, (v) => void restyle(stage.div, { ygap: v }));
  } else {
    stage.every(1100, (i) => {
      const s = pick(smooths, i);
      smooth(s);
      void restyle(stage.div, { xgap: s === 'false' ? 2 : 0, ygap: s === 'false' ? 2 : 0 });
    });
  }

  return () => stage.dispose();
};

export default mount;
