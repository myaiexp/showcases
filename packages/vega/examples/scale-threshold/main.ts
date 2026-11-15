// Threshold scale: red, white and blue regions between two moving cut points
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(3);
  const values = Array.from({ length: 70 }, () => ({ v: (rand() + rand() + rand() - 1.5) * 2.4, j: rand() }));

  const spec: Spec = {
    width: 440, height: 130, padding: 5,
    signals: [{ name: 't', value: 0.5, bind: { input: 'range', min: 0, max: 1.5, step: 0.05, name: 'cut points ±' } }],
    data: [{ name: 'table', values }],
    scales: [
      { name: 'x', type: 'linear', domain: [-2, 2], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 1], range: [15, 110] },
      // Two thresholds, three colours: below -t, between, above t.
      { name: 'color', type: 'threshold', domain: [{ signal: '-t' }, { signal: 't' }], range: ['red', 'white', 'dodgerblue'] },
    ],
    axes: [{ orient: 'bottom', scale: 'x' }],
    marks: [
      {
        type: 'rule', encode: { update: { x: { scale: 'x', signal: '-t' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: '#888' }, strokeDash: { value: [4, 4] } } },
      },
      {
        type: 'rule', encode: { update: { x: { scale: 'x', signal: 't' }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: '#888' }, strokeDash: { value: [4, 4] } } },
      },
      {
        type: 'symbol', from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'v' }, y: { scale: 'y', field: 'j' }, size: { value: 90 }, fill: { scale: 'color', field: 'v' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ t: 0.5 }, { t: 1.2 }, { t: 0.1 }, { t: 0.8 }], 1400);
  return () => stage.dispose();
};

export default mount;
