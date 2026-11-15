// validateTemplate reports where a figure and a template do not line up
import Plotly from 'plotly.js';
import type { Data } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { readout, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 300, previewHeight: 110 });
  const out = readout(el);

  // A template made from a bar figure.
  const template = Plotly.makeTemplate({
    data: [{ type: 'bar', marker: { color: 'red' }, y: [2, 1, 3, 2] }],
    layout: { title: { text: 'Quarterly Earnings' } },
  });

  const FIGURES: Record<string, Data[]> = {
    'a scatter figure': [{ type: 'scatter', y: [1, 3, 2, 4] }],
    'a bar figure': [{ type: 'bar', y: [3, 2, 5, 8] }],
    'two bar traces': [{ type: 'bar', y: [3, 2, 5, 8] }, { type: 'bar', y: [1, 4, 2, 3] }],
  };
  const names = Object.keys(FIGURES);

  const show = async (name: string): Promise<void> => {
    const figure = { data: FIGURES[name]!, layout: { template } };
    const issues = Plotly.validateTemplate(figure, template) ?? [];
    out.textContent = issues.length ? issues.map((r) => r.msg).join('\n') : 'validateTemplate: no issues';
    await Plotly.react(stage.div, figure.data, { ...figure.layout, title: { text: name } }, stage.config);
  };

  if (stage.bar) select(stage.bar, 'figure', names, names[0]!, (n) => void show(n));
  await show(names[0]!);
  if (stage.preview) stage.every(2200, (i) => void show(names[i % names.length]!));

  return () => {
    out.remove();
    stage.dispose();
  };
};

export default mount;
