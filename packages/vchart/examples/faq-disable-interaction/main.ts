// FAQ: use a chart as a picture with the disableTriggerEvent constructor option
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rows = (seed: number): { month: string; sales: number }[] => {
  const r = rng(seed);
  return DAYS.map((month) => ({ month, sales: Math.round(10 + r() * 30) }));
};
const spec: ISpec = { type: 'bar', data: [{ id: 'd', values: rows(1) }], xField: 'month', yField: 'sales' };

const mount: Mount = (el, ctx) => {
  let events = 0;
  const log = ctx.preview ? null : readout(el);
  const show = (disabled: boolean): void => {
    if (log) log.textContent = `${disabled ? 'disableTriggerEvent: true' : 'interactive'}: ${events} hover/click events received`;
  };
  let disabled = true;
  let chart = createChart(el, ctx, spec, { init: { disableTriggerEvent: disabled } });
  const wire = (): void => {
    // With the option on, the chart emits no pointer events and shows no tooltip or hover state.
    const count = (): void => {
      events += 1;
      show(disabled);
    };
    chart.vchart.on('pointerover', { level: 'mark' }, count);
    chart.vchart.on('click', { level: 'mark' }, count);
  };
  wire();
  show(disabled);
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'chart', ['picture only', 'interactive'], (v) => {
      chart.release();
      events = 0;
      disabled = v === 'picture only';
      chart = createChart(el, ctx, spec, { init: { disableTriggerEvent: disabled } });
      wire();
      show(disabled);
    });
  }
  let seed = 1;
  const stop = every(2000, () => {
    seed += 1;
    void chart.vchart.updateData('d', rows(seed));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
