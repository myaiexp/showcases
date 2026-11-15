// Object form: marktype and a filter array whose expressions must all pass
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { fire, line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 150,
    padding: 5,

    signals: [
      { name: 'anyPress', value: 0, on: [{ events: 'rect:mousedown', update: 'anyPress + 1' }] },
      // Every expression in `filter` must be truthy, and none may read signals.
      {
        name: 'ctrlPress',
        value: 0,
        on: [
          { events: { type: 'mousedown', marktype: 'rect', filter: ['event.ctrlKey', 'event.button === 0'] }, update: 'ctrlPress + 1' },
        ],
      },
      { name: 'ctrlOnly', value: 0, on: [{ events: { type: 'mousedown', marktype: 'rect', filter: 'event.ctrlKey' }, update: 'ctrlOnly + 1' }] },
    ],

    marks: [
      line("'rect:mousedown                     ' + anyPress", 4),
      line("'ctrl + left button, filter array   ' + ctrlPress", 24),
      line("'ctrl, single filter string         ' + ctrlOnly", 44),
      line('"(hold Ctrl and click the rect)"', 64, { fill: { value: '#999' }, fontSize: { value: 11 } }),
      { type: 'rect', encode: { update: { x: { value: 130 }, y: { value: 90 }, width: { value: 160 }, height: { value: 50 }, fill: { value: 'steelblue' } } } },
    ],
  };

  const view = await stage.render(spec);
  if (stage.preview) {
    stage.every(800, (i) => {
      const init: MouseEventInit = { ctrlKey: i % 2 === 0, button: i % 4 === 3 ? 2 : 0 };
      fire(view, 'mousedown', 200, 115, init);
    });
  }
  return () => stage.dispose();
};

export default mount;
