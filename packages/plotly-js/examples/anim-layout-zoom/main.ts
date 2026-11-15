// Plotly.animate with a layout: the axis ranges transition instead of snapping
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/stat-data.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const rand = rng(181);
  const n = 500;
  const x = Array.from({ length: n }, (_, i) => i / (n - 1));
  const y = x.map((v) => v + 0.2 * (rand() - 0.5));

  await Plotly.newPlot(
    stage.div,
    [{ x, y, mode: 'markers', marker: { size: stage.preview ? 4 : 5, color: '#60a5fa' } }],
    { template: stage.template, xaxis: { range: [0, 1] }, yaxis: { range: [0, 1] } },
    stage.config,
  );

  const zoom = (): void => {
    const min = 0.45 * rand();
    const max = 0.55 + 0.45 * rand();
    void Plotly.animate(
      stage.div,
      { layout: { xaxis: { range: [min, max] }, yaxis: { range: [min, max] } } },
      { transition: { duration: 500, easing: 'cubic-in-out' } },
    ).catch(() => {});
  };
  if (stage.bar) button(stage.bar, 'Zoom to a random window', zoom);
  if (stage.preview) stage.every(1100, zoom);

  return () => stage.dispose();
};

export default mount;
