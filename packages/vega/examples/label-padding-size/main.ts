// size is the box labels must fit in; padding lets them spill past it by a few pixels
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { namedPoints } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    padding: 5,
    signals: [
      { name: 'boxW', value: 440, bind: { input: 'range', min: 200, max: 440, step: 10 } },
      { name: 'boxH', value: 240, bind: { input: 'range', min: 120, max: 240, step: 10 } },
      { name: 'padding', value: 0, bind: { input: 'range', min: 0, max: 40, step: 2 } },
    ],
    data: [{ name: 'points', values: namedPoints(5, 24) }],
    scales: [
      { name: 'x', domain: [0, 1], range: 'width' },
      { name: 'y', domain: [0, 1], range: 'height' },
    ],
    marks: [
      {
        // The label box, drawn so the reader sees what size means.
        type: 'rect',
        interactive: false,
        encode: {
          update: {
            x: { value: 0 },
            y: { value: 0 },
            width: { signal: 'boxW' },
            height: { signal: 'boxH' },
            fill: { value: 'transparent' },
            stroke: { value: '#e8a33d' },
            strokeDash: { value: [5, 4] },
          },
        },
      },
      {
        name: 'dots',
        type: 'symbol',
        from: { data: 'points' },
        encode: { enter: { fill: { value: 'steelblue' }, size: { value: 50 }, x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' } } },
      },
      {
        type: 'text',
        from: { data: 'dots' },
        encode: { enter: { text: { field: 'datum.name' }, fontSize: { value: 10 }, fill: { value: '#ddd' } } },
        transform: [
          {
            type: 'label',
            size: [{ signal: 'boxW' }, { signal: 'boxH' }],
            padding: { signal: 'padding' },
            anchor: ['top', 'right', 'bottom', 'left'],
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { boxW: 440, boxH: 240, padding: 0 },
    { boxW: 300, boxH: 170, padding: 0 },
    { boxW: 300, boxH: 170, padding: 30 },
  ], 1900);
  return () => stage.dispose();
};

export default mount;
