// Indicator fixed, trigger 'select' and offsetY: the card with and without a selected slice
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { pick } from '../../shared/components-data.ts';

const data = [
  { team: 'Design', hours: 120 },
  { team: 'Backend', hours: 340 },
  { team: 'Frontend', hours: 280 },
  { team: 'QA', hours: 160 },
  { team: 'Ops', hours: 90 },
];

const build = (fixed: boolean, offsetY: number): ISpec => ({
  type: 'pie',
  data: [{ id: 'hours', values: data }],
  valueField: 'hours',
  categoryField: 'team',
  outerRadius: 0.85,
  innerRadius: 0.6,
  legends: { visible: false },
  indicator: {
    visible: true,
    // fixed true keeps the card on screen with its default text; false shows it only while a slice is selected.
    fixed,
    trigger: 'select',
    offsetY,
    // field reads the text straight from the datum instead of a text callback.
    title: { visible: true, field: 'team', style: { fill: '#e2e8f0', fontSize: 20, fontWeight: 'bold' } },
    content: [{ visible: true, field: 'hours', style: { fill: '#38bdf8', fontSize: 16 } }],
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(true, 0));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    let fixed = true;
    stop = every(1100, () => {
      i += 1;
      if (i % 6 === 0 && !released) {
        // Flip fixed so the card is seen both ways.
        fixed = !fixed;
        void vchart.updateSpec(build(fixed, 0));
      } else {
        vchart.setSelected({ team: pick(data, i).team });
      }
    });
  } else {
    let fixed = true;
    let offsetY = 0;
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(fixed, offsetY));
    };
    const bar = controlBar(el);
    select(bar, 'fixed', ['true', 'false'], (v) => ((fixed = v === 'true'), apply()));
    slider(bar, 'offsetY', [-40, 40, 2], offsetY, (v) => ((offsetY = v), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
