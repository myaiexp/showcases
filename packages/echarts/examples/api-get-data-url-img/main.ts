// Export one chart, or a connected pair, to an img through getDataURL and getConnectedDataURL
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every, echarts } from '../../shared/chart.ts';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function option(name: string, data: number[], type: 'bar' | 'line'): EChartsOption {
  return {
    title: { text: name, left: 'center', textStyle: { fontSize: 13 } },
    legend: { data: [name], bottom: 0 },
    tooltip: { trigger: 'axis' },
    grid: { top: 36, left: 40, right: 16, bottom: 40 },
    xAxis: { type: 'category', data: days },
    yAxis: { type: 'value' },
    series: [{ name, type, data }],
  };
}

const rand = (): number[] => days.map(() => Math.round(20 + Math.random() * 60));

const mount: Mount = (el, ctx) => {
  // Pending one-shot timeouts, cleared on unmount with everything else.
  const timeouts = new Set<number>();
  const group = ctx.preview ? 'api-url-preview' : 'api-url-full';
  const bar = ctx.preview ? null : controlBar(el);
  const a = createChart(el, ctx, { height: 200, previewHeight: ctx.preview ? 150 : 200 });
  const b = ctx.preview ? null : createChart(el, ctx, { height: 200 });
  a.chart.setOption(option('Visits', rand(), 'bar'));
  b?.chart.setOption(option('Orders', rand(), 'line'));

  // Charts sharing a group id and passed to echarts.connect are exported as one image.
  a.chart.group = group;
  if (b) b.chart.group = group;
  echarts.connect(group);

  const img = document.createElement('img');
  img.alt = 'exported chart';
  // Hidden until the first export gives it a src, so no broken-image icon shows.
  img.hidden = true;
  img.addEventListener('load', () => { img.hidden = false; });
  if (ctx.preview) {
    // A thumbnail of the chart, refreshed from getDataURL as the data changes.
    img.style.cssText = 'position:absolute;right:8px;top:8px;width:30%;border:1px solid #888;background:#222';
    el.style.position = 'relative';
  } else {
    img.style.cssText = 'max-width:100%;border:1px dashed #888;margin-top:8px;align-self:flex-start';
  }
  el.append(img);

  const opts = { type: 'png' as 'png' | 'jpeg', pixelRatio: 1, backgroundColor: '', exclude: 'none' };
  const exportArgs = (): { type: 'png' | 'jpeg'; pixelRatio: number; backgroundColor?: string; excludeComponents?: string[] } => ({
    type: opts.type,
    pixelRatio: opts.pixelRatio,
    ...(opts.backgroundColor ? { backgroundColor: opts.backgroundColor } : {}),
    ...(opts.exclude !== 'none' ? { excludeComponents: [opts.exclude] } : {}),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    const snap = (): void => {
      img.src = a.chart.getDataURL({ pixelRatio: 1, backgroundColor: '#222' });
    };
    stop = every(1800, () => {
      a.chart.setOption(option('Visits', rand(), 'bar'));
      // The update animates; export once it has settled.
      timeouts.add(window.setTimeout(() => { if (!a.chart.isDisposed()) snap(); }, 1100));
    });
    snap();
  } else {
    const info = document.createElement('span');
    const done = (url: string, what: string): void => {
      img.src = url;
      info.textContent = `${what}: ${url.length} characters, ${url.slice(0, 22)}...`;
    };
    // The jpeg type has no alpha channel, so a backgroundColor is chosen for it below.
    select(bar!, 'type', ['png', 'jpeg'], (v) => { opts.type = v as 'png' | 'jpeg'; });
    select(bar!, 'pixelRatio', ['1', '2', '3'], (v) => { opts.pixelRatio = Number(v); });
    select(bar!, 'backgroundColor', ['(chart default)', '#ffffff', '#243b55'], (v) => { opts.backgroundColor = v.startsWith('(') ? '' : v; });
    select(bar!, 'excludeComponents', ['none', 'title', 'legend'], (v) => { opts.exclude = v; });
    button(bar!, 'getDataURL (first chart)', () => done(a.chart.getDataURL(exportArgs()), 'getDataURL'));
    button(bar!, 'getConnectedDataURL (both)', () => done(a.chart.getConnectedDataURL(exportArgs()), 'getConnectedDataURL'));
    button(bar!, 'new data', () => {
      a.chart.setOption(option('Visits', rand(), 'bar'));
      b!.chart.setOption(option('Orders', rand(), 'line'));
    });
    bar!.append(info);
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
  }

  return () => {
    for (const t of timeouts) window.clearTimeout(t);
    stop();
    echarts.disconnect(group);
    img.remove();
    a.dispose();
    b?.dispose();
  };
};

export default mount;
