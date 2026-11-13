// Time-axis label formatters: template, cascading object, callback and rich text styles
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';

const MODES = ['default', 'template', 'cascading', 'cascading + rich', 'function + rich'] as const;
type Mode = (typeof MODES)[number];

const DAY = 86400000;
// Dates are built in local time so month starts line up with the labels.
const START = new Date(2025, 9, 1).getTime();
const DATA = Array.from({ length: 200 }, (_, i) => [START + i * 3 * DAY, Math.round(50 + 20 * Math.sin(i / 9) + i / 5)]);

// rich: named text styles that '{name|text}' fragments in a formatter refer to.
const RICH = {
  year: { color: '#f0b74a', fontWeight: 'bold' as const, fontSize: 13, lineHeight: 18 },
  month: { color: '#9fb4d8' },
  day: { color: '#7a869c', fontSize: 10 },
};

function formatter(mode: Mode): unknown {
  switch (mode) {
    case 'template':
      // A string template: {MMM} is the short month name, {d} the day of the month.
      return '{MMM} {d}';
    case 'cascading':
      // An object picks a template by granularity: month starts get the month, other ticks the day.
      return { year: '{yyyy}', month: '{MMMM}', day: 'day {d}' };
    case 'cascading + rich':
      // The first tick of a year stacks the year over the month, styled by the rich names.
      return { year: '{year|{yyyy}}\n{month|{MMM}}', month: '{month|{MMM}}', day: '{day|{d}}' };
    case 'function + rich':
      // A callback receives the timestamp and the tick index; index 0 gets the year as well.
      return ((value: number, index: number) => {
        const d = new Date(value);
        const text = `{month|${d.getMonth() + 1}/${d.getDate()}}`;
        return index === 0 ? `{year|${d.getFullYear()}}\n${text}` : text;
      });
    default:
      return undefined;
  }
}

function build(mode: Mode, rotate: number): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { top: 24, left: 56, right: 24, bottom: 56 },
    xAxis: {
      type: 'time',
      axisLabel: { formatter: formatter(mode) as never, rich: RICH, rotate, hideOverlap: true },
    },
    yAxis: {
      type: 'value',
      scale: true,
      // A value axis takes a string template where {value} is the default label.
      axisLabel: { formatter: '{value} pts' },
    },
    series: [{ type: 'line', showSymbol: false, areaStyle: { opacity: 0.2 }, data: DATA }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = 'cascading + rich';
  let rotate = 0;
  const show = (): void => {
    chart.setOption(build(mode, rotate));
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1800, () => {
      mode = MODES[++i % MODES.length]!;
      show();
    });
  } else {
    const sel = select(bar!, 'formatter', MODES, (v) => {
      mode = v as Mode;
      show();
    });
    sel.value = mode;
    slider(bar!, 'rotate', [-90, 90, 5], rotate, (v) => {
      rotate = v;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
