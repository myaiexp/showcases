// Labels try one anchor around each point, pushed away by an offset; middle needs avoidBaseMark off
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { namedPoints } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const ANCHORS = ['top', 'right', 'bottom', 'left', 'top-right', 'bottom-left', 'middle'];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 260,
    padding: 5,
    signals: [
      { name: 'anchor', value: 'top', bind: { input: 'select', options: ANCHORS } },
      { name: 'offset', value: 2, bind: { input: 'range', min: 0, max: 20, step: 1 } },
      { name: 'avoidBase', value: true, bind: { input: 'checkbox' } },
    ],
    data: [{ name: 'points', values: namedPoints(21, 16) }],
    scales: [
      { name: 'x', domain: [0, 1], range: 'width' },
      { name: 'y', domain: [0, 1], range: 'height' },
    ],
    marks: [
      {
        name: 'dots',
        type: 'symbol',
        from: { data: 'points' },
        encode: {
          enter: { fill: { value: 'steelblue' }, size: { value: 110 }, stroke: { value: '#ddd' } },
          update: { x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' } },
        },
      },
      {
        type: 'text',
        from: { data: 'dots' },
        encode: { enter: { text: { field: 'datum.name' }, fontSize: { value: 11 }, fill: { value: '#ddd' } } },
        transform: [
          {
            // anchor and offset are parallel lists: the first anchor gets the first offset.
            type: 'label',
            // Signals inside these list parameters are typed as plain values in the Spec type, hence the casts.
            anchor: [{ signal: 'anchor' }] as never,
            offset: [{ signal: 'offset' }] as never,
            avoidBaseMark: { signal: 'avoidBase' },
            size: [{ signal: 'width' }, { signal: 'height' }],
          },
        ],
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { anchor: 'top', offset: 2 },
    { anchor: 'right', offset: 8 },
    { anchor: 'bottom', offset: 2 },
    { anchor: 'left', offset: 14 },
    { anchor: 'top-right', offset: 4 },
  ], 1500);
  return () => stage.dispose();
};

export default mount;
