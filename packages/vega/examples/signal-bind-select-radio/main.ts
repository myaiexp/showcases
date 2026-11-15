// Select, radio and checkbox bindings, with option values, labels and a custom name
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420,
    height: 120,
    padding: 5,

    signals: [
      // select: the signal takes the option value; labels (5.9+) are what the reader sees.
      {
        name: 'shape',
        value: 'circle',
        bind: { input: 'select', options: ['circle', 'square', 'diamond', 'triangle-up'], labels: ['Circle', 'Square', 'Diamond', 'Triangle'] },
      },
      // radio: the same options/labels shape, shown as a group of buttons.
      {
        name: 'fill',
        value: '#4682b4',
        bind: { input: 'radio', options: ['#4682b4', '#ff9f43', '#2ecc71'], labels: ['Blue', 'Orange', 'Green'], name: 'Colour' },
      },
      // checkbox: a boolean signal.
      { name: 'outline', value: false, bind: { input: 'checkbox', name: 'Outline' } },
    ],

    data: [{ name: 'dots', transform: [{ type: 'sequence', start: 0, stop: 7, as: 'i' }] }],

    marks: [
      {
        type: 'symbol',
        from: { data: 'dots' },
        encode: {
          update: {
            x: { signal: '30 + datum.i * 52' },
            y: { signal: 'height / 2' },
            size: { value: 1400 },
            shape: { signal: 'shape' },
            fill: { signal: 'fill' },
            stroke: { signal: "outline ? '#fff' : null" },
            strokeWidth: { value: 3 },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(
    stage,
    view,
    [
      { shape: 'square', fill: '#ff9f43', outline: true },
      { shape: 'diamond', fill: '#2ecc71', outline: false },
      { shape: 'triangle-up', fill: '#4682b4', outline: true },
      { shape: 'circle', fill: '#ff9f43', outline: false },
    ],
    1300,
  );
  return () => stage.dispose();
};

export default mount;
