// nice extends an irregular data domain to round values, with a tick count for finer control
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(9);
  const values = [{ v: 0.2014, j: 0.5 }, { v: 0.9967, j: 0.5 }, ...Array.from({ length: 30 }, () => ({ v: 0.2014 + rand() * 0.7953, j: rand() }))];

  const spec: Spec = {
    width: 440, height: 130, padding: 5,
    signals: [
      { name: 'ticks', value: 0, bind: { input: 'range', min: 0, max: 12, step: 1, name: 'nice (0 off, 1 true, n ticks)' } },
    ],
    data: [{ name: 'table', values }],
    scales: [
      {
        name: 'x', type: 'linear', zero: false, domain: { data: 'table', field: 'v' }, range: 'width',
        nice: { signal: 'ticks == 0 ? false : ticks == 1 ? true : ticks' },
      },
      { name: 'y', type: 'linear', domain: [0, 1], range: [15, 110] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', grid: true, gridOpacity: 0.2 }],
    marks: [
      { type: 'rule', encode: { update: { x: { scale: 'x', value: 0.2014 }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: 'orange' }, strokeDash: { value: [4, 3] } } } },
      { type: 'rule', encode: { update: { x: { scale: 'x', value: 0.9967 }, y: { value: 0 }, y2: { signal: 'height' }, stroke: { value: 'orange' }, strokeDash: { value: [4, 3] } } } },
      {
        type: 'symbol', from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'v' }, y: { scale: 'y', field: 'j' }, size: { value: 50 }, fill: { value: 'steelblue' } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ ticks: 0 }, { ticks: 1 }, { ticks: 4 }, { ticks: 10 }, { ticks: 2 }], 1500);
  return () => stage.dispose();
};

export default mount;
