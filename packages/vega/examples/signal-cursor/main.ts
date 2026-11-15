// The reserved cursor signal holds the pointer style for a whole drag
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
      { name: 'dragging', value: false, on: [{ events: 'symbol:mousedown', update: 'true' }, { events: 'window:mouseup', update: 'false' }] },
      { name: 'px', value: 210, on: [{ events: '[symbol:mousedown, window:mouseup] > window:mousemove', update: 'clamp(x(), 14, width - 14)' }] },
      // A signal named cursor overrides the marks' own cursor property while it is set. It stays
      // "grabbing" for the whole drag, even when the pointer slips off the symbol.
      // "default" hands control back to the mark-level cursor.
      {
        name: 'cursor',
        description: 'The CSS cursor for the whole view.',
        value: 'default',
        update: "dragging ? 'grabbing' : 'default'",
      },
    ],

    marks: [
      line("'cursor signal: ' + cursor", 4),
      {
        type: 'symbol',
        encode: {
          enter: { size: { value: 1500 }, y: { value: 85 }, cursor: { value: 'grab' } },
          update: { x: { signal: 'px' }, fill: { signal: "dragging ? 'orange' : 'steelblue'" } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const stops = [210, 330, 90];
    stage.every(2200, (i) => ghost.drag([stops[(i - 1) % 3] ?? 210, 85], [stops[i % 3] ?? 210, 85], 1200));
  }
  return () => stage.dispose();
};

export default mount;
