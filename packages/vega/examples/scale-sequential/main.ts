// Sequential scale (deprecated): a heatmap coloured by a fixed viridis interpolator
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 240, padding: 5,
    signals: [{ name: 'top', value: 100, bind: { input: 'range', min: 40, max: 100, step: 5 } }],
    data: [{
      name: 'cells',
      transform: [
        { type: 'sequence', start: 0, stop: 112, as: 'n' },
        { type: 'formula', as: 'col', expr: 'datum.n % 14' },
        { type: 'formula', as: 'row', expr: 'floor(datum.n / 14)' },
        { type: 'formula', as: 'v', expr: '50 + 50 * sin(datum.col / 2.2) * cos(datum.row / 1.6)' },
      ],
    }],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'cells', field: 'col' }, range: 'width', padding: 0.05 },
      { name: 'y', type: 'band', domain: { data: 'cells', field: 'row' }, range: 'height', padding: 0.05 },
      // Deprecated since Vega 5 (use linear + a colour range), but still documented and working.
      { name: 'color', type: 'sequential', domain: [0, 100], domainMax: { signal: 'top' }, range: { scheme: 'viridis' }, clamp: true },
    ],
    legends: [{ fill: 'color', type: 'gradient', gradientLength: 200 }],
    marks: [{
      type: 'rect', from: { data: 'cells' },
      encode: { update: {
        x: { scale: 'x', field: 'col' }, width: { scale: 'x', band: 1 },
        y: { scale: 'y', field: 'row' }, height: { scale: 'y', band: 1 }, fill: { scale: 'color', field: 'v' },
      } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ top: 100 }, { top: 70 }, { top: 45 }, { top: 85 }]);
  return () => stage.dispose();
};

export default mount;
