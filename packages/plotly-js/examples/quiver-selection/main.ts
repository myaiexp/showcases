// Box and lasso selection on a quiver trace: selected arrows stay bright, the rest fade
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { restyle } from '../../shared/basic-util.ts';
import { readout } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 480 });
  const x: number[] = [];
  const y: number[] = [];
  const u: number[] = [];
  const v: number[] = [];
  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 8; j += 1) {
      x.push(i);
      y.push(j);
      u.push(Math.cos(j / 2));
      v.push(Math.sin(i / 2));
    }
  }
  const out = stage.bar ? readout(el) : null;

  await Plotly.newPlot(
    stage.div,
    [{ type: 'quiver', x, y, u, v, marker: { color: '#f59e0b', line: { width: 2 } }, selected: { marker: { color: '#f472b6' } }, unselected: { marker: { color: '#6b7280' } } }],
    { template: stage.template, dragmode: 'select', xaxis: { range: [-1, 10] }, yaxis: { range: [-1, 8] } },
    stage.config,
  );

  // The selection event lists the chosen points; selectedpoints can also be set straight from code.
  stage.div.on('plotly_selected', (e: { points?: { pointNumber: number }[] } | undefined) => {
    if (out) out.textContent = e?.points ? `${e.points.length} arrows selected` : 'no selection (drag a box on the plot)';
  });
  if (out) out.textContent = 'drag a box on the plot to select arrows';

  if (stage.preview) {
    stage.every(500, (i) => {
      const col = i % 10;
      const picked = x.map((_, k) => k).filter((k) => Math.abs((x[k] ?? 0) - col) <= 1.5);
      void restyle(stage.div, { selectedpoints: [picked] }, [0]);
    });
  }

  return () => stage.dispose();
};

export default mount;
