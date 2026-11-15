// A stepped colorscale: duplicate stops make flat bands, and the colorbar ticks match
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// n bands of grey: each band's two stops share one colour, so nothing blends between them.
function bands(n: number): [number, string][] {
  const out: [number, string][] = [];
  for (let k = 0; k < n; k++) {
    const g = Math.round(20 + (k * 200) / Math.max(1, n - 1));
    out.push([k / n, `rgb(${g}, ${g}, ${g})`], [(k + 1) / n, `rgb(${g}, ${g}, ${g})`]);
  }
  return out;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300 });
  const z = [Array.from({ length: 10 }, (_, i) => i)];
  await Plotly.newPlot(
    stage.div,
    [{ type: 'heatmap', z, colorscale: bands(10), colorbar: { tickmode: 'linear', tick0: 0, dtick: 1 } }],
    { template: stage.template, title: { text: stage.preview ? '' : 'Custom discretized heatmap colorscale' } },
    stage.config,
  );

  const setBands = (n: number): void => {
    void Plotly.restyle(stage.div, { colorscale: [bands(n)] } as unknown as Plotly.DataUpdate);
  };
  if (stage.bar) slider(stage.bar, 'bands (the docs use 10)', [2, 10, 1], 10, setBands);
  else stage.every(700, (i) => setBands(2 + (i % 9)));
  return () => stage.dispose();
};

export default mount;
