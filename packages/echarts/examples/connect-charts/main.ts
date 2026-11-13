// Two charts joined with echarts.connect: tooltips, highlights and zoom stay in sync
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, echarts, every } from '../../shared/chart.ts';

const hours = Array.from({ length: 48 }, (_, i) => `${String(i >> 1).padStart(2, '0')}:${i % 2 ? '30' : '00'}`);
const wave = (phase: number, amp: number, base: number): number[] =>
  hours.map((_, i) => Math.round(base + amp * Math.sin(i / 6 + phase) + (i % 5)));

const base = (preview: boolean, name: string): EChartsOption => ({
  title: preview ? undefined : { text: name, textStyle: { fontSize: 13 } },
  tooltip: { trigger: 'axis' },
  grid: { top: preview ? 8 : 34, bottom: preview ? 18 : 30, left: 40, right: 12 },
  // Each chart has its own inside dataZoom; connect mirrors the zoom action across both.
  dataZoom: [{ type: 'inside', start: 0, end: 60 }],
  xAxis: { type: 'category', data: hours, boundaryGap: false },
  yAxis: { type: 'value', splitNumber: 3 },
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  // Two charts share the card, so each takes half of its 200px.
  const top = createChart(el, ctx, { height: 220, previewHeight: 100 });
  const bottom = createChart(el, ctx, { height: 220, previewHeight: 100 });

  top.chart.setOption({ ...base(ctx.preview, 'Temperature'), series: [{ type: 'line', name: '°C', smooth: true, data: wave(0, 6, 14) }] });
  bottom.chart.setOption({ ...base(ctx.preview, 'Power use'), series: [{ type: 'bar', name: 'kW', data: wave(1.5, 20, 40) }] });

  // Charts in the same group share tooltip, highlight, legend and dataZoom actions.
  const group = `connect-${Math.random().toString(36).slice(2)}`;
  top.chart.group = group;
  bottom.chart.group = group;
  echarts.connect(group);

  // Driving only the top chart: the bottom one follows through the connection.
  let i = 0;
  const stop = every(ctx.preview ? 500 : 800, () => {
    top.chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: (i = (i + 1) % 28) });
  });
  const stopZoom = ctx.preview
    ? every(3000, () => {
        const start = Math.floor(Math.random() * 40);
        top.chart.dispatchAction({ type: 'dataZoom', start, end: start + 60 });
      })
    : () => {};

  if (bar) {
    const img = document.createElement('img');
    img.style.maxWidth = '100%';
    img.alt = 'Both connected charts exported as one image';
    // getConnectedDataURL renders every chart in the group into one image.
    button(bar, 'Export both as one PNG', () => {
      img.src = top.chart.getConnectedDataURL({ type: 'png', pixelRatio: 1, backgroundColor: '#0d1117' });
      el.append(img);
    });
    button(bar, 'Disconnect', () => echarts.disconnect(group));
    button(bar, 'Connect', () => echarts.connect(group));
  }

  return () => {
    stop();
    stopZoom();
    echarts.disconnect(group);
    top.dispose();
    bottom.dispose();
  };
};

export default mount;
