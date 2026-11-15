// Binding a signal to an input element created outside the spec
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

let serial = 0;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The element must exist before the view is built. Vega only needs a `value` property and the
  // EventTarget interface, so it works with any input. Full view: it sits in the control bar.
  const input = document.createElement('input');
  input.type = 'range';
  input.min = '0';
  input.max = '100';
  input.value = '35';
  input.id = `vega-external-level-${++serial}`;
  const holder = stage.bar ?? el.appendChild(document.createElement('div'));
  holder.hidden = !stage.bar;
  holder.append(input);
  stage.own(() => (stage.bar ? input.remove() : holder.remove()));

  const spec: Spec = {
    width: 420,
    height: 90,
    padding: 5,

    signals: [
      // No `input` property: `element` points at the existing input, and `event` (default
      // "input") names the event to listen for. The signal starts as the input's own value.
      // The click handler makes it two-way: Vega writes the new value back into the input.
      {
        name: 'level',
        bind: { element: `#${input.id}`, event: 'input' },
        on: [{ events: 'click', update: 'round(clamp(x() / width * 100, 0, 100))' }],
      },
    ],

    scales: [{ name: 'x', type: 'linear', domain: [0, 100], range: 'width' }],

    marks: [
      {
        type: 'rect',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 20 },
            height: { value: 40 },
            x2: { scale: 'x', signal: 'toNumber(level)' },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { scale: 'x', signal: 'toNumber(level)', offset: 6 },
            y: { value: 40 },
            baseline: { value: 'middle' },
            text: { signal: 'toNumber(level)' },
            fill: { value: '#eee' },
          },
        },
      },
    ],
  };

  await stage.render(spec);

  // Cards: move the external input the way a reader would, by writing its value and firing "input".
  if (stage.preview) {
    stage.every(900, (i) => {
      input.value = String([80, 20, 55, 95, 10][i % 5]);
      input.dispatchEvent(new Event('input'));
    });
  }
  return () => stage.dispose();
};

export default mount;
