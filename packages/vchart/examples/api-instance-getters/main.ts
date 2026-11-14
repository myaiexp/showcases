// A combined readout of the VChart instance getters
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
import { CATS, barSpec } from '../../shared/api-data.ts';
import { groupedRows } from '../../shared/components-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, barSpec({ legend: !ctx.preview }), { previewHeight: 100, height: 300 });
  const pre = document.createElement('pre');
  pre.style.cssText = `margin:8px 0 0;font-size:${ctx.preview ? 10 : 12}px;white-space:pre-wrap;width:100%`;
  el.append(pre);

  let alive = true;
  const read = (): void => {
    if (!alive) return;
    const canvas = vchart.getCanvas();
    const theme = vchart.getCurrentTheme() as { colorScheme?: { default?: unknown[] }; background?: unknown };
    const lines = [
      `ID                     ${String(vchart.id)}`,
      `getCanvas()            <canvas> ${canvas?.width} x ${canvas?.height}`,
      `getContainer()         <${vchart.getContainer()?.tagName.toLowerCase()}> ${vchart.getContainer()?.clientWidth}px wide`,
      `getComponents()        ${vchart.getComponents().length} components`,
      `getChart().getAllSeries() ${vchart.getChart().getAllSeries().length} series`,
      `getDataSet()           ${Object.keys((vchart.getDataSet() as unknown as { dataViewMap: object }).dataViewMap).length} data views`,
      `getCurrentThemeName()  ${JSON.stringify(vchart.getCurrentThemeName())}`,
      `getCurrentTheme()      type ${JSON.stringify((theme as { type?: string }).type)}, ${theme.colorScheme?.default?.length ?? 0} default colours`,
    ];
    pre.textContent = ctx.preview ? lines.slice(0, 5).join('\n') : lines.join('\n');
  };
  window.setTimeout(read, 300);

  let n = 3;
  const setSeries = (count: number): void => {
    if (!alive) return;
    n = count;
    const groups = ['North', 'South', 'East', 'West', 'Centre'].slice(0, n);
    void vchart.updateData('main', groupedRows(CATS, groups, 1)).then(() => window.setTimeout(read, 300));
  };
  if (bar) {
    button(bar, 'Add a series', () => setSeries(Math.min(5, n + 1)));
    button(bar, 'Remove a series', () => setSeries(Math.max(1, n - 1)));
    button(bar, 'Refresh', read);
  }
  let i = 0;
  const stop = bar ? () => {} : every(1800, () => setSeries([5, 2, 4, 3][i++ % 4] as number));
  return () => {
    alive = false;
    stop();
    release();
    pre.remove();
  };
};

export default mount;
