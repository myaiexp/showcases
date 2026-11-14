// FAQ: dashed axis grid lines with axes[i].grid.style.lineDash
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const PATTERNS: Record<string, number[]> = {
  'solid [0]': [0],
  'dots [2, 3]': [2, 3],
  'dashes [8, 4]': [8, 4],
  'dash-dot [10, 4, 2, 4]': [10, 4, 2, 4],
};
const NAMES = Object.keys(PATTERNS);

const build = (pattern: string): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: walk(10, 5) }],
  xField: 'x',
  yField: 'y',
  axes: [
    // lineDash lists alternating dash and gap lengths; [0] draws a solid line.
    { orient: 'left', grid: { visible: true, style: { lineDash: PATTERNS[pattern] ?? [0], stroke: '#94a3b8', lineWidth: 1 } } },
    { orient: 'bottom', grid: { visible: true, style: { lineDash: PATTERNS[pattern] ?? [0], stroke: '#64748b' } } },
  ],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('dashes [8, 4]'));
  let released = false;
  const apply = (v: string): void => {
    if (!released) void vchart.updateSpec(build(v));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'grid.style.lineDash', NAMES, apply).value = NAMES[0] ?? '';
    apply(NAMES[0] ?? '');
  }
  let i = 0;
  const stop = every(1600, () => {
    i += 1;
    if (ctx.preview) apply(pick(NAMES, i));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
