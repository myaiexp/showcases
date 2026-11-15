// Plotly.relayout: nested attribute strings, including one element of an array
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const x = Array.from({ length: 11 }, (_, i) => i);

  await Plotly.newPlot(
    stage.div,
    [{ x, y: x.map((v) => v + Math.sin(v) * 2), mode: 'lines+markers' }],
    { template: stage.template, title: { text: 'original title' }, margin: stage.preview ? { t: 26 } : undefined },
    stage.config,
  );

  const relayout = (): Promise<unknown> =>
    // update only values within nested objects
    Plotly.relayout(stage.div, {
      title: { text: 'some new title' }, // updates the title
      'xaxis.range': [0, 5], // updates the xaxis range
      'yaxis.range[1]': 15, // updates the end of the yaxis range
    });
  const reset = (): Promise<unknown> =>
    Plotly.relayout(stage.div, { title: { text: 'original title' }, 'xaxis.autorange': true, 'yaxis.autorange': true });

  if (stage.bar) {
    button(stage.bar, 'relayout', () => void relayout());
    button(stage.bar, 'autorange again', () => void reset());
  }
  if (stage.preview) stage.every(1600, (i) => void (i % 2 ? relayout() : reset()));

  return () => stage.dispose();
};

export default mount;
