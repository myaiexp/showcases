// Controls whose commands all set one attribute are bound to it and follow any restyle
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { at } from '../../shared/events-kit.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const COLORS = ['red', 'green', 'blue'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });
  const steps = COLORS.map((c) => ({ label: c, method: 'restyle', args: ['line.color', c] }));

  await Plotly.newPlot(
    stage.div,
    [{ x: [1, 2, 3], y: [2, 1, 3], line: { width: 4 } }],
    {
      template: stage.template,
      margin: stage.preview ? { l: 34, r: 12, t: 10, b: 80 } : { b: 110 },
      sliders: [{ pad: { t: 30 }, len: 0.5, x: 0.5, currentvalue: { xanchor: 'right', prefix: 'color: ', font: { color: '#888', size: stage.preview ? 12 : 20 } }, steps }],
      updatemenus: [{ pad: { t: 60, r: 30 }, type: 'buttons', xanchor: 'left', yanchor: 'top', x: 0, y: 0, direction: 'right', buttons: steps }],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  // A plain restyle from code: the slider and the buttons both move to match it.
  if (stage.preview) stage.every(1000, (i) => void Plotly.restyle(stage.div, { 'line.color': at(COLORS, i) }));
  if (stage.bar) {
    let i = 0;
    button(stage.bar, 'restyle line.color from code', () => void Plotly.restyle(stage.div, { 'line.color': at(COLORS, ++i) }));
  }

  return () => stage.dispose();
};

export default mount;
