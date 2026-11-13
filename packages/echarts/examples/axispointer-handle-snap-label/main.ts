// axisPointer with a draggable handle, snap, a custom label formatter and a tooltip driven only by the handle
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, echarts, every, select, slider } from '../../shared/chart.ts';
import { walk } from '../../shared/line-data.ts';

const DAY = 24 * 3600 * 1000;
const START = Date.UTC(2026, 0, 1);
const N = 30;
const data = walk(N, 3, 60, 9).map((v, i) => [START + i * DAY * 2, Math.round(v)]);

interface Look { snap: boolean; handleSize: number; labelAs: string; value: number }

function build(look: Look): EChartsOption {
  return {
    // Only the handle drives the tooltip: no mouse trigger, and the box stays up.
    tooltip: {
      triggerOn: 'none',
      alwaysShowContent: true,
      position: (pt) => [pt[0], 20],
    },
    grid: { top: 80, left: 40, right: 24, bottom: 36 },
    xAxis: {
      type: 'time',
      axisPointer: {
        // value: where the pointer starts (and is moved to when it changes).
        value: look.value,
        // snap: jump to the nearest data point instead of following the handle freely.
        snap: look.snap,
        label: {
          show: true,
          // The label formatter gets { value, seriesData }; here it formats the timestamp.
          formatter: (p) =>
            look.labelAs === 'date'
              ? echarts.time.format(p.value as number, '{yyyy}-{MM}-{dd}', false)
              : 'ts ' + Math.round(Number(p.value) / 1000),
        },
        // handle: a draggable button on the axis; dragging it moves the pointer.
        handle: { show: true, size: look.handleSize, margin: 40, color: '#5fb4ff' },
      },
      splitLine: { show: false },
    },
    yAxis: { type: 'value', scale: true, splitLine: { lineStyle: { opacity: 0.2 } } },
    series: [{ type: 'line', data, symbolSize: 6, areaStyle: { opacity: 0.15 } }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look: Look = { snap: true, handleSize: 40, labelAs: 'date', value: START + 10 * DAY };
  const show = (): void => {
    chart.setOption(build(look));
  };
  show();

  let stop = (): void => {};
  if (bar) {
    const snap = button(bar, 'snap: on', () => {
      look.snap = !look.snap;
      snap.textContent = 'snap: ' + (look.snap ? 'on' : 'off');
      show();
    });
    select(bar, 'label.formatter', ['date', 'timestamp'], (v) => {
      look.labelAs = v;
      show();
    });
    slider(bar, 'handle.size', [20, 70, 5], 40, (v) => {
      look.handleSize = v;
      show();
    });
  } else {
    // Nobody can drag the handle in a card, so the pointer value sweeps along the axis.
    let t = 0;
    stop = every(900, () => {
      t = (t + 1) % N;
      look.value = START + t * 2 * DAY + DAY * 0.6;
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
