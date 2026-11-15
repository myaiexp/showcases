// Rects spanning x to x2 draw tasks on a time axis, shaded by a production rule
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 200, padding: 5,
    signals: [{ name: 'today', value: 30, bind: { input: 'range', min: 0, max: 100, step: 1 } }],
    data: [{ name: 'tasks', values: [
      { t: 'Plan', s: 0, e: 22 }, { t: 'Design', s: 15, e: 45 }, { t: 'Build', s: 35, e: 80 },
      { t: 'Test', s: 60, e: 90 }, { t: 'Ship', s: 85, e: 100 },
    ] }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'band', domain: { data: 'tasks', field: 't' }, range: 'height', padding: 0.25 },
    ],
    axes: [{ orient: 'bottom', scale: 'x', title: 'day' }, { orient: 'left', scale: 'y' }],
    marks: [
      {
        type: 'rect',
        from: { data: 'tasks' },
        encode: {
          update: {
            x: { scale: 'x', field: 's' }, x2: { scale: 'x', field: 'e' },
            y: { scale: 'y', field: 't' }, height: { scale: 'y', band: 1 }, cornerRadius: { value: 6 },
            fill: [
              { test: 'datum.e <= today', value: '#4caf7d' },
              { test: 'datum.s <= today', value: '#f59e0b' },
              { value: '#4a5568' },
            ],
          },
        },
      },
      { type: 'rule', encode: { update: { x: { signal: "scale('x', today)" }, y: { value: -4 }, y2: { signal: 'height' }, stroke: { value: 'tomato' }, strokeWidth: { value: 2 } } } },
    ],
  };

  const view = await stage.render(spec);

  if (stage.preview) stage.every(250, (i) => view.signal('today', (i * 3) % 104).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;
