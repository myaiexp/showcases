// layout.sliders: each step is a method plus args, here restyle line.color
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['red', 'green', 'blue'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 380 });
  const steps = COLORS.map((c) => ({ label: c, method: 'restyle', args: ['line.color', c] }));

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3], y: [2, 1, 3], line: { width: 4 } }],
    {
      template: stage.template,
      margin: stage.preview ? { l: 34, r: 12, t: 10, b: 70 } : undefined,
      sliders: [{ pad: { t: stage.preview ? 20 : 30 }, currentvalue: { xanchor: 'right', prefix: 'color: ', font: { color: '#888', size: stage.preview ? 12 : 20 } }, steps }],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  // Cards move the slider with relayout and restyle the line, the pair a drag would do.
  if (stage.preview) {
    stage.every(1000, (i) => {
      void Plotly.relayout(stage.div, { 'sliders[0].active': i % 3 });
      void Plotly.restyle(stage.div, { 'line.color': at(COLORS, i) });
    });
  }

  return () => stage.dispose();
};

export default mount;
