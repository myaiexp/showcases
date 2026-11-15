// @name selectors and the markname property pick one mark set among several of the same type
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 150,
    padding: 5,

    signals: [
      // Selector form: "@left" matches items of the mark named "left".
      { name: 'leftHot', value: null, on: [{ events: '@left:mouseover', update: 'datum.i' }, { events: '@left:mouseout', update: 'null' }] },
      // Object form: the same idea with the markname property.
      {
        name: 'rightHot',
        value: null,
        on: [
          { events: { type: 'mouseover', markname: 'right' }, update: 'datum.i' },
          { events: { type: 'mouseout', markname: 'right' }, update: 'null' },
        ],
      },
      // Both marks are rects, so "rect:mouseover" would see both.
      { name: 'anyRect', value: 0, on: [{ events: 'rect:mouseover', update: 'anyRect + 1' }] },
    ],

    data: [{ name: 'cells', values: [0, 1, 2, 3].map((i) => ({ i })) }],
    scales: [{ name: 'x', type: 'band', domain: [0, 1, 2, 3], range: [0, 190], padding: 0.15 }],

    marks: [
      line("'@left (selector): ' + leftHot + '  right (markname): ' + rightHot", 4),
      line("'rect:mouseover sees both: ' + anyRect", 22),
      {
        type: 'rect',
        name: 'left',
        from: { data: 'cells' },
        encode: {
          enter: { y: { value: 46 }, height: { value: 90 } },
          update: {
            x: { scale: 'x', field: 'i' },
            width: { scale: 'x', band: 1 },
            fill: [{ test: 'leftHot === datum.i', value: 'orange' }, { value: 'steelblue' }],
          },
        },
      },
      {
        type: 'rect',
        name: 'right',
        from: { data: 'cells' },
        encode: {
          enter: { y: { value: 46 }, height: { value: 90 } },
          update: {
            x: { scale: 'x', field: 'i', offset: 230 },
            width: { scale: 'x', band: 1 },
            fill: [{ test: 'rightHot === datum.i', value: '#2ecc71' }, { value: '#557' }],
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const x = view.scale('x');
    stage.every(600, (i) => {
      const k = i % 8;
      ghost.move(x(k % 4) + x.bandwidth() / 2 + (k < 4 ? 0 : 230), 90);
    });
  }
  return () => stage.dispose();
};

export default mount;
