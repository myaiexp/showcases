// updatemenus dropdowns whose buttons restyle line.color and visible
import Plotly from 'plotly.js';
import type { Layout } from 'plotly.js';
import type { Mount } from '@/types.ts';
import { applyButton, at, normals } from '../../shared/events-kit.ts';
import type { Btn } from '../../shared/events-kit.ts';
import { createStage } from '../../shared/stage.ts';

const colorButtons: Btn[] = ['red', 'blue', 'green'].map((c) => ({ method: 'restyle', args: ['line.color', c], label: c }));
const setButtons: Btn[] = [0, 1, 2, 3].map((i) => ({
  method: 'restyle',
  args: ['visible', [0, 1, 2, 3].map((k) => k === i)],
  label: `Data set ${i}`,
}));

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 400 });

  await Plotly.newPlot(
    stage.div,
    [0, 1, 2, 3].map((i) => ({
      y: normals(131 + i, 10, 0.5, 0.2).map((v) => Math.abs(v)),
      line: { shape: 'spline' as const, color: 'red' },
      visible: i === 0,
      name: `Data set ${i}`,
    })),
    {
      template: stage.template,
      updatemenus: stage.preview ? [] : [{ y: 0.8, yanchor: 'top', buttons: colorButtons }, { y: 1, yanchor: 'top', buttons: setButtons }],
    } as unknown as Partial<Layout>,
    stage.config,
  );

  // Cards have no menu to open: they apply the buttons' own args in turn.
  if (stage.preview) {
    stage.every(900, (i) => {
      void applyButton(stage.div, at(colorButtons, i));
      if (i % 3 === 0) void applyButton(stage.div, at(setButtons, i / 3));
    });
  }

  return () => stage.dispose();
};

export default mount;
