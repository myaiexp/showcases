// makeTemplate copies one figure's styling into a template for another figure
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const mount: Mount = async (el, ctx) => {
  const row = document.createElement('div');
  row.className = 'pair';
  el.append(row);
  const stage = createStage(row, ctx, { height: 340 });
  // The full view draws the source figure too, in a second graph div on the left.
  const source = stage.preview ? null : document.createElement('div');
  if (source) {
    source.className = stage.div.className;
    source.style.height = stage.div.style.height;
    row.prepend(source);
    stage.own(() => Plotly.purge(source));
  }

  const figure = {
    data: [{ type: 'bar' as const, marker: { color: 'red' }, y: [2, 1, 3, 2] }],
    layout: { template: stage.template, title: { text: 'Quarterly Earnings' }, bargap: 0.5 },
  };
  if (source) await Plotly.newPlot(source, figure.data, figure.layout, stage.config);

  const template = Plotly.makeTemplate(figure);
  const newData = [{ type: 'bar' as const, y: [3, 2, 5, 8] }];
  // Only data: the colour, the gap and the title come from the template.
  await Plotly.newPlot(stage.div, newData, { template }, stage.config);

  if (stage.preview) stage.every(1800, (i) => {
    const y = [3, 2, 5, 8].map((v) => v * (0.6 + ((i * 7 + v) % 5) / 6));
    void Plotly.react(stage.div, [{ type: 'bar', y }], { template }, stage.config);
  });

  return () => {
    stage.dispose();
    row.remove();
  };
};

export default mount;
