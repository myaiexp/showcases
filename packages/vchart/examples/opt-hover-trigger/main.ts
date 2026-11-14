// Chart-level hover: trigger and triggerOff events, enable
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const rows = groupedRows(CATS, ['North'], 12).map(({ x, y }) => ({ x, y }));

interface S {
  enable: boolean;
  trigger: string;
  triggerOff: string;
}

const spec = (s: S, preview: boolean): ISpec =>
  ({
    type: 'bar',
    data: [{ id: 'd', values: rows }],
    xField: 'x',
    yField: 'y',
    legends: { visible: false },
    hover: { enable: s.enable, trigger: s.trigger, triggerOff: s.triggerOff.split(',') },
    bar: { style: { fill: '#4d7cff' }, state: { hover: { fill: '#ff8a3d' }, hover_reverse: { fillOpacity: 0.35 } } },
    tooltip: { visible: false },
    animation: !preview,
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const s: S = { enable: true, trigger: 'pointermove', triggerOff: 'pointermove,pointerleave' };
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let chart = createChart(el, ctx, spec(s, ctx.preview));
  let alive = true;
  const rebuild = (): void => {
    chart.release();
    chart = createChart(el, ctx, spec(s, ctx.preview));
    if (out) out.textContent = `hover: ${JSON.stringify({ enable: s.enable, trigger: s.trigger, triggerOff: s.triggerOff.split(',') })}`;
  };
  let stop = (): void => {};
  if (bar) {
    select(bar, 'enable', ['true', 'false'], (v) => {
      s.enable = v === 'true';
      rebuild();
    });
    select(bar, 'trigger', ['pointermove', 'pointerdown', 'pointertap'], (v) => {
      s.trigger = v;
      rebuild();
    });
    select(bar, 'triggerOff', ['pointermove,pointerleave', 'pointerleave', 'pointerup'], (v) => {
      s.triggerOff = v;
      rebuild();
    });
    if (out) out.textContent = 'Move over the bars, or press on them, depending on the trigger.';
  } else {
    let i = 0;
    stop = every(800, () => {
      if (alive) chart.vchart.setHovered({ x: CATS[i++ % CATS.length] });
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
