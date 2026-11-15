// A 2D density contour with points and marginal histograms on extra axes
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { gauss, rng } from '../../shared/stat-data.ts';

/** t runs -1..1.2; x = t^3 and y = t^6, each blurred by 0.3 of normal noise (the docs' recipe). */
function curve(seed: number, n: number): { x: number[]; y: number[] } {
  const normal = gauss(rng(seed));
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = -1 + (2.2 * i) / (n - 1);
    x.push(t ** 3 + 0.3 * normal());
    y.push(t ** 6 + 0.3 * normal());
  }
  return { x, y };
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });
  const { x, y } = curve(2, stage.preview ? 800 : 2000);
  const ink = '#ff8a65';

  await Plotly.newPlot(
    stage.div,
    [
      { x, y, mode: 'markers', name: 'points', marker: { color: ink, size: 2, opacity: 0.4 }, type: 'scatter' },
      { x, y, name: 'density', ncontours: 20, colorscale: 'Hot', reversescale: false, showscale: false, type: 'histogram2dcontour' },
      { x, name: 'x density', marker: { color: ink }, yaxis: 'y2', type: 'histogram' },
      { y, name: 'y density', marker: { color: ink }, xaxis: 'x2', type: 'histogram' },
    ],
    {
      template: stage.template,
      showlegend: false,
      hovermode: 'closest',
      bargap: 0,
      margin: stage.preview ? { l: 30, r: 8, t: 8, b: 24 } : { t: 50 },
      xaxis: { domain: [0, 0.85], showgrid: false, zeroline: false },
      yaxis: { domain: [0, 0.85], showgrid: false, zeroline: false },
      xaxis2: { domain: [0.85, 1], showgrid: false, zeroline: false },
      yaxis2: { domain: [0.85, 1], showgrid: false, zeroline: false },
    },
    stage.config,
  );

  if (stage.bar) {
    toggle(stage.bar, 'reversescale', false, (v) => void Plotly.restyle(stage.div, { reversescale: v }, [1]));
    toggle(stage.bar, 'show points', true, (v) => void Plotly.restyle(stage.div, { visible: v }, [0]));
  } else {
    stage.every(2200, (i) => {
      const next = curve(i + 10, 800);
      void Plotly.restyle(stage.div, { x: [next.x, next.x, next.x], y: [next.y, next.y, undefined] } as never, [0, 1, 2]);
      void Plotly.restyle(stage.div, { y: [next.y] }, [3]);
    });
  }

  return () => stage.dispose();
};

export default mount;
