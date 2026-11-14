// FAQ: mount the tooltip somewhere else with tooltip.parentElement
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const QS = QUARTERS.slice(0, 5);

const mount: Mount = (el, ctx) => {
  // A host box that is not the chart container: the tooltip DOM lands inside it.
  const host = document.createElement('div');
  host.style.cssText = 'position:relative;overflow:hidden;width:100%;border:1px dashed #64748b;border-radius:6px';
  el.append(host);
  const note = document.createElement('div');
  note.style.cssText = 'font-size:12px;opacity:.7;padding:4px 8px';
  note.textContent = 'dashed box = tooltip.parentElement (the tooltip is clipped to it)';
  host.append(note);

  const build = (inHost: boolean): ISpec => ({
    type: 'bar',
    data: [{ id: 'd', values: groupedRows(QS, ['North', 'South'], 3) }],
    xField: 'x',
    yField: 'y',
    seriesField: 'c',
    legends: { visible: !ctx.preview, orient: 'top' },
    // Default: the tooltip hangs on document.body. An element here moves it into that element.
    tooltip: { activeType: ['dimension'], ...(inHost ? { parentElement: host } : {}) },
  });
  let chart = createChart(el, ctx, build(true), { parent: host, previewHeight: 170 });
  const rebuild = (inHost: boolean): void => {
    chart.release();
    chart = createChart(el, ctx, build(inHost), { parent: host, previewHeight: 170 });
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'parentElement', ['dashed box', 'document.body (default)'], (v) => rebuild(v === 'dashed box'));
  }
  let i = 0;
  const stop = every(1400, () => {
    i += 1;
    chart.vchart.setDimensionIndex(pick(QS, i));
  });
  return () => {
    stop();
    chart.release();
    host.remove();
  };
};

export default mount;
