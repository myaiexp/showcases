// Radar axisName: a formatter, per-indicator colours, axisNameGap, startAngle and clockwise
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

// An indicator can carry its own colour (indicator[i].color), used for its name.
const indicator = [
  { name: 'Sales', max: 100, color: '#ee6666' },
  { name: 'Marketing', max: 100, color: '#fac858' },
  { name: 'Support', max: 100, color: '#91cc75' },
  { name: 'Development', max: 100, color: '#73c0de' },
  { name: 'Research', max: 100, color: '#5470c6' },
  { name: 'Admin', max: 100, color: '#9a60b4' },
];
const FORMATTERS: Record<string, string | ((v?: string) => string)> = {
  plain: '{value}',
  brackets: '【{value}】',
  'function: name + max': (v) => `${v}\n(max ${indicator.find((i) => i.name === v)?.max ?? ''})`,
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let formatter = 'brackets';
  let gap = 12;
  let startAngle = 90;
  let clockwise = false;
  let value = [70, 55, 80, 90, 40, 65];

  const show = (): void => {
    chart.setOption({
      radar: {
        indicator,
        radius: ctx.preview ? '58%' : '62%',
        startAngle, // angle of the first indicator axis; 90 is straight up
        clockwise, // since 6.1: lay the indicator axes out clockwise
        axisNameGap: gap, // distance between the name and the end of its axis
        axisName: {
          // formatter: a template with {value}, or a function of the name and the indicator.
          formatter: (FORMATTERS[formatter] ?? '{value}') as string,
          fontSize: ctx.preview ? 11 : 14,
          // Names without a colour of their own use this one.
          color: '#bbb',
        },
      },
      series: [{ type: 'radar', data: [{ value, areaStyle: { opacity: 0.25 } }] }],
    });
  };
  show();

  const stop = every(ctx.preview ? 1800 : 3000, () => {
    value = value.map(() => Math.round(25 + Math.random() * 70));
    if (ctx.preview) {
      clockwise = !clockwise;
      startAngle = clockwise ? 60 : 90;
    }
    show();
  });
  if (bar) {
    select(bar, 'axisName.formatter', Object.keys(FORMATTERS), (v) => {
      formatter = v;
      show();
    }).value = 'brackets';
    slider(bar, 'axisNameGap', [0, 40, 1], gap, (v) => {
      gap = v;
      show();
    });
    slider(bar, 'startAngle', [0, 360, 15], startAngle, (v) => {
      startAngle = v;
      show();
    });
    select(bar, 'clockwise', ['false', 'true'], (v) => {
      clockwise = v === 'true';
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
