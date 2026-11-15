// defined false breaks a line; strokeCap round keeps an isolated point visible
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 180, padding: 5,
    signals: [
      { name: 'gaps', value: true, bind: { input: 'checkbox' } },
      { name: 'strokeCap', value: 'butt', bind: { input: 'select', options: ['butt', 'round', 'square'] } },
    ],
    data: [{ name: 'table', values: [[1, 30, 1], [2, 60, 1], [3, 45, 0], [4, 75, 1], [5, 40, 0], [6, 55, 1], [7, 35, 1], [8, 70, 1]].map(([u, v, ok]) => ({ u, v, ok })) }],
    scales: [
      { name: 'x', type: 'linear', domain: [1, 8], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    marks: [
      {
        type: 'line',
        from: { data: 'table' },
        encode: {
          enter: { stroke: { value: 'orange' }, strokeWidth: { value: 14 } },
          update: {
            x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' },
            // Points 3 and 5 are undefined: point 4 sits alone between them.
            defined: { signal: '!gaps || datum.ok === 1' },
            strokeCap: { signal: 'strokeCap' },
          },
        },
      },
      { type: 'symbol', from: { data: 'table' }, encode: { update: { x: { scale: 'x', field: 'u' }, y: { scale: 'y', field: 'v' }, size: { value: 30 }, fill: { signal: "datum.ok ? '#fff' : 'tomato'" } } } },
    ],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ strokeCap: 'butt' }, { strokeCap: 'round' }, { strokeCap: 'butt', gaps: false }, { strokeCap: 'square', gaps: true }], 1300);
  return () => stage.dispose();
};

export default mount;
