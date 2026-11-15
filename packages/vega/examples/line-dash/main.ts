// strokeDash arrays from an ordinal scale give each faceted line its own pattern
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = ['a', 'b', 'c', 'd', 'e'].flatMap((s, k) => Array.from({ length: 8 }, (_, i) => ({ s, i, v: 14 + k * 18 + 6 * Math.sin(i * 0.9 + k) })));

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [
      { name: 'strokeWidth', value: 3, bind: { input: 'range', min: 1, max: 9, step: 0.5 } },
      { name: 'strokeCap', value: 'butt', bind: { input: 'select', options: ['butt', 'round', 'square'] } },
    ],
    data: [{ name: 'table', values: rows }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 7], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
      { name: 'dash', type: 'ordinal', domain: ['a', 'b', 'c', 'd', 'e'], range: [[1, 0], [8, 8], [8, 4], [4, 2], [2, 1]] },
      { name: 'color', type: 'ordinal', domain: ['a', 'b', 'c', 'd', 'e'], range: ['#4fa3e0', '#f59e0b', '#7fd18b', '#e07fb0', '#c9b3ff'] },
    ],
    marks: [{
      type: 'group',
      from: { facet: { name: 'one', data: 'table', groupby: 's' } },
      marks: [{
        type: 'line',
        from: { data: 'one' },
        encode: {
          update: {
            x: { scale: 'x', field: 'i' }, y: { scale: 'y', field: 'v' },
            stroke: { scale: 'color', field: 's' },
            strokeDash: { scale: 'dash', field: 's' },
            strokeWidth: { signal: 'strokeWidth' }, strokeCap: { signal: 'strokeCap' },
          },
        },
      }],
    }],
  };

  const view = await stage.render(spec);

  cycleSteps(stage, view, [{ strokeWidth: 3, strokeCap: 'butt' }, { strokeWidth: 6, strokeCap: 'round' }, { strokeWidth: 2, strokeCap: 'square' }, { strokeWidth: 8, strokeCap: 'butt' }], 1400);
  return () => stage.dispose();
};

export default mount;
