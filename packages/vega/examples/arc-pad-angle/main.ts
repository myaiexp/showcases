// padAngle opens a gap between pie slices; innerRadius turns the pie into a donut
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 220, height: 220, padding: 5,
    signals: [
      { name: 'padAngle', value: 0.05, bind: { input: 'range', min: 0, max: 0.4, step: 0.01 } },
      { name: 'innerRadius', value: 40, bind: { input: 'range', min: 0, max: 100, step: 1 } },
    ],
    data: [{
      name: 'table',
      values: [{ id: 1, field: 4 }, { id: 2, field: 6 }, { id: 3, field: 10 }, { id: 4, field: 3 }, { id: 5, field: 7 }, { id: 6, field: 8 }],
      transform: [{ type: 'pie', field: 'field' }],
    }],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category20' } }],
    marks: [{
      type: 'arc',
      from: { data: 'table' },
      encode: {
        enter: { fill: { scale: 'color', field: 'id' }, x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
        update: {
          startAngle: { field: 'startAngle' }, endAngle: { field: 'endAngle' },
          padAngle: { signal: 'padAngle' }, innerRadius: { signal: 'innerRadius' }, outerRadius: { signal: 'width / 2' },
        },
        hover: { fillOpacity: { value: 0.7 } },
      },
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ padAngle: 0, innerRadius: 0 }, { padAngle: 0.08, innerRadius: 40 }, { padAngle: 0.25, innerRadius: 70 }, { padAngle: 0.12, innerRadius: 20 }], 1300);
  return () => stage.dispose();
};

export default mount;
