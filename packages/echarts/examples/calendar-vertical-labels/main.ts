// Calendar coordinate options: orient, range, firstDay and the day, month and year labels
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const RANGES: Record<string, string | string[]> = {
  'one month': '2026-03',
  'two months': ['2026-03-01', '2026-04-30'],
  quarter: ['2026-01-01', '2026-03-31'],
};

// One value per day over the first quarter of 2026.
const DATA: [string, number][] = [];
for (let t = Date.UTC(2026, 0, 1); t < Date.UTC(2026, 4, 1); t += 86400000) {
  const d = new Date(t);
  DATA.push([d.toISOString().slice(0, 10), Math.round(40 + 40 * Math.sin(t / 86400000 / 3.3) + (d.getUTCDay() % 6 === 0 ? -25 : 0))]);
}

interface Look {
  orient: 'horizontal' | 'vertical';
  range: string;
  firstDay: number;
  dayPosition: 'start' | 'end';
  names: string;
  monthAlign: 'left' | 'center';
  yearPosition: string;
  splitLine: boolean;
}

const NAME_MAPS: Record<string, string | string[]> = {
  EN: 'EN',
  ZH: 'ZH',
  custom: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};

function build(look: Look, preview: boolean): EChartsOption {
  const vertical = look.orient === 'vertical';
  return {
    tooltip: { show: !preview, formatter: (p: unknown) => `${(p as { value: [string, number] }).value.join(': ')}` },
    visualMap: { show: false, min: 0, max: 80, inRange: { color: ['#26364d', '#3d6fb5', '#8fd0ff'] } },
    calendar: {
      range: RANGES[look.range],
      // orient: 'vertical' runs weeks down the page, with the day names across the top.
      orient: look.orient,
      left: vertical ? 'center' : 56,
      top: vertical ? 56 : 52,
      // cellSize [width, height] of one day.
      // Horizontally the cell width adapts ('auto') to the chart width set by left and right.
      cellSize: [preview ? 24 : vertical ? 40 : 'auto', preview ? 20 : 30],
      ...(vertical || preview ? {} : { right: 24 }),
      itemStyle: { borderWidth: 2, borderColor: '#111' },
      splitLine: { show: look.splitLine, lineStyle: { color: '#8a94a6', width: 2 } },
      // dayLabel: names of weekdays; firstDay 0 = Sunday, 1 = Monday...; position start/end of the range.
      dayLabel: { firstDay: look.firstDay, position: look.dayPosition, nameMap: NAME_MAPS[look.names], color: '#f0b74a', margin: 8 },
      // monthLabel: where in the month's span the name sits.
      monthLabel: { align: look.monthAlign, color: '#7ea6e0', margin: 8 },
      // yearLabel: its side, a distance and a formatter ({start} {end} are the first and last year).
      yearLabel: {
        position: look.yearPosition === 'auto' ? undefined : (look.yearPosition as 'top'),
        margin: vertical ? 30 : 36,
        formatter: 'Year {start}',
        color: '#999',
        fontSize: 13,
      },
    },
    series: [{ type: 'heatmap', coordinateSystem: 'calendar', data: DATA }],
  };
}

const mount: Mount = (el, ctx) => {
  const look: Look = {
    orient: 'vertical',
    range: ctx.preview ? 'one month' : 'two months',
    firstDay: 1,
    dayPosition: 'start',
    names: 'EN',
    monthAlign: 'center',
    yearPosition: 'auto',
    splitLine: true,
  };
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 520 });
  const show = (): void => {
    chart.setOption(build(look, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      i++;
      look.orient = i % 2 === 0 ? 'vertical' : 'horizontal';
      look.firstDay = i % 4 < 2 ? 1 : 0;
      look.dayPosition = i % 3 === 0 ? 'end' : 'start';
      show();
    });
  } else {
    select(bar!, 'orient', ['vertical', 'horizontal'], (v) => {
      look.orient = v as Look['orient'];
      show();
    }).value = look.orient;
    select(bar!, 'range', Object.keys(RANGES), (v) => {
      look.range = v;
      show();
    }).value = look.range;
    select(bar!, 'dayLabel.firstDay', ['0', '1', '3', '6'], (v) => {
      look.firstDay = Number(v);
      show();
    }).value = String(look.firstDay);
    select(bar!, 'dayLabel.position', ['start', 'end'], (v) => {
      look.dayPosition = v as Look['dayPosition'];
      show();
    });
    select(bar!, 'dayLabel.nameMap', Object.keys(NAME_MAPS), (v) => {
      look.names = v;
      show();
    });
    select(bar!, 'monthLabel.align', ['center', 'left'], (v) => {
      look.monthAlign = v as Look['monthAlign'];
      show();
    });
    select(bar!, 'yearLabel.position', ['auto', 'top', 'bottom', 'left', 'right'], (v) => {
      look.yearPosition = v;
      show();
    });
    const sl = button(bar!, 'splitLine: on', () => {
      look.splitLine = !look.splitLine;
      sl.textContent = `splitLine: ${look.splitLine ? 'on' : 'off'}`;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
