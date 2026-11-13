// Gauge with three data items: one pointer each, with its own title, detail and colour
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

const COLORS = ['#5470c6', '#91cc75', '#fac858'];
const NAMES = ['CPU', 'Memory', 'Disk'];
const random = (): number[] => NAMES.map(() => Math.round(15 + Math.random() * 80));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 440 });
  let values = [62, 38, 80];
  let overlap = true;
  let pointerWidth = 6;

  const show = (): void => {
    chart.setOption({
      series: [
        {
          type: 'gauge',
          radius: ctx.preview ? '92%' : '80%',
          min: 0,
          max: 100,
          // progress.overlap: whether the progress arcs of the data items are drawn on top of
          // each other (true) or kept apart (false) when there are several data items.
          progress: { show: true, overlap, width: 12, roundCap: true },
          axisLine: { lineStyle: { width: 12 } },
          splitLine: { distance: -2, length: 8 },
          axisTick: { distance: -2 },
          axisLabel: { distance: 18, fontSize: ctx.preview ? 9 : 12 },
          pointer: { width: pointerWidth, length: '65%' },
          anchor: { show: true, size: 12, showAbove: true, itemStyle: { color: '#222', borderWidth: 3 } },
          // Every data item is one pointer. A data item may carry its own itemStyle, title and
          // detail, so each one gets a colour and a place in the dial.
          data: values.map((value, i) => ({
            name: NAMES[i],
            value,
            itemStyle: { color: COLORS[i]! },
            title: { offsetCenter: [`${(i - 1) * 32}%`, '78%'], fontSize: ctx.preview ? 11 : 14, color: COLORS[i]! },
            detail: {
              offsetCenter: [`${(i - 1) * 32}%`, '92%'],
              valueAnimation: true,
              width: 56,
              height: 14,
              fontSize: ctx.preview ? 12 : 16,
              color: '#fff',
              backgroundColor: COLORS[i]!,
              borderColor: '#fff',
              borderWidth: 1,
              formatter: '{value}%',
            },
          })),
        },
      ],
    });
  };
  show();

  const update = (v: number[]): void => {
    values = v;
    show();
  };
  const stop = every(ctx.preview ? 1800 : 3000, () => update(random()));
  if (bar) {
    select(bar, 'progress.overlap', ['true', 'false'], (v) => {
      overlap = v === 'true';
      show();
    });
    select(bar, 'pointer.width', ['6', '2', '12'], (v) => {
      pointerWidth = Number(v);
      show();
    });
    button(bar, 'New readings', () => update(random()));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
