// plotly_restyle and plotly_relayout hand the handler the changed attributes, not the graph
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at, normals, output } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['#f472b6', '#34d399', '#60a5fa', '#f59e0b'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 360 });
  const out = output(stage, el);
  const lines: string[] = [];
  const say = (text: string): void => {
    lines.unshift(text);
    lines.length = Math.min(lines.length, stage.preview ? 1 : 6);
    out.set(lines.join('\n'));
  };

  await Plotly.newPlot(
    stage.div,
    [{ x: Array.from({ length: 24 }, (_, i) => i), y: normals(8, 24), type: 'scatter', mode: 'lines+markers' }],
    { template: stage.template },
    stage.config,
  );

  // restyle payload: [updateObject, traceIndices]; relayout payload: {attribute: value}.
  stage.div.on('plotly_restyle', (d) => say(`plotly_restyle ${JSON.stringify(d)}`));
  stage.div.on('plotly_relayout', (d) => say(`plotly_relayout ${JSON.stringify(d)}`));

  const restyle = (i: number): void => void Plotly.restyle(stage.div, { 'line.color': at(COLORS, i) }, [0]);
  const relayout = (i: number): void => void Plotly.relayout(stage.div, { 'xaxis.range': i % 2 ? [4, 18] : [0, 23] });
  if (stage.preview) stage.every(1000, (i) => (i % 2 ? restyle(i) : relayout(i)));
  if (stage.bar) {
    let i = 0;
    button(stage.bar, 'restyle line.color', () => restyle(++i));
    button(stage.bar, 'relayout xaxis.range', () => relayout(++i));
    button(stage.bar, 'relayout autorange', () => void Plotly.relayout(stage.div, { 'xaxis.autorange': true }));
  }

  return () => stage.dispose();
};

export default mount;
