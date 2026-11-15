// An SPC chart: data line, limits at plus and minus 5, circled violations
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { spcColumns, spcTraces } from './traces.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const traces = spcTraces(9);

  await Plotly.newPlot(
    stage.div,
    traces,
    {
      template: stage.template,
      title: { text: stage.preview ? '' : 'Basic SPC Chart' },
      xaxis: { zeroline: false },
      yaxis: { range: [-10, 10], zeroline: false },
    },
    stage.config,
  );

  // Showing the first n points: violations (outside the red limits) are recomputed.
  const reveal = (n: number): void => {
    const t = spcColumns(n);
    void Plotly.restyle(stage.div, { x: t.map((d) => d.x), y: t.map((d) => d.y) } as never);
  };
  if (stage.bar) slider(stage.bar, 'points shown', [1, 9, 1], 9, reveal);
  else stage.every(700, (i) => reveal(1 + (i % 9)));

  return () => stage.dispose();
};

export default mount;
