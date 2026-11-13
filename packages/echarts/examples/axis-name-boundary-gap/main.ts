// Axis titles (nameLocation, nameGap, nameRotate, nameTruncate) and boundaryGap on category and value axes
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button, every } from '../../shared/chart.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DATA = [32, 54, 41, 78, 63, 88, 70];

interface Look {
  location: 'start' | 'middle' | 'end';
  gap: number;
  rotate: number;
  truncate: boolean;
  categoryGap: boolean;
  valueGap: [string, string];
}

function build(look: Look, preview: boolean): EChartsOption {
  return {
    tooltip: { trigger: 'axis', show: !preview },
    grid: { top: 28, left: 84, right: 28, bottom: 60 },
    xAxis: {
      type: 'category',
      data: DAYS,
      name: 'Day of the week, last sampling run',
      // nameLocation: where the title sits along the axis; nameGap: distance from the axis line.
      nameLocation: look.location,
      nameGap: look.gap,
      nameTextStyle: { color: '#f0b74a', fontWeight: 'bold' },
      // nameTruncate: cut a long title to maxWidth pixels and end it with the ellipsis.
      ...(look.truncate ? { nameTruncate: { maxWidth: 90, ellipsis: '…' } } : {}),
      // boundaryGap on a category axis: true puts points in the middle of bands, false on the ticks.
      boundaryGap: look.categoryGap,
    },
    yAxis: {
      type: 'value',
      name: 'Requests per minute',
      nameLocation: look.location,
      nameGap: look.gap + 14,
      // nameRotate: degrees; 'middle' rotates 90 by default, so this overrides that.
      nameRotate: look.rotate,
      nameTextStyle: { color: '#7ea6e0' },
      // boundaryGap on a value axis: [lower, upper] padding as a share of the data range.
      boundaryGap: look.valueGap,
      scale: true,
    },
    series: [{ type: 'line', data: DATA, areaStyle: { opacity: 0.25 }, symbolSize: 8 }],
  };
}

const GAPS: Record<string, [string, string]> = {
  '0% / 0%': ['0%', '0%'],
  '20% / 20%': ['20%', '20%'],
  '0% / 50%': ['0%', '50%'],
};

const mount: Mount = (el, ctx) => {
  const look: Look = { location: 'middle', gap: 24, rotate: 90, truncate: false, categoryGap: true, valueGap: ['0%', '0%'] };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const locs = ['start', 'middle', 'end'] as const;
    let i = 0;
    stop = every(1500, () => {
      i++;
      look.location = locs[i % 3]!;
      look.categoryGap = i % 2 === 0;
      look.valueGap = Object.values(GAPS)[i % 3]!;
      show();
    });
  } else {
    const loc = select(bar!, 'nameLocation', ['start', 'middle', 'end'], (v) => {
      look.location = v as Look['location'];
      show();
    });
    loc.value = look.location;
    slider(bar!, 'nameGap', [0, 50, 1], look.gap, (v) => {
      look.gap = v;
      show();
    });
    slider(bar!, 'y nameRotate', [-90, 90, 15], look.rotate, (v) => {
      look.rotate = v;
      show();
    });
    const tr = button(bar!, 'nameTruncate: off', () => {
      look.truncate = !look.truncate;
      tr.textContent = `nameTruncate: ${look.truncate ? 'on' : 'off'}`;
      show();
    });
    const cg = button(bar!, 'category boundaryGap: true', () => {
      look.categoryGap = !look.categoryGap;
      cg.textContent = `category boundaryGap: ${look.categoryGap}`;
      show();
    });
    select(bar!, 'value boundaryGap', Object.keys(GAPS), (v) => {
      look.valueGap = GAPS[v]!;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
