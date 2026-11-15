// A trail along a spiral whose width fades with age, windowed to the latest points
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const spiral = Array.from({ length: 120 }, (_, i) => ({ i, x: 200 + (30 + i * 1.2) * Math.cos(i / 6), y: 130 + (20 + i * 0.8) * Math.sin(i / 6) }));

  const spec: Spec = {
    width: 400, height: 260, padding: 5,
    signals: [{ name: 'head', value: 119, bind: { input: 'range', min: 0, max: 160, step: 1 } }],
    data: [{ name: 'path', values: spiral }],
    scales: [{ name: 'w', type: 'linear', domain: [0, 40], range: [0, 12], clamp: true }],
    marks: [{
      type: 'trail',
      from: { data: 'path' },
      encode: {
        enter: { fill: { value: '#8fd3ff' } },
        update: {
          x: { field: 'x' }, y: { field: 'y' },
          // Wider toward the head, thin at the tail; only the last 40 points exist.
          size: { signal: "scale('w', 40 - (head - datum.i)) * 1" },
          defined: { signal: 'datum.i <= head && datum.i > head - 40' },
          fillOpacity: { signal: "0.3 + 0.7 * scale('w', 40 - (head - datum.i)) / 12" },
        },
      },
    }],
  };

  const view = await stage.render(spec);

  if (stage.preview) stage.every(60, (i) => view.signal('head', 40 + (i % 125)).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;
