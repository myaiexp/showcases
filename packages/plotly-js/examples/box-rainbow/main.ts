// Thirty box traces coloured by hsl() values around the hue wheel
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { rng } from '../../shared/stat-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const rand = rng(11);
  const n = 30;

  const data = Array.from({ length: n }, (_, i) => ({
    type: 'box' as const,
    y: Array.from({ length: 10 }, () => 3.5 * Math.sin((Math.PI * i) / n) + i / n + (1.5 + 0.5 * Math.cos((Math.PI * i) / n)) * rand()),
    marker: { color: `hsl(${(i * 360) / (n - 1)},50%,50%)` },
  }));

  await Plotly.newPlot(
    stage.div,
    data,
    {
      template: stage.template,
      xaxis: { showgrid: false, zeroline: false, tickangle: 60, showticklabels: false },
      yaxis: { zeroline: false },
      showlegend: false,
    },
    stage.config,
  );

  // Cards: a slow ripple through the hue wheel.
  if (stage.preview) {
    stage.every(100, (i) =>
      void Plotly.restyle(stage.div, { 'marker.color': data.map((_, k) => `hsl(${((k * 360) / (n - 1) + i * 6) % 360},50%,50%)`) }),
    );
  }

  return () => stage.dispose();
};

export default mount;
