// interactions: element-select, with isMultiple and triggerOff 'empty' | a number | an event name
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';

const CATS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const rows = groupedRows(CATS, ['North'], 31).map(({ x, y }) => ({ x, y }));

interface S {
  isMultiple: boolean;
  triggerOff: string;
}

const spec = (s: S): ISpec =>
  ({
    type: 'bar',
    data: [{ id: 'd', values: rows }],
    xField: 'x',
    yField: 'y',
    legends: { visible: false },
    hover: false,
    select: false,
    interactions: [
      {
        type: 'element-select',
        trigger: 'click',
        isMultiple: s.isMultiple,
        // 'empty' clears on a click on blank space, a number clears after that many ms.
        triggerOff: /^\d+$/.test(s.triggerOff) ? Number(s.triggerOff) : s.triggerOff,
      },
    ],
    bar: { style: { fill: '#4d7cff' }, state: { selected: { fill: '#ff8a3d', stroke: '#ffffff', lineWidth: 2 } } },
    tooltip: { visible: false },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const s: S = { isMultiple: true, triggerOff: 'empty' };
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let chart = createChart(el, ctx, spec(s));
  let alive = true;
  const rebuild = (): void => {
    chart.release();
    chart = createChart(el, ctx, spec(s));
    if (out) out.textContent = `element-select: ${JSON.stringify({ isMultiple: s.isMultiple, triggerOff: s.triggerOff })}`;
  };
  let stop = (): void => {};
  if (bar) {
    select(bar, 'isMultiple', ['true', 'false'], (v) => {
      s.isMultiple = v === 'true';
      rebuild();
    });
    select(bar, 'triggerOff', ['empty', '1500', 'pointerout'], (v) => {
      s.triggerOff = v;
      rebuild();
    });
    if (out) out.textContent = 'Click bars to select them; triggerOff decides when the selection clears.';
  } else {
    // The card has no pointer: put the selected state on one more bar every tick, then clear.
    let i = 0;
    stop = every(800, () => {
      if (!alive) return;
      const n = i++ % (CATS.length + 1);
      if (n === CATS.length) void chart.vchart.clearState('selected');
      else {
        const picked = CATS.slice(0, n + 1);
        void chart.vchart.updateState({ selected: { filter: (d) => picked.includes(String(d['x'])) } });
      }
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
