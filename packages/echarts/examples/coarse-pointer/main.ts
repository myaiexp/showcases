// The same tiny points with and without useCoarsePointer: hover near them to compare
import type { EChartsType } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, every, slider, controlBar } from '../../shared/chart.ts';

/** Small points with gaps between them, so a near miss is easy to make. */
const points = Array.from({ length: 24 }, (_, i) => [(i % 6) * 20 + 10, Math.floor(i / 6) * 25 + 12]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const row = document.createElement('div');
  row.style.display = 'flex';
  row.style.gap = '8px';
  row.style.width = '100%';
  el.append(row);

  let pointerSize = 44;
  const charts: { chart: EChartsType; dispose: () => void; status: HTMLElement; coarse: boolean }[] = [];

  const build = (): void => {
    for (const c of charts.splice(0)) {
      c.dispose();
      c.status.remove();
    }
    for (const coarse of [false, true]) {
      const col = document.createElement('div');
      col.style.flex = '1';
      col.style.minWidth = '0';
      row.append(col);
      // init opts: useCoarsePointer true always snaps, false never does (null leaves it
      // to the device); pointerSize is the snapping radius in pixels.
      const { chart, dispose } = createChart(col, ctx, {
        height: 320,
        parent: col,
        init: { useCoarsePointer: coarse, pointerSize },
      });
      const status = document.createElement('p');
      status.style.fontSize = '13px';
      status.textContent = coarse ? `useCoarsePointer: true, pointerSize: ${pointerSize}` : 'useCoarsePointer: false';
      if (!ctx.preview) col.append(status);
      chart.setOption({
        title: { text: coarse ? 'snapping' : 'exact', left: 'center', textStyle: { fontSize: 12 } },
        grid: { top: 26, bottom: 20, left: 28, right: 8 },
        tooltip: { trigger: 'item' },
        xAxis: { min: 0, max: 120, splitLine: { show: false } },
        yAxis: { min: 0, max: 100, splitLine: { show: false } },
        series: [{ type: 'scatter', symbolSize: 5, data: points, emphasis: { scale: 4 } }],
      });
      chart.on('mouseover', (p) => {
        status.textContent = `picked point ${p.dataIndex}`;
      });
      charts.push({ chart, dispose: () => { dispose(); col.remove(); }, status, coarse });
    }
  };
  build();

  if (bar) {
    // pointerSize is an init option, so changing it means a new instance.
    slider(bar, 'pointerSize', [8, 80, 4], pointerSize, (v) => {
      pointerSize = v;
      build();
    });
  }

  // Previews get no pointer, so highlight points in turn on both charts instead.
  let i = 0;
  const stop = ctx.preview
    ? every(600, () => {
        for (const c of charts) {
          c.chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
          c.chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: i % points.length });
        }
        i += 5;
      })
    : () => {};

  return () => {
    stop();
    for (const c of charts) c.dispose();
    row.remove();
  };
};

export default mount;
