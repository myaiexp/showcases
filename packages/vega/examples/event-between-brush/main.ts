// [start, stop] > stream: only events between two others, here a drag-to-brush
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
      { name: 'start', value: null, on: [{ events: 'mousedown', update: 'x()' }] },
      // Between filter: mousemove counts only after a mousedown and before the next mouseup.
      // The window is the source of the moves and the ending mouseup, so the drag survives
      // the pointer leaving the view.
      {
        name: 'end',
        value: null,
        on: [
          { events: 'mousedown', update: 'null' },
          { events: '[mousedown, window:mouseup] > window:mousemove', update: 'clamp(x(), 0, width)' },
        ],
      },
    ],

    marks: [
      line("start == null || end == null ? 'drag across the view' : 'brush: ' + round(min(start, end)) + ' to ' + round(max(start, end))", 4),
      {
        type: 'rect',
        encode: {
          update: {
            x: { signal: 'min(start, end)' },
            x2: { signal: 'max(start, end)' },
            y: { value: 30 },
            y2: { signal: 'height' },
            fill: { value: 'steelblue' },
            fillOpacity: { signal: 'start == null || end == null ? 0 : 0.5' },
            stroke: { value: 'steelblue' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const runs: [number, number][] = [[60, 250], [300, 120], [90, 360]];
    stage.every(1700, (i) => {
      const [a, b] = runs[i % 3] ?? [0, 0];
      return ghost.drag([a, 90], [b, 100], 1100);
    });
  }
  return () => stage.dispose();
};

export default mount;
