// series.sampling strategies compared on a long signal with rare spikes
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { seeded } from '../../shared/line-data.ts';

const MODES = ['none', 'lttb', 'average', 'min', 'max', 'minmax', 'sum'] as const;
type Mode = (typeof MODES)[number];

function signal(n: number): number[] {
  const rand = seeded(21);
  return Array.from({ length: n }, (_, i) => {
    const spike = rand() < 0.0004 ? (rand() < 0.5 ? 1 : -1) * (40 + rand() * 30) : 0;
    return Math.round((Math.sin(i / (n / 14)) * 30 + (rand() - 0.5) * 16 + spike) * 10) / 10;
  });
}

const N = 50000;
const data = signal(N);
const cats = Array.from({ length: N }, (_, i) => i);

function build(mode: Mode, preview: boolean): EChartsOption {
  return {
    title: { text: `sampling: ${mode === 'none' ? 'off' : `'${mode}'`}`, left: 'center', top: 0, textStyle: { fontSize: 13 } },
    tooltip: { trigger: 'axis' },
    grid: { top: 30, left: 44, right: 16, bottom: 24 },
    xAxis: { type: 'category', data: cats, show: !preview },
    // 'sum' adds up every bucket, so it needs its own scale; the others stay in the data range.
    yAxis: { type: 'value', scale: true },
    series: [
      {
        type: 'line',
        data,
        showSymbol: false,
        lineStyle: { width: 1 },
        // sampling: how points are filtered when there are far more than pixels. Left out, every
        // point is drawn. lttb keeps the trend and extremes; min / max / minmax pick extremes per
        // bucket; average and sum combine the bucket.
        sampling: mode === 'none' ? undefined : mode,
        animation: false,
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = ctx.preview ? 'lttb' : 'none';
  const show = (): void => {
    // notMerge: removing `sampling` must really turn it off.
    chart.setOption(build(mode, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 1;
    stop = every(1400, () => {
      n = (n % (MODES.length - 1)) + 1;
      mode = MODES[n]!;
      show();
    });
  } else {
    select(bar!, 'sampling', MODES, (v) => {
      mode = v as Mode;
      show();
    }).value = mode;
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
