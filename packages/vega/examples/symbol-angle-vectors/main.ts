// arrow, wedge, triangle and stroke symbols rotated by angle to show a flow field
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const grid = Array.from({ length: 12 * 6 }, (_, n) => ({ cx: n % 12, cy: Math.floor(n / 12) }));

  const spec: Spec = {
    width: 440, height: 220, padding: 5,
    signals: [
      { name: 'shape', value: 'arrow', bind: { input: 'select', options: ['arrow', 'wedge', 'triangle', 'stroke'] } },
      { name: 'phase', value: 0, bind: { input: 'range', min: 0, max: 6.28, step: 0.05 } },
    ],
    data: [{ name: 'cells', values: grid }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 11], range: [20, 420] },
      { name: 'y', type: 'linear', domain: [0, 5], range: [20, 200] },
      { name: 'speed', type: 'linear', domain: [-1, 1], range: ['#4fa3e0', '#f59e0b'] },
    ],
    marks: [{
      type: 'symbol',
      from: { data: 'cells' },
      encode: {
        enter: { x: { scale: 'x', field: 'cx' }, y: { scale: 'y', field: 'cy' }, size: { value: 420 }, strokeWidth: { value: 2 } },
        update: {
          shape: { signal: 'shape' },
          // The flow direction in degrees, turning with position and phase.
          angle: { signal: '90 + 90 * sin(datum.cx / 2.2 + phase) + 60 * cos(datum.cy / 1.6 - phase)' },
          fill: { signal: "scale('speed', sin(datum.cx / 2.2 + phase))" },
          stroke: { signal: "scale('speed', sin(datum.cx / 2.2 + phase))" },
        },
      },
    }],
  };

  const view = await stage.render(spec);

  if (stage.preview) stage.every(100, (i) => view.signal('phase', (i * 0.12) % 6.28).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;
