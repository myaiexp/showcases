// Signal handlers: update sets a value, encode re-runs a mark's own encode set
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line, sleep } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 150,
    padding: 5,

    signals: [
      // update: the expression's result becomes the signal value.
      { name: 'count', value: 0, on: [{ events: 'rect:mouseover', update: 'count + 1' }] },
      // encode: no new value; the named encode set of the mark under the pointer is re-evaluated.
      // The rect mark below defines the sets "select" and "release".
      {
        name: 'clickEncode',
        on: [
          { events: '*:mousedown', encode: 'select' },
          { events: '*:mouseup', encode: 'release' },
        ],
      },
    ],

    data: [{ name: 'cells', values: [0, 1, 2, 3, 4].map((i) => ({ i })) }],
    scales: [{ name: 'x', type: 'band', domain: [0, 1, 2, 3, 4], range: 'width', padding: 0.15 }],

    marks: [
      {
        type: 'rect',
        name: 'boxes',
        from: { data: 'cells' },
        encode: {
          enter: { x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 }, y: { value: 40 }, height: { value: 90 } },
          update: { fill: { value: 'steelblue' } },
          select: { fill: { value: 'orange' } },
          release: { fill: { value: 'seagreen' } },
        },
      },
      line("'rect:mouseover count: ' + count", 6),
    ],
  };

  const view = await stage.render(spec);

  // Cards: the pointer visits each rect and presses it, so the fills change by the encode sets.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    stage.every(1500, async (i) => {
      const px = x(i % 5) + x.bandwidth() / 2;
      ghost.move(px, 90);
      ghost.down(px, 90);
      await sleep(500);
      ghost.up(px, 90);
    });
  }
  return () => stage.dispose();
};

export default mount;
