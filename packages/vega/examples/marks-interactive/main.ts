// interactive false removes a mark from hover and events; a signal can flip it
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 170, padding: 5,
    signals: [
      { name: 'liveB', value: false, bind: { input: 'checkbox' } },
      { name: 'last', value: 'nothing yet', on: [{ events: 'rect:mouseover', update: 'datum.name' }] },
    ],
    data: [
      { name: 'top', values: ['A', 'B', 'C', 'D', 'E'].map((k, i) => ({ name: 'top ' + k, k, v: 40 + i * 10 })) },
      { name: 'bottom', values: ['A', 'B', 'C', 'D', 'E'].map((k, i) => ({ name: 'bottom ' + k, k, v: 90 - i * 12 })) },
    ],
    scales: [
      { name: 'x', type: 'band', domain: ['A', 'B', 'C', 'D', 'E'], range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: [60, 0] },
    ],
    marks: [
      {
        type: 'rect', from: { data: 'top' },
        encode: {
          enter: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 } },
          update: { fill: { value: 'steelblue' } },
          hover: { fill: { value: 'orange' } },
        },
      },
      {
        type: 'group',
        encode: { update: { y: { value: 90 } } },
        marks: [{
          type: 'rect', from: { data: 'bottom' },
          // A literal false works too; a signal can flip it at run time.
          interactive: { signal: 'liveB' },
          encode: {
            enter: { x: { scale: 'x', field: 'k' }, width: { scale: 'x', band: 1 }, y: { scale: 'y', field: 'v' }, y2: { scale: 'y', value: 0 } },
            update: { fill: { value: '#4f8a6a' } },
            hover: { fill: { value: 'orange' } },
          },
        }],
      },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { signal: 'height + 4' }, baseline: { value: 'top' }, text: { signal: "'last mouseover: ' + last" }, fontSize: { value: 12 } } } },
    ],
  };

  const view = await stage.render(spec);

  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    const mid = x.bandwidth() / 2;
    stage.every(500, (i) => {
      // Alternate rows, five steps each, while the bottom row switches on and off.
      const row = Math.floor(i / 5) % 2;
      ghost.move(x('ABCDE'[i % 5]) + mid, row ? 130 : 30);
      if (i % 10 === 5) view.signal('liveB', true).runAsync();
      if (i % 10 === 0) view.signal('liveB', false).runAsync();
    });
  }
  return () => stage.dispose();
};

export default mount;
