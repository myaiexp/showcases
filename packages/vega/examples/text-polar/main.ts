// radius and theta place text on a circle around its x and y, like arc marks
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300, height: 300, padding: 5,
    signals: [
      { name: 'radius', value: 110, bind: { input: 'range', min: 30, max: 140, step: 1 } },
      { name: 'spin', value: 0, bind: { input: 'range', min: 0, max: 6.28, step: 0.05 } },
    ],
    data: [{ name: 'hours', values: ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map((t, i) => ({ t, i })) }],
    marks: [
      { type: 'symbol', interactive: false, encode: { update: { x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, size: { value: 60 }, fill: { value: 'tomato' } } } },
      {
        type: 'text',
        from: { data: 'hours' },
        encode: {
          update: {
            x: { signal: 'width / 2' }, y: { signal: 'height / 2' },
            radius: { signal: 'radius' },
            theta: { signal: 'datum.i * PI / 6 + spin' },
            // Turn each label so its baseline faces the centre.
            angle: { signal: '(datum.i * PI / 6 + spin) * 180 / PI' },
            align: { value: 'center' }, baseline: { value: 'middle' },
            text: { field: 't' }, fontSize: { value: 18 }, fill: { value: 'orange' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  if (stage.preview) stage.every(100, (i) => view.signal('spin', (i * 0.1) % 6.28).signal('radius', 90 + 40 * Math.sin(i / 8)).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;
