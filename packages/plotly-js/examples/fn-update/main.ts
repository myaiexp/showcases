// Plotly.update: one call that restyles traces and relayouts the figure
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const TARGETS = { 'all traces': undefined, 'trace 0': 0, 'traces [0, 2]': [0, 2] } as const;
type Target = keyof typeof TARGETS;
const COLOURS = ['#60a5fa', '#f59e0b', '#34d399'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const trace = (k: number) => ({ y: [3, 1, 4, 1, 5].map((v) => v + k), mode: 'markers' as const, marker: { size: 14, color: COLOURS[k] }, name: `trace ${k}` });

  await Plotly.newPlot(
    stage.div,
    [trace(0), trace(1), trace(2)],
    { template: stage.template, title: { text: 'before' }, margin: stage.preview ? { t: 26 } : undefined, showlegend: !stage.preview },
    stage.config,
  );

  const apply = async (target: Target): Promise<void> => {
    await Plotly.restyle(stage.div, { 'marker.color': COLOURS });
    const layout_update = { title: { text: `some new title (${target})` } };
    const data_update = { 'marker.color': 'red' };
    const t = TARGETS[target];
    await Plotly.update(stage.div, data_update, layout_update, typeof t === 'object' ? [...t] : t);
  };

  const names = Object.keys(TARGETS) as Target[];
  if (stage.bar) select(stage.bar, 'traceIndices', names, names[0]!, (t) => void apply(t));
  if (stage.preview) stage.every(1600, (i) => void apply(names[i % names.length]!));

  return () => stage.dispose();
};

export default mount;
