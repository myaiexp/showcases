// Four indicators in a 2x2 layout.grid, with a template for shared defaults
import Plotly from 'plotly.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { height: 420 });

  await Plotly.newPlot(
    stage.div,
    [
      { type: 'indicator', value: 200, delta: { reference: 160 }, gauge: { axis: { visible: false, range: [0, 250] } }, domain: { row: 0, column: 0 } },
      { type: 'indicator', value: 120, gauge: { shape: 'bullet', axis: { visible: false, range: [-200, 200] } }, domain: { x: [0.1, 0.5], y: [0.15, 0.35] } },
      { type: 'indicator', mode: 'number+delta', value: 300, domain: { row: 0, column: 1 } },
      { type: 'indicator', mode: 'delta', value: 40, domain: { row: 1, column: 1 } },
    ],
    {
      // A template fills in what each indicator leaves unset: title, mode and delta reference.
      template: {
        ...stage.template,
        data: { ...stage.template.data, indicator: [{ title: { text: 'Speed' }, mode: 'number+delta+gauge', delta: { reference: 90 } }] },
      },
      margin: { t: 25, b: 25, l: 25, r: 25 },
      grid: { rows: 2, columns: 2, pattern: 'independent' },
    },
    stage.config,
  );

  const set = (v: number): void => void Plotly.restyle(stage.div, { value: [v, v * 0.6 - 60, v * 1.5, v / 5] });
  if (stage.bar) slider(stage.bar, 'first value', [0, 250, 5], 200, set);
  else stage.every(150, (i) => set(Math.round(125 + 110 * Math.sin(i / 8))));

  return () => stage.dispose();
};

export default mount;
