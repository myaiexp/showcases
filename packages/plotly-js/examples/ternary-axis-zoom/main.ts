// Ternary axes with a minimum and a sum: raising an axis minimum zooms into a corner
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { relayout } from '../../shared/basic-util.ts';
import { slider } from '../../shared/controls.ts';
import { rng } from '../../shared/gl-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 520 });

  // 90 points scattered around three alloy compositions (seeded).
  const rand = rng(5);
  const centres = [[60, 25, 15], [20, 55, 25], [25, 20, 55]] as const;
  const pts = Array.from({ length: 90 }, (_, i) => {
    const c = centres[i % 3] ?? centres[0];
    const a = Math.max(1, (c[0] ?? 0) + (rand() - 0.5) * 24);
    const b = Math.max(1, (c[1] ?? 0) + (rand() - 0.5) * 24);
    const s = a + b + Math.max(1, (c[2] ?? 0) + (rand() - 0.5) * 24);
    return { a: (a / s) * 100, b: (b / s) * 100, c: 100 - ((a + b) / s) * 100, g: i % 3 };
  });

  await Plotly.newPlot(
    stage.div,
    [0, 1, 2].map((g) => ({
      type: 'scatterternary' as const,
      mode: 'markers' as const,
      name: ['Alloy A', 'Alloy B', 'Alloy C'][g],
      a: pts.filter((p) => p.g === g).map((p) => p.a),
      b: pts.filter((p) => p.g === g).map((p) => p.b),
      c: pts.filter((p) => p.g === g).map((p) => p.c),
      marker: { size: stage.preview ? 6 : 9, opacity: 0.85 },
    })),
    {
      template: stage.template,
      showlegend: !stage.preview,
      ternary: {
        sum: 100,
        aaxis: { title: { text: 'Fe' }, min: 0, ticksuffix: '%' },
        baxis: { title: { text: 'Ni' }, min: 0, ticksuffix: '%' },
        caxis: { title: { text: 'Cr' }, min: 0, ticksuffix: '%' },
      },
    },
    stage.config,
  );

  // Raising two axes' min leaves the third as the shrinking corner: the triangle zooms in on it.
  const zoom = (m: number): void => void relayout(stage.div, { 'ternary.baxis.min': m, 'ternary.caxis.min': m });
  if (stage.bar) slider(stage.bar, 'baxis.min and caxis.min', [0, 40, 1], 0, zoom);
  else stage.every(140, (i) => zoom(Math.round(20 + 20 * Math.sin(i / 10))));

  return () => stage.dispose();
};

export default mount;
