// Time scale: a stock price line whose date domain starts later and later
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440, height: 200, padding: 5,
    signals: [{ name: 'start', value: 2000, bind: { input: 'range', min: 2000, max: 2008, step: 1, name: 'start year' } }],
    data: [{
      name: 'stocks', url: 'data/stocks.csv',
      format: { type: 'csv', parse: { price: 'number', date: 'date' } },
      transform: [{ type: 'filter', expr: "datum.symbol === 'MSFT'" }],
    }],
    scales: [
      // Domain endpoints are dates, built from signals with datetime().
      { name: 'x', type: 'time', domain: [{ signal: 'datetime(start, 0, 1)' }, { signal: 'datetime(2010, 2, 1)' }], range: 'width' },
      { name: 'y', type: 'linear', domain: { data: 'stocks', field: 'price' }, nice: true, range: 'height' },
    ],
    axes: [
      { orient: 'bottom', scale: 'x' },
      { orient: 'left', scale: 'y', grid: true, gridOpacity: 0.2, title: 'price' },
    ],
    marks: [{
      type: 'group', clip: true,
      encode: { enter: { x: { value: 0 }, y: { value: 0 }, width: { signal: 'width' }, height: { signal: 'height' } } },
      marks: [{
        type: 'line', from: { data: 'stocks' },
        encode: { update: { x: { scale: 'x', field: 'date' }, y: { scale: 'y', field: 'price' }, stroke: { value: 'steelblue' }, strokeWidth: { value: 2 } } },
      }],
    }],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ start: 2000 }, { start: 2003 }, { start: 2006 }, { start: 2008 }], 1500);
  return () => stage.dispose();
};

export default mount;
