// A group mark carries local data, scales, axes and marks: a sub-plot
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400, height: 240, padding: 5,
    // The top-level signal is visible inside the group; the group's scales use it.
    signals: [{ name: 'top', value: 100, bind: { input: 'range', min: 60, max: 200, step: 5 } }],
    marks: [{
      type: 'group',
      encode: { update: { x: { value: 40 }, y: { value: 10 }, width: { value: 340 }, height: { value: 190 }, fill: { value: '#202633' } } },
      data: [{ name: 'local', values: [['Mon', 40], ['Tue', 72], ['Wed', 55], ['Thu', 90], ['Fri', 63]].map(([d, v]) => ({ d, v })) }],
      scales: [
        { name: 'x', type: 'band', domain: { data: 'local', field: 'd' }, range: 'width', padding: 0.2 },
        { name: 'y', type: 'linear', domain: [0, { signal: 'top' }], range: 'height', clamp: true },
      ],
      axes: [
        { orient: 'bottom', scale: 'x' },
        { orient: 'left', scale: 'y', grid: true, tickCount: 5 },
      ],
      marks: [{
        type: 'rect',
        from: { data: 'local' },
        encode: {
          update: { x: { scale: 'x', field: 'd' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 }, fill: { value: 'steelblue' } },
          hover: { fill: { value: 'orange' } },
        },
      }],
    }],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'top', [100, 160, 80, 200], 1300);
  return () => stage.dispose();
};

export default mount;
