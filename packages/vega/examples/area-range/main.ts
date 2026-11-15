// An area mark whose y and y2 both come from data draws a band between two series
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle, rng } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(21);
  const rows = Array.from({ length: 24 }, (_, i) => ({ t: i, mid: Math.round(50 + 24 * Math.sin(i / 3.2) + (rand() - 0.5) * 10), w: 8 + rand() * 10 }));

  const spec: Spec = {
    width: 440, height: 210, padding: 5,
    signals: [{ name: 'spread', value: 1, bind: { input: 'range', min: 0.2, max: 2.5, step: 0.1 } }],
    data: [{ name: 'table', values: rows }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 23], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'left', scale: 'y', grid: true, tickCount: 5 }],
    marks: [
      {
        type: 'area',
        from: { data: 'table' },
        encode: {
          enter: { fill: { value: 'steelblue' }, fillOpacity: { value: 0.45 } },
          update: {
            interpolate: { value: 'monotone' },
            x: { scale: 'x', field: 't' },
            y: { signal: "scale('y', datum.mid + datum.w * spread)" },
            y2: { signal: "scale('y', datum.mid - datum.w * spread)" },
          },
        },
      },
      {
        type: 'line',
        from: { data: 'table' },
        encode: { update: { interpolate: { value: 'monotone' }, x: { scale: 'x', field: 't' }, y: { scale: 'y', field: 'mid' }, stroke: { value: 'orange' }, strokeWidth: { value: 2 } } },
      },
    ],
  };

  const view = await stage.render(spec);

  cycle(stage, view, 'spread', [1, 2.2, 0.4, 1.5], 1300);
  return () => stage.dispose();
};

export default mount;
