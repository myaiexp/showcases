// Parallel coordinates mixing category and value axes: series.smooth, axis inverse and category order, realtime off
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';
import { rng } from '../../shared/scatter-data.ts';

const TEAMS = ['Design', 'Platform', 'Data', 'Support'];
const MODES = ['Office', 'Hybrid', 'Remote'];
const r = rng(31);
// Row: [team, years, salary (k), satisfaction, work mode]
const rows = Array.from({ length: 70 }, () => {
  const years = Math.round(r() * 15);
  return [TEAMS[Math.floor(r() * 4)]!, years, Math.round(38 + years * 3.2 + r() * 30), +(2 + r() * 3).toFixed(1), MODES[Math.floor(r() * 3)]!];
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let smooth: boolean | number = true;
  let reversed = false;

  const show = (): void => {
    chart.setOption({
      parallel: {
        left: 40,
        right: 60,
        top: ctx.preview ? 28 : 44,
        bottom: ctx.preview ? 12 : 24,
        parallelAxisDefault: {
          nameLocation: 'end',
          nameGap: 10,
          // realtime false: the lines update when a brush selection ends, not while dragging.
          realtime: false,
          axisLabel: { show: !ctx.preview },
        },
      },
      parallelAxis: [
        // A category axis lays its values out in the order of `data`; inverse flips it.
        { dim: 0, name: 'Team', type: 'category', data: TEAMS, inverse: reversed },
        { dim: 1, name: 'Years', type: 'value' },
        { dim: 2, name: 'Salary', type: 'value' },
        { dim: 3, name: 'Satisfaction', type: 'value', min: 1, max: 5 },
        { dim: 4, name: 'Work mode', type: 'category', data: MODES, inverse: reversed },
      ],
      visualMap: { show: false, dimension: 2, min: 40, max: 120, inRange: { color: ['#4fc3f7', '#f2e394', '#ef5350'] } },
      series: [
        {
          type: 'parallel',
          data: rows,
          // smooth: false for straight segments, true or 0..1 to curve each line through the axes.
          smooth,
          lineStyle: { width: 1.6, opacity: 0.55 },
          inactiveOpacity: 0.04,
          activeOpacity: 0.95,
        },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps: (boolean | number)[] = [false, 0.3, true, 1];
    let i = 0;
    stop = every(1600, () => {
      smooth = steps[++i % steps.length]!;
      show();
    });
  } else {
    select(bar!, 'smooth', ['true', 'false', '0.2', '0.5', '0.8'], (v) => {
      smooth = v === 'true' ? true : v === 'false' ? false : Number(v);
      show();
    });
    const inv = button(bar!, 'category axes inverse: off', () => {
      reversed = !reversed;
      inv.textContent = `category axes inverse: ${reversed ? 'on' : 'off'}`;
      show();
    });
    const note = document.createElement('span');
    note.textContent = 'Drag along an axis to brush; with realtime off the lines update when you release.';
    bar!.append(note);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
