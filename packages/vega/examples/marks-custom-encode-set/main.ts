// Signal handlers invoke named encode sets on the mark under the pointer
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    data: [{ name: 'table', values: [44, 72, 31, 86, 58, 66].map((v, i) => ({ k: 'ABCDEF'[i] ?? '', v })) }],
    // The handlers send "select" or "release" to the item that got the event.
    signals: [
      {
        name: 'press',
        on: [
          { events: 'rect:mousedown', encode: 'select' },
          { events: 'rect:mouseup', encode: 'release' },
        ],
      },
    ],
    scales: [
      { name: 'x', type: 'band', domain: { data: 'table', field: 'k' }, range: 'width', padding: 0.15 },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      {
        type: 'rect',
        from: { data: 'table' },
        encode: {
          enter: {
            x: { scale: 'x', field: 'k' },
            width: { scale: 'x', band: 1 },
            y: { scale: 'y', field: 'v' },
            y2: { scale: 'y', value: 0 },
          },
          update: { fill: { value: 'steelblue' } },
          hover: { fill: { value: '#6aa6d6' } },
          // Custom sets: arbitrary names, any properties.
          select: { fill: { value: 'orange' }, stroke: { value: '#fff' }, strokeWidth: { value: 3 } },
          release: { fill: { value: 'steelblue' }, strokeWidth: { value: 0 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    const mid = x.bandwidth() / 2;
    stage.every(550, (i) => {
      const bar = Math.floor(i / 2) % 6;
      const px = x('ABCDEF'[bar]) + mid;
      if (i % 2) ghost.down(px, 190);
      else ghost.up(px, 190);
    });
  }
  return () => stage.dispose();
};

export default mount;
