// Continuous Player: a scatter timeline played over totalDuration instead of a fixed interval
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider } from '../../shared/chart.ts';
import { dotFrames } from '../../shared/player-data.ts';

const frames = dotFrames(9);

const build = (total: number, direction: 'default' | 'reverse', compact = false): ISpec => ({
  type: 'scatter',
  data: [{ id: 'frame', values: frames[0] ?? [] }],
  xField: 'income',
  yField: 'life',
  seriesField: 'country',
  sizeField: 'pop',
  size: [10, 36],
  axes: [
    { orient: 'left', type: 'linear', min: 40, max: 110, title: { visible: !compact, text: 'life expectancy' } },
    { orient: 'bottom', type: 'linear', min: 0, max: 130, title: { visible: !compact, text: 'income' } },
  ],
  legends: { visible: !compact, orient: 'top' },
  player: {
    type: 'continuous',
    specs: frames.map((rows) => ({ data: [{ id: 'frame', values: rows }] })),
    // totalDuration replaces interval: the interval is worked out from the number of frames.
    totalDuration: total,
    direction,
    auto: true,
    loop: true,
    orient: 'bottom',
    position: 'middle',
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(ctx.preview ? 5000 : 8000, 'default', ctx.preview), { height: 460 });
  let released = false;

  if (!ctx.preview) {
    let total = 8000;
    let direction: 'default' | 'reverse' = 'default';
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(total, direction));
    };
    const bar = controlBar(el);
    slider(bar, 'totalDuration ms', [2000, 20000, 1000], total, (v) => ((total = v), apply()));
    select(bar, 'direction', ['default', 'reverse'], (v) => ((direction = v as 'default' | 'reverse'), apply()));
    el.prepend(bar);
  }

  return () => {
    released = true;
    release();
  };
};

export default mount;
