// Look up a trace's index by name in div.data, then deleteTraces; names stay valid as indices shift
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { normals } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = ['alpha', 'beta', 'gamma', 'delta', 'epsilon'];
const make = (): Data[] =>
  NAMES.map((name, k) => ({ x: Array.from({ length: 20 }, (_, i) => i), y: normals(121 + k, 20, k * 3), type: 'scatter', mode: 'lines', name }));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });

  await Plotly.newPlot(stage.div, make(), { template: stage.template, showlegend: !stage.preview }, stage.config);

  const remove = (name: string): void => {
    const index = stage.div.data.findIndex((t) => t.name === name);
    if (index >= 0) void Plotly.deleteTraces(stage.div, index);
  };
  if (stage.bar) {
    const bar = stage.bar;
    const sel = document.createElement('select');
    for (const n of NAMES) sel.add(new Option(n, n));
    bar.append('trace', sel);
    button(bar, 'Delete it', () => remove(sel.value));
    button(bar, 'Restore all', () => void Plotly.react(stage.div, make(), stage.div.layout));
  }
  if (stage.preview) {
    const order = ['gamma', 'alpha', 'epsilon', 'beta'];
    stage.every(900, (i) => {
      if (i % 6 === 5) void Plotly.react(stage.div, make(), stage.div.layout);
      else remove(order[(i - 1) % 6] ?? '');
    });
  }

  return () => stage.dispose();
};

export default mount;
