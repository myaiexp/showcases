// domainMin and domainMax override the ends of a data-driven domain
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps, rng } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rand = rng(5);
  const values = Array.from({ length: 70 }, () => ({ a: Math.round(rand() * 100), b: Math.round(rand() * 100) }));

  const spec: Spec = {
    width: 380, height: 220, padding: 5,
    signals: [
      { name: 'lo', value: 0, bind: { input: 'range', min: 0, max: 50, step: 5, name: 'domainMin' } },
      { name: 'hi', value: 100, bind: { input: 'range', min: 55, max: 100, step: 5, name: 'domainMax' } },
    ],
    data: [{ name: 'table', values }],
    scales: [
      { name: 'x', type: 'linear', domain: { data: 'table', field: 'a' }, domainMin: { signal: 'lo' }, domainMax: { signal: 'hi' }, range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    axes: [{ orient: 'bottom', scale: 'x', grid: true, gridOpacity: 0.2 }, { orient: 'left', scale: 'y' }],
    marks: [{
      type: 'group', clip: true,
      encode: { enter: { x: { value: 0 }, y: { value: 0 }, width: { signal: 'width' }, height: { signal: 'height' } } },
      marks: [{
        type: 'symbol', from: { data: 'table' },
        encode: { update: { x: { scale: 'x', field: 'a' }, y: { scale: 'y', field: 'b' }, size: { value: 60 }, fill: { value: 'steelblue' }, fillOpacity: { value: 0.8 } } },
      }],
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ lo: 0, hi: 100 }, { lo: 30, hi: 100 }, { lo: 30, hi: 70 }, { lo: 0, hi: 60 }], 1500);
  return () => stage.dispose();
};

export default mount;
