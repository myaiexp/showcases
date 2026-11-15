// The docs' drag pattern: start on a mark, track and end on the window
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 140,
    padding: 5,

    signals: [
      // Where inside the rect the pointer grabbed it (declared first: handlers run in order).
      { name: 'grab', value: 0, on: [{ events: 'rect:mousedown', update: 'x() - cx' }] },
      // [rect:mousedown, window:mouseup] > window:mousemove: the window keeps reporting moves
      // when the pointer leaves the rect or the view, and x() stays relative to the data
      // rectangle, so it goes negative or past the width. Nothing clamps it here.
      {
        name: 'cx',
        value: 210,
        on: [{ events: '[rect:mousedown, window:mouseup] > window:mousemove', update: 'x() - grab' }],
      },
      { name: 'dragging', value: false, on: [{ events: 'rect:mousedown', update: 'true' }, { events: 'window:mouseup', update: 'false' }] },
    ],

    marks: [
      line("'rect centre x = ' + round(cx) + (cx < 0 || cx > width ? '  (outside the view)' : '')", 4),
      {
        type: 'rect',
        encode: {
          update: {
            xc: { signal: 'cx' },
            width: { value: 70 },
            y: { value: 50 },
            height: { value: 60 },
            fill: { signal: "dragging ? 'orange' : 'steelblue'" },
            cursor: { value: 'grab' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    // Out past the right edge and back, in one drag each way.
    stage.every(2400, (i) => (i % 2 ? ghost.drag([210, 80], [440, 80], 1300) : ghost.drag([440, 80], [210, 80], 1300)));
  }
  return () => stage.dispose();
};

export default mount;
