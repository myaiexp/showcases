// startAngle and endAngle turn a pie into a gauge or any wedge of a circle
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 260,
    height: 260,
    padding: 5,
    autosize: 'none',
    signals: [
      { name: 'startAngle', value: 0, bind: { input: 'range', min: -3.14, max: 3.14, step: 0.01 } },
      { name: 'endAngle', value: 6.28, bind: { input: 'range', min: 0, max: 6.28, step: 0.01 } },
      { name: 'innerRadius', value: 50, bind: { input: 'range', min: 0, max: 110, step: 1 } },
    ],
    data: [
      {
        name: 'table',
        values: [{ id: 'a', v: 4 }, { id: 'b', v: 6 }, { id: 'c', v: 10 }, { id: 'd', v: 3 }, { id: 'e', v: 7 }, { id: 'f', v: 8 }],
        transform: [{ type: 'pie', field: 'v', startAngle: { signal: 'startAngle' }, endAngle: { signal: 'endAngle' } }],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category10' } }],
    marks: [
      {
        type: 'arc',
        from: { data: 'table' },
        encode: {
          enter: { fill: { scale: 'color', field: 'id' }, x: { signal: 'width / 2' }, y: { signal: 'height / 2' }, stroke: { value: '#1a1a1a' } },
          update: {
            startAngle: { field: 'startAngle' },
            endAngle: { field: 'endAngle' },
            innerRadius: { signal: 'innerRadius' },
            outerRadius: { signal: 'width / 2' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { startAngle: -1.57, endAngle: 1.57 },
    { startAngle: 0, endAngle: 6.28 },
    { startAngle: -2.4, endAngle: 2.4 },
    { startAngle: 0.8, endAngle: 5.5 },
  ], 1700);
  return () => stage.dispose();
};

export default mount;
