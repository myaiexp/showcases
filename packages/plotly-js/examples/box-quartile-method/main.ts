// quartilemethod: how a box trace computes quartiles (three rules)
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const y = [1, 2, 3, 4, 4, 4, 8, 9, 10, 14];
const METHODS = ['linear', 'exclusive', 'inclusive'] as const;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    METHODS.map((m) => ({ y, type: 'box' as const, name: m, quartilemethod: m, boxpoints: 'all' as const, jitter: 0.4, pointpos: -1.6 })),
    { template: stage.template, showlegend: false, yaxis: { range: [0, 15] } },
    stage.config,
  );

  // The three boxes use identical data; only the quartile rule differs. Highlight one at a time.
  const focus = (v: (typeof METHODS)[number]): void =>
    void Plotly.restyle(stage.div, { opacity: METHODS.map((m) => (m === v ? 1 : 0.3)) } as never);
  if (stage.bar) select(stage.bar, 'highlight', METHODS, 'linear', focus);
  else stage.every(1200, (i) => focus(METHODS[i % 3] ?? 'linear'));

  return () => stage.dispose();
};

export default mount;
