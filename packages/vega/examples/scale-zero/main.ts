// zero decides whether a linear domain is stretched to include 0
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 420, height: 200, padding: 5,
    signals: [{ name: 'z', value: true, bind: { input: 'checkbox', name: 'zero' } }],
    data: [{
      name: 'series',
      transform: [
        { type: 'sequence', start: 0, stop: 30, as: 'x' },
        { type: 'formula', as: 'y', expr: '50 + 8 * sin(datum.x / 3) + 2 * cos(datum.x * 1.9)' },
      ],
    }],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 29], range: 'width' },
      { name: 'y', type: 'linear', zero: { signal: 'z' }, nice: true, domain: { data: 'series', field: 'y' }, range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }, { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2 }],
    marks: [{
      type: 'line', from: { data: 'series' },
      encode: { update: { x: { scale: 'x', field: 'x' }, y: { scale: 'y', field: 'y' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 2.5 } } },
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ z: true }, { z: false }], 1600);
  return () => stage.dispose();
};

export default mount;
