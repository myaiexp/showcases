// Counting the basic input event types a view receives
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line, sleep } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 190,
    padding: 5,

    // Each handler's `events` is a selector string: a bare event type listens on the whole view.
    signals: [
      { name: 'moves', value: 0, on: [{ events: 'mousemove', update: 'moves + 1' }] },
      { name: 'downs', value: 0, on: [{ events: 'mousedown', update: 'downs + 1' }] },
      { name: 'ups', value: 0, on: [{ events: 'mouseup', update: 'ups + 1' }] },
      { name: 'clicks', value: 0, on: [{ events: 'click', update: 'clicks + 1' }] },
      { name: 'doubles', value: 0, on: [{ events: 'dblclick', update: 'doubles + 1' }] },
      { name: 'wheels', value: 0, on: [{ events: 'wheel', update: 'wheels + 1' }] },
      { name: 'at', value: [0, 0], on: [{ events: 'mousemove', update: '[round(x()), round(y())]' }] },
    ],

    marks: [
      line("'mousemove  ' + moves", 4),
      line("'mousedown  ' + downs", 28),
      line("'mouseup    ' + ups", 52),
      line("'click      ' + clicks", 76),
      line("'dblclick   ' + doubles", 100),
      line("'wheel      ' + wheels", 124),
      line("'pointer at ' + at[0] + ', ' + at[1]", 160, { fill: { value: '#9ad' } }),
      {
        type: 'symbol',
        encode: {
          update: { x: { signal: 'at[0]' }, y: { signal: 'at[1]' }, size: { value: 120 }, fill: { value: 'orange' }, fillOpacity: { value: 0.8 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(1800, async (i) => {
      ghost.move(60 + (i % 5) * 70, 80 + (i % 3) * 30);
      await sleep(200);
      if (i % 2) ghost.click(250, 100);
      else ghost.dblclick(300, 60);
      ghost.wheel(200, 100, 40);
    });
  }
  return () => stage.dispose();
};

export default mount;
