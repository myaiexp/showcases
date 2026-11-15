// restyle(graphDiv, update, traceIndices): one trace, a list, or every trace
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const TARGETS = { 'trace 0': 0, 'traces [1, 2]': [1, 2], 'all (omitted)': undefined } as const;
type Target = keyof typeof TARGETS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const line = (k: number) => ({ y: [1, 2, 3, 4, 5].map((x) => k + Math.sin(x + k) * 0.6), mode: 'lines+markers' as const, marker: { size: 10 }, name: `trace ${k}` });

  await Plotly.newPlot(stage.div, [line(0), line(1), line(2)], { template: stage.template, showlegend: !stage.preview }, stage.config);

  const original = stage.div.data.map((_, i) => ['#60a5fa', '#f59e0b', '#34d399'][i]);
  const apply = async (target: Target): Promise<void> => {
    // Put every trace back, then apply the docs' update to the chosen traces only.
    await Plotly.restyle(stage.div, { opacity: 1, 'marker.color': original, 'line.color': original });
    const update = { opacity: 0.4, 'marker.color': 'red' };
    const t = TARGETS[target];
    await Plotly.restyle(stage.div, update, typeof t === 'object' ? [...t] : t);
  };

  const names = Object.keys(TARGETS) as Target[];
  if (stage.bar) select(stage.bar, 'restyle', names, names[0]!, (t) => void apply(t));
  await apply(names[0]!);
  if (stage.preview) stage.every(1500, (i) => void apply(names[i % names.length]!));

  return () => stage.dispose();
};

export default mount;
