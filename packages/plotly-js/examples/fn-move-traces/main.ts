// moveTraces: reordering traces changes which filled area is drawn on top
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = Array.from({ length: 30 }, (_, i) => i);
  const hill = (centre: number, height: number, name: string, color: string) => ({
    x,
    y: x.map((v) => height * Math.exp(-((v - centre) ** 2) / 40)),
    fill: 'tozeroy' as const,
    fillcolor: color,
    line: { color },
    name,
  });

  await Plotly.newPlot(
    stage.div,
    [hill(10, 6, 'A', 'rgba(96,165,250,0.95)'), hill(15, 5, 'B', 'rgba(245,158,11,0.95)'), hill(20, 4, 'C', 'rgba(52,211,153,0.95)')],
    { template: stage.template, legend: { traceorder: 'normal' }, showlegend: !stage.preview },
    stage.config,
  );

  const moves: [string, () => Promise<unknown>][] = [
    // move the first trace (at index 0) to the end of the data array
    ['move 0 to the end', () => Plotly.moveTraces(stage.div, 0)],
    // move last trace (at index -1) to the beginning of the data array (index 0)
    ['move -1 to 0', () => Plotly.moveTraces(stage.div, -1, 0)],
    // move selected traces to new indices
    ['move [0, 1] to [1, 0]', () => Plotly.moveTraces(stage.div, [0, 1], [1, 0])],
  ];
  if (stage.bar) for (const [label, fn] of moves) button(stage.bar, label, () => void fn());
  if (stage.preview) stage.every(1300, () => void moves[0]![1]());

  return () => stage.dispose();
};

export default mount;
