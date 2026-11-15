// Scale functions: gradient(scale, p0, p1, count) paints a rectangle with a colour scale along a line
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 200,
    padding: 8,
    signals: [
      { name: 'turn', value: 0, bind: { input: 'range', min: 0, max: 360, step: 5 } },
      { name: 'count', value: 12, bind: { input: 'range', min: 2, max: 40, step: 1 } },
      // The gradient line runs through the middle of the box, in normalised [0, 1] coordinates.
      { name: 'p0', update: '[0.5 - 0.5 * cos(turn * PI / 180), 0.5 - 0.5 * sin(turn * PI / 180)]' },
      { name: 'p1', update: '[0.5 + 0.5 * cos(turn * PI / 180), 0.5 + 0.5 * sin(turn * PI / 180)]' },
    ],
    scales: [{ name: 'heat', type: 'linear', domain: [0, 1], range: { scheme: 'viridis' } }],
    marks: [
      {
        type: 'rect',
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 0 },
            width: { signal: 'width' },
            height: { signal: 'height' },
            cornerRadius: { value: 10 },
            fill: { signal: 'gradient("heat", p0, p1, count)' },
          },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { signal: 'width / 2' },
            y: { signal: 'height + 18' },
            align: { value: 'center' },
            fill: { value: '#ddd' },
            fontSize: { value: 11 },
            text: { signal: "'gradient(\"heat\", [' + format(p0[0], '.2f') + ', ' + format(p0[1], '.2f') + '], [' + format(p1[0], '.2f') + ', ' + format(p1[1], '.2f') + '], ' + count + ')'" },
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
      { turn: 0, count: 12 },
      { turn: 45, count: 12 },
      { turn: 90, count: 5 },
      { turn: 180, count: 20 },
      { turn: 300, count: 3 },
      { turn: 330, count: 40 },
    ],
    1100,
  );
  return () => stage.dispose();
};

export default mount;
