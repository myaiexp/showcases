// All of the symbol shapes, built in and custom, from one data set of shape names
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 480, height: 190, padding: 5,
    signals: [
      { name: 'angle', value: 0, bind: { input: 'range', min: -360, max: 360, step: 1 } },
      { name: 'size', value: 1600, bind: { input: 'range', min: 0, max: 4000, step: 100 } },
      { name: 'strokeWidth', value: 3, bind: { input: 'range', min: 0, max: 8, step: 0.5 } },
    ],
    data: [{
      name: 'shapes',
      values: [
        'circle', 'square', 'cross', 'diamond', 'triangle-up', 'triangle-down', 'triangle-right',
        'triangle-left', 'arrow', 'wedge', 'triangle', 'stroke',
        'M-1,-1H1V1H-1Z', 'M0,.5L.6,.8L.5,.1L1,-.3L.3,-.4L0,-1L-.3,-.4L-1,-.3L-.5,.1L-.6,.8L0,.5Z',
      ].map((shape, i) => ({ shape, i, label: shape.length > 14 ? 'custom path' : shape })),
    }],
    marks: [
      {
        type: 'symbol',
        from: { data: 'shapes' },
        encode: {
          enter: { fill: { value: 'steelblue' }, stroke: { value: 'orange' } },
          update: {
            x: { signal: '40 + (datum.i % 7) * 66' }, y: { signal: '40 + floor(datum.i / 7) * 95' },
            shape: { field: 'shape' }, size: { signal: 'size' }, angle: { signal: 'angle' }, strokeWidth: { signal: 'strokeWidth' },
          },
          hover: { fill: { value: 'orange' } },
        },
      },
      {
        type: 'text',
        interactive: false,
        from: { data: 'shapes' },
        encode: {
          update: {
            x: { signal: '40 + (datum.i % 7) * 66' }, y: { signal: '72 + floor(datum.i / 7) * 95' },
            align: { value: 'center' }, text: { field: 'label' }, fontSize: { value: 9 }, fill: { value: '#aaa' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ angle: 0, size: 1600 }, { angle: 90, size: 900 }, { angle: 180, size: 2200 }, { angle: 330, size: 1200 }], 1300);
  return () => stage.dispose();
};

export default mount;
