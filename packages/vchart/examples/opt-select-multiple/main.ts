// Chart-level select: mode single/multiple, trigger and triggerOff
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const rows = groupedRows(CATS, ['North'], 4).map(({ x, y }) => ({ x, y }));

interface S {
  mode: 'single' | 'multiple';
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
    // mode, trigger and triggerOff are the three options this example is about.
    select: { enable: true, mode: s.mode, trigger: s.trigger, ...(s.triggerOff === 'none' ? {} : { triggerOff: s.triggerOff }) },
    bar: { style: { fill: '#4d7cff' }, state: { selected: { fill: '#ff8a3d', stroke: '#ffffff', lineWidth: 2 }, selected_reverse: { fillOpacity: 0.35 } } },
    tooltip: { visible: !preview },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const s: S = { mode: ctx.preview ? 'multiple' : 'single', trigger: 'pointertap', triggerOff: 'none' };
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let chart = createChart(el, ctx, spec(s, ctx.preview));
  let alive = true;
  const rebuild = (): void => {
    chart.release();
    chart = createChart(el, ctx, spec(s, ctx.preview));
    if (out) out.textContent = `select: ${JSON.stringify({ mode: s.mode, trigger: s.trigger, triggerOff: s.triggerOff })}`;
  };
  let stop = (): void => {};
  if (bar) {
    select(bar, 'mode', ['single', 'multiple'], (v) => {
      s.mode = v as S['mode'];
      rebuild();
    });
    select(bar, 'trigger', ['pointertap', 'pointerdown', 'pointerover'], (v) => {
      s.trigger = v;
      rebuild();
    });
    select(bar, 'triggerOff', ['none', 'empty', 'pointerleave'], (v) => {
      s.triggerOff = v;
      rebuild();
    });
    if (out) out.textContent = 'Click bars. In multiple mode a second click adds to the selection; "empty" clears it on a click on blank canvas.';
  } else {
    let i = 0;
    stop = every(900, () => {
      if (!alive) return;
      const n = i++ % 8;
      if (n === 7) chart.vchart.clearState('selected');
      else chart.vchart.setSelected({ x: CATS[n % CATS.length] });
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
