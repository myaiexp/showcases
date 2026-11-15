// Domain fields across two data sets plus a literal array, so one y scale fits both
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [{ name: 'k', value: 1, bind: { input: 'range', min: 0.5, max: 4, step: 0.5, name: 'cost x' } }],
    data: [
      { name: 'prices', values: [{ item: 'a', price: 22 }, { item: 'b', price: 35 }, { item: 'c', price: 18 }, { item: 'd', price: 41 }, { item: 'e', price: 30 }] },
      {
        name: 'costs', values: [{ item: 'a', cost: 9 }, { item: 'b', cost: 14 }, { item: 'c', cost: 7 }, { item: 'd', cost: 16 }, { item: 'e', cost: 12 }],
        transform: [{ type: 'formula', as: 'cost', expr: 'datum.cost * k' }],
      },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'prices', field: 'item' }, range: 'width', padding: 0.2 },
      {
        name: 'y', type: 'linear', range: 'height', nice: true,
        // Two data references and a literal array, merged into one [min, max].
        domain: { fields: [{ data: 'prices', field: 'price' }, { data: 'costs', field: 'cost' }, [0, 40]] },
      },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2 }],
    marks: [
      {
        type: 'rect', from: { data: 'prices' },
        encode: { update: {
          x: { scale: 'x', field: 'item' }, width: { scale: 'x', band: 0.5 },
          y: { scale: 'y', field: 'price' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' },
        } },
      },
      {
        type: 'rect', from: { data: 'costs' },
        encode: { update: {
          x: { scale: 'x', field: 'item', offset: { scale: 'x', band: 0.5 } }, width: { scale: 'x', band: 0.5 },
          y: { scale: 'y', field: 'cost' }, y2: { scale: 'y', value: 0 }, fill: { value: 'orange' },
        } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ k: 1 }, { k: 3 }, { k: 4 }, { k: 0.5 }], 1500);
  return () => stage.dispose();
};

export default mount;
