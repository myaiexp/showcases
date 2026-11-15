// react: false stops an update expression from following its dependencies
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 110,
    padding: 5,

    signals: [
      { name: 'source', value: 20, bind: { input: 'range', min: 0, max: 100, step: 1 } },
      // Reacts: re-evaluated on every change of `source`.
      { name: 'live', update: 'source' },
      // react: false registers no dependency, so it keeps the value from its first evaluation...
      { name: 'frozen', update: 'source', react: false },
      // ...until an event handler sets it. A click snapshots the current source value.
      { name: 'snapshot', update: 'source', react: false, on: [{ events: 'click', update: 'source' }] },
    ],

    marks: [
      line("'source   = ' + source", 4),
      line("'live     = ' + live + '   (follows source)'", 28),
      line("'frozen   = ' + frozen + '   (react: false)'", 52),
      line("'snapshot = ' + snapshot + '   (click: refresh)'", 76),
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    cycle(stage, view, 'source', [20, 60, 85, 35], 1100);
    stage.every(2300, () => ghost.click(200, 60));
  }
  return () => stage.dispose();
};

export default mount;
