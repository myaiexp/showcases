// select, unselect and toggleSelect through dispatchAction, with listeners attached by on() and removed by off()
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const selectStyle = { itemStyle: { color: '#fac858', borderColor: '#fff', borderWidth: 2 } };
  chart.setOption({
    legend: {},
    tooltip: { show: false },
    grid: { top: 24, left: 40, right: 16, bottom: 60 },
    xAxis: { type: 'category', data: cats },
    yAxis: { type: 'value' },
    series: [
      // selectedMode lets data items be selected; `select` is the style they get.
      { name: 'Sales', type: 'bar', selectedMode: 'multiple', select: selectStyle, data: [40, 52, 36, 61, 47] },
      { name: 'Costs', type: 'bar', selectedMode: 'multiple', select: selectStyle, data: [25, 31, 28, 35, 30] },
    ],
  });

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(800, () => {
      // seriesIndex and dataIndex pick the item; toggleSelect flips it.
      chart.dispatchAction({ type: 'toggleSelect', seriesIndex: i % 2, dataIndex: Math.floor(i / 2) % cats.length });
      i += 1;
    });
  } else {
    const log = document.createElement('pre');
    log.style.cssText = 'margin:8px 0 0;font-size:12px;max-height:150px;overflow:auto';
    const lines: string[] = [];
    const write = (s: string): void => {
      lines.unshift(s);
      lines.length = Math.min(lines.length, 8);
      log.textContent = lines.join('\n');
    };

    // Three listeners, each with a different query form.
    const handlers = {
      'selectchanged (no query)': { event: 'selectchanged', query: null, fn: (e: unknown) => {
        const p = e as { fromAction: string; selected: { seriesIndex: number; dataIndex: number[] }[] };
        write(`selectchanged from ${p.fromAction}: ${p.selected.map((s) => `series ${s.seriesIndex} -> [${s.dataIndex}]`).join('; ') || 'nothing selected'}`);
      } },
      "click, {seriesName: 'Costs'}": { event: 'click', query: { seriesName: 'Costs' }, fn: (e: unknown) => write(`click on Costs, ${(e as { name: string }).name}`) },
      "mouseover, 'series.bar'": { event: 'mouseover', query: 'series.bar', fn: (e: unknown) => write(`mouseover a bar (${(e as { seriesName: string }).seriesName})`) },
    };
    type Key = keyof typeof handlers;
    const attached = new Set<Key>();
    const attach = (k: Key): void => {
      const h = handlers[k];
      if (h.query === null) chart.on(h.event, h.fn);
      else chart.on(h.event, h.query, h.fn);
      attached.add(k);
    };
    const detach = (k: Key): void => {
      const h = handlers[k];
      chart.off(h.event, h.fn);
      attached.delete(k);
    };
    for (const k of Object.keys(handlers) as Key[]) attach(k);

    let series = 0;
    let index = 1;
    select(bar!, 'seriesIndex', ['0', '1'], (v) => { series = Number(v); });
    select(bar!, 'dataIndex', cats.map((_, i) => String(i)), (v) => { index = Number(v); });
    for (const type of ['select', 'unselect', 'toggleSelect']) {
      button(bar!, type, () => chart.dispatchAction({ type, seriesIndex: series, dataIndex: index }));
    }
    const sel = select(bar!, 'listener', Object.keys(handlers), () => {});
    const flip = button(bar!, 'off()', () => {
      const k = sel.value as Key;
      if (attached.has(k)) detach(k);
      else attach(k);
      sync();
    });
    const sync = (): void => {
      flip.textContent = attached.has(sel.value as Key) ? 'off() this listener' : 'on() this listener';
    };
    sel.addEventListener('change', sync);
    sync();
    el.append(log);
    write('listeners attached: pick items above, hover or click the bars');
  }

  return () => {
    stop();
    // off() with no arguments unbinds every listener of every event.
    chart.off();
    dispose();
  };
};

export default mount;
