// layout.colorway: the colours traces take, in order, when they set none of their own
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// The docs' pink-to-indigo ramp, its dark end lifted so it still reads on a dark page.
const WAYS = {
  'docs ramp': ['#f3cec9', '#e7a4b6', '#cd7eaf', '#a262a9', '#8a6bc4', '#6f8bd8', '#5aa9e6'],
  sunset: ['#fde68a', '#fbbf24', '#f97316', '#ef4444', '#db2777', '#a21caf', '#7e22ce'],
  'sea to forest': ['#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#38bdf8', '#3b82f6', '#6366f1'],
  'two colours, repeating': ['#f59e0b', '#60a5fa'],
  'the template colorway': undefined,
} as const;
type Way = keyof typeof WAYS;
const NAMES = Object.keys(WAYS) as Way[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });
  const lin = (a: number, b: number, n: number): number[] => Array.from({ length: n }, (_, i) => a + (i * (b - a)) / (n - 1));
  const as = lin(1, 3, 7);
  const bs = lin(2, 14, 7);
  const x = lin(-1, 3, 50);
  // No trace sets a colour, so colorway decides them all.
  const data: Plotly.Data[] = as.map((a, i) => ({ type: 'scatter', mode: 'lines', x, y: x.map((v) => v * v * a + bs[i]!), line: { width: 3 } }));

  const draw = (way: Way): void => {
    void Plotly.relayout(stage.div, { colorway: (WAYS[way] ? [...WAYS[way]!] : stage.template.layout?.colorway) as string[] });
  };
  await Plotly.newPlot(stage.div, data, { template: stage.template, colorway: [...WAYS['docs ramp']], showlegend: !stage.preview }, stage.config);

  if (stage.bar) select(stage.bar, 'colorway', NAMES, 'docs ramp', draw);
  else stage.every(1400, (i) => draw(NAMES[i % NAMES.length]!));
  return () => stage.dispose();
};

export default mount;
