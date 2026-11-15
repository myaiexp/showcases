// Keyboard events come from the window source, filtered per key and consumed
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { line } from '../../shared/signals-kit.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 170,
    padding: 5,

    signals: [
      // window:keydown! consumes the key (no page scroll), but only for the keys that pass the filter.
      {
        name: 'px',
        value: 210,
        on: [
          { events: "window:keydown![event.key === 'ArrowLeft']", update: 'max(px - 20, 12)' },
          { events: "window:keydown![event.key === 'ArrowRight']", update: 'min(px + 20, width - 12)' },
        ],
      },
      {
        name: 'py',
        value: 100,
        on: [
          { events: "window:keydown![event.key === 'ArrowUp']", update: 'max(py - 20, 40)' },
          { events: "window:keydown![event.key === 'ArrowDown']", update: 'min(py + 20, height - 12)' },
        ],
      },
      // An unfiltered stream sees every key, including letters.
      { name: 'lastKey', value: '-', on: [{ events: 'window:keydown', update: 'event.key' }] },
      { name: 'released', value: 0, on: [{ events: 'window:keyup', update: 'released + 1' }] },
    ],

    marks: [
      line("'last key: ' + lastKey + '   keyups: ' + released", 4),
      line(`'${stage.preview ? 'arrow keys move the dot' : 'press the arrow keys, or any other key'}'`, 22, { fill: { value: '#999' }, fontSize: { value: 11 } }),
      { type: 'symbol', encode: { update: { x: { signal: 'px' }, y: { signal: 'py' }, size: { value: 700 }, fill: { value: 'orange' } } } },
    ],
  };

  await stage.render(spec);

  // Cards have no keyboard: send the keys to the window, which is the stream's source.
  if (stage.preview) {
    const keys = ['ArrowRight', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowUp', 'ArrowRight'];
    stage.every(500, (i) => {
      const key = keys[i % keys.length] ?? 'ArrowRight';
      window.dispatchEvent(new KeyboardEvent('keydown', { key, cancelable: true }));
      window.dispatchEvent(new KeyboardEvent('keyup', { key }));
    });
  }
  return () => stage.dispose();
};

export default mount;
