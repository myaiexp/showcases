// FAQ: restyle the legend pager arrows and their disabled state
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const r = rng(4);
const values = Array.from({ length: 14 }, (_, i) => ({ name: `Series ${i + 1}`, value: Math.round(20 + r() * 80) }));

const build = (styled: boolean, current: number): ISpec => ({
  type: 'bar',
  data: [{ id: 'd', values }],
  xField: 'name',
  yField: 'value',
  seriesField: 'name',
  axes: [{ orient: 'bottom', visible: false }, { orient: 'left' }],
  legends: {
    visible: true,
    orient: 'bottom',
    maxRow: 1,
    pager: {
      defaultCurrent: current,
      ...(styled
        ? {
            textStyle: { fill: '#facc15', fontSize: 13 }, // the "1/3" text
            handler: {
              style: { fill: '#facc15', size: 14 }, // the arrow buttons
              state: { disable: { fill: '#475569' } }, // an arrow with no page beyond it
            },
          }
        : {}),
    },
  },
});

const mount: Mount = (el, ctx) => {
  let styled = true;
  let current = 1;
  const { vchart, release } = createChart(el, ctx, build(styled, current));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(styled, current));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'pager style', ['custom', 'default'], (v) => ((styled = v === 'custom'), apply()));
  }
  // Page back and forth so both the enabled and the disabled arrow show.
  let i = 0;
  const stop = every(1500, () => {
    i += 1;
    current = 1 + (i % 3);
    apply();
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
