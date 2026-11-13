// Parallel coordinates with ten axes where axisExpandable fans out a few of them: axisExpandCenter, axisExpandCount, axisExpandWidth
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { rng } from '../../shared/scatter-data.ts';

const SUBJECTS = ['Maths', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Art', 'Music', 'Sport', 'Language'];
const r = rng(9);
// 60 students; science marks move together, so the lines form visible bundles.
const students = Array.from({ length: 60 }, () => {
  const sci = 30 + r() * 65;
  const art = 30 + r() * 65;
  return SUBJECTS.map((_, i) => Math.round(Math.min(100, Math.max(0, (i < 4 ? sci : i < 8 ? art : 40 + r() * 55) + (r() - 0.5) * 22))));
});

interface Expand { center: number; count: number; width: number; on: string }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const ex: Expand = { center: 4, count: 3, width: ctx.preview ? 46 : 70, on: 'click' };

  const show = (): void => {
    chart.setOption({
      parallel: {
        left: 24,
        right: 24,
        top: ctx.preview ? 22 : 40,
        bottom: ctx.preview ? 10 : 24,
        // axisExpandable: click an axis to spread its neighbours out, leaving the others squeezed.
        axisExpandable: true,
        // axisExpandCenter: the axis (by index) the expanded group is centred on.
        axisExpandCenter: ex.center,
        // axisExpandCount: how many axes are expanded around it.
        axisExpandCount: ex.count,
        // axisExpandWidth: pixels between two expanded axes.
        axisExpandWidth: ex.width,
        axisExpandTriggerOn: ex.on as 'click' | 'mousemove',
        parallelAxisDefault: {
          type: 'value',
          min: 0,
          max: 100,
          nameLocation: 'end',
          nameGap: 8,
          nameTextStyle: { fontSize: ctx.preview ? 9 : 12 },
          axisLabel: { show: !ctx.preview },
        },
      },
      parallelAxis: SUBJECTS.map((name, dim) => ({ dim, name })),
      visualMap: { show: false, dimension: 0, min: 20, max: 100, inRange: { color: ['#ef5350', '#f2e394', '#4fc3f7'] } },
      series: [{ type: 'parallel', data: students, lineStyle: { width: 1.2, opacity: 0.5 } }],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    // Walk the expanded group across the axes, like a reader clicking along them.
    let i = 0;
    stop = every(1400, () => {
      ex.center = 1 + (++i % 8);
      show();
    });
  } else {
    slider(bar!, 'axisExpandCenter', [0, 9, 1], ex.center, (v) => {
      ex.center = v;
      show();
    });
    slider(bar!, 'axisExpandCount', [0, 8, 1], ex.count, (v) => {
      ex.count = v;
      show();
    });
    slider(bar!, 'axisExpandWidth', [20, 100, 5], ex.width, (v) => {
      ex.width = v;
      show();
    });
    select(bar!, 'axisExpandTriggerOn', ['click', 'mousemove'], (v) => {
      ex.on = v;
      show();
    });
    const note = document.createElement('span');
    note.textContent = 'Click an axis (or hover, per axisExpandTriggerOn) to toggle the expanded state.';
    bar!.append(note);
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
