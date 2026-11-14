// Aligning the first and last tick labels: alignMinLabel, alignMaxLabel and their y-axis vertical twins
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const DATA = Array.from({ length: 40 }, (_, i) => [i * 2.5, Math.round(10 + 14 * Math.sin(i / 5) + i * 0.4)]);

interface Look {
  alignMin: string;
  alignMax: string;
  vMin: string;
  vMax: string;
  showMin: boolean;
  showMax: boolean;
}

// 'default' leaves the option unset, i.e. the same alignment as the other labels.
const val = (v: string): string | undefined => (v === 'default' ? undefined : v);

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis', show: !preview },
    grid: { top: 28, left: 60, right: 40, bottom: 44 },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        // alignMinLabel / alignMaxLabel (5.5): align the label of the first / last tick to the
        // left, center or right of the tick, so end labels stay inside the chart edge.
        alignMinLabel: val(look.alignMin) as 'left' | undefined,
        alignMaxLabel: val(look.alignMax) as 'left' | undefined,
        showMinLabel: look.showMin,
        showMaxLabel: look.showMax,
        color: '#f0b74a',
        fontWeight: 'bold',
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 40,
      axisLabel: {
        // The y axis has the vertical equivalents: top, middle or bottom.
        verticalAlignMinLabel: val(look.vMin) as 'top' | undefined,
        verticalAlignMaxLabel: val(look.vMax) as 'top' | undefined,
        showMinLabel: look.showMin,
        showMaxLabel: look.showMax,
        color: '#7ea6e0',
        fontWeight: 'bold',
      },
    },
    series: [{ type: 'scatter', symbolSize: 9, data: DATA }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = { alignMin: 'left', alignMax: 'right', vMin: 'bottom', vMax: 'top', showMin: true, showMax: true };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const states = [
      ['left', 'right', 'bottom', 'top'],
      ['center', 'center', 'middle', 'middle'],
      ['right', 'left', 'top', 'bottom'],
      ['default', 'default', 'default', 'default'],
    ] as const;
    let i = 0;
    stop = every(1500, () => {
      const s = states[++i % states.length]!;
      [look.alignMin, look.alignMax, look.vMin, look.vMax] = s;
      show();
    });
  } else {
    const h = ['default', 'left', 'center', 'right'];
    const v = ['default', 'top', 'middle', 'bottom'];
    select(bar!, 'x alignMinLabel', h, (x) => {
      look.alignMin = x;
      show();
    }).value = look.alignMin;
    select(bar!, 'x alignMaxLabel', h, (x) => {
      look.alignMax = x;
      show();
    }).value = look.alignMax;
    select(bar!, 'y verticalAlignMinLabel', v, (x) => {
      look.vMin = x;
      show();
    }).value = look.vMin;
    select(bar!, 'y verticalAlignMaxLabel', v, (x) => {
      look.vMax = x;
      show();
    }).value = look.vMax;
    const mn = button(bar!, 'showMinLabel: on', () => {
      look.showMin = !look.showMin;
      mn.textContent = `showMinLabel: ${look.showMin ? 'on' : 'off'}`;
      show();
    });
    const mx = button(bar!, 'showMaxLabel: on', () => {
      look.showMax = !look.showMax;
      mx.textContent = `showMaxLabel: ${look.showMax ? 'on' : 'off'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
