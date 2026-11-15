// timeSequence, utcSequence, timeOffset and timeInterval along one date range
import * as vega from 'vega';
import { api } from '../../shared/vega-api.ts';
import type { Spec, TimeUnit } from 'vega';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const units: TimeUnit[] = ['date', 'week', 'month'];
const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const start = new Date(2024, 0, 10, 15, 30);
  const stop = new Date(2024, 5, 20);

  const spec: Spec = {
    width: 460,
    height: 130,
    padding: 8,
    signals: [{ name: 'label', value: '' }, { name: 'label2', value: '' }],
    data: [{ name: 'seq', values: [] }],
    scales: [
      { name: 'x', type: 'time', domain: [+start - 864e5 * 5, +stop], range: 'width' },
      { name: 'y', type: 'point', domain: ['timeSequence', 'utcSequence', 'timeOffset'], range: [28, 100] },
    ],
    axes: [{ orient: 'bottom', scale: 'x', tickCount: 6 }, { orient: 'left', scale: 'y', ticks: false, domain: false, labelFontSize: 10 }],
    marks: [
      {
        type: 'rect',
        from: { data: 'seq' },
        encode: { update: { x: { scale: 'x', field: 't' }, width: { value: 2 }, yc: { scale: 'y', field: 'row' }, height: { value: 22 }, fill: { signal: "datum.row == 'timeOffset' ? '#f59e0b' : datum.row == 'utcSequence' ? '#7dd3fc' : 'steelblue'" } } },
      },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: -2 }, text: { signal: 'label' }, fill: { value: '#ddd' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
      { type: 'text', encode: { update: { x: { value: 0 }, y: { value: 8 }, text: { signal: 'label2' }, fill: { value: '#a6acb8' }, font: { value: 'monospace' }, fontSize: { value: 11 } } } },
    ],
  };
  const view = await stage.render(spec);

  const apply = async (unit: TimeUnit, step: number): Promise<void> => {
    const local = api.timeSequence(unit, start, stop, step);
    const utc = api.utcSequence(unit, start, stop, step);
    // The same ticks built one timeOffset at a time, from the start date.
    const chain = Array.from({ length: local.length }, (_, k) => api.timeOffset(unit, start, k * step));
    const rows = [
      ...local.map((d) => ({ t: +d, row: 'timeSequence' })),
      ...utc.map((d) => ({ t: +d, row: 'utcSequence' })),
      ...chain.filter((d) => +d < +stop).map((d) => ({ t: +d, row: 'timeOffset' })),
    ];
    view.data('seq', rows);
    const floor = api.timeInterval(unit).floor(start);
    view.signal('label', `timeSequence('${unit}', start, stop, ${step})  →  ${local.length} dates`);
    view.signal('label2', `timeInterval('${unit}').floor(start) = ${floor.toISOString().slice(0, 16)}Z`);
    await view.runAsync();
  };
  let unit: TimeUnit = 'week';
  let step = 1;
  await apply(unit, step);
  if (stage.bar) {
    select(stage.bar, 'unit', units, unit, (v) => void apply((unit = v), step));
    slider(stage.bar, 'step', [1, 6, 1], step, (v) => void apply(unit, (step = v)));
  }
  if (stage.preview) {
    const combos: [TimeUnit, number][] = [['week', 1], ['date', 9], ['month', 1], ['week', 3], ['date', 5]];
    stage.every(1500, (i) => apply(...(combos[i % combos.length] ?? combos[0]!)));
  }
  return () => stage.dispose();
};

export default mount;
