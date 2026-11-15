// One arc mark: angles, radii and corner radius, all driven by signals
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 220, height: 220, padding: 5,
    signals: [
      { name: 'startAngle', value: -0.73, bind: { input: 'range', min: -6.28, max: 6.28, step: 0.01 } },
      { name: 'endAngle', value: 0.73, bind: { input: 'range', min: -6.28, max: 6.28, step: 0.01 } },
      { name: 'padAngle', value: 0, bind: { input: 'range', min: 0, max: 1.57, step: 0.01 } },
      { name: 'innerRadius', value: 0, bind: { input: 'range', min: 0, max: 100, step: 1 } },
      { name: 'outerRadius', value: 80, bind: { input: 'range', min: 0, max: 100, step: 1 } },
      { name: 'cornerRadius', value: 0, bind: { input: 'range', min: 0, max: 50, step: 1 } },
      { name: 'strokeWidth', value: 4, bind: { input: 'range', min: 0, max: 10, step: 0.5 } },
    ],
    marks: [
      // The arc's x and y are its centre, marked here.
      { type: 'symbol', interactive: false, encode: { update: { x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, fill: { value: 'tomato' }, size: { value: 25 } } } },
      {
        type: 'arc',
        encode: {
          enter: { fill: { value: 'steelblue' }, stroke: { value: 'orange' } },
          update: {
            x: { signal: 'width / 2' }, y: { signal: 'height / 2' },
            startAngle: { signal: 'startAngle' }, endAngle: { signal: 'endAngle' },
            innerRadius: { signal: 'innerRadius' }, outerRadius: { signal: 'outerRadius' },
            cornerRadius: { signal: 'cornerRadius' }, padAngle: { signal: 'padAngle' },
            strokeWidth: { signal: 'strokeWidth' },
          },
          hover: { opacity: { value: 0.6 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [
    { startAngle: -0.73, endAngle: 0.73, innerRadius: 0, cornerRadius: 0 },
    { startAngle: -1.5, endAngle: 2.2, innerRadius: 30, cornerRadius: 0 },
    { startAngle: -3, endAngle: 3.4, innerRadius: 50, cornerRadius: 12 },
    { startAngle: 0.2, endAngle: 1.4, innerRadius: 20, cornerRadius: 20 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;
