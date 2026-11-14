// Discrete Player: one data frame per year, autoplay and loop, with the slider on a timeline
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider } from '../../shared/chart.ts';
import { barFrames } from '../../shared/player-data.ts';

const frames = barFrames(5);

const build = (interval: number, loop: boolean, auto: boolean, compact = false): ISpec => ({
  type: 'bar',
  direction: 'horizontal',
  // The initial frame; the player swaps in each entry of player.specs after it.
  data: [{ id: 'frame', values: frames[0] ?? [] }],
  xField: 'value',
  yField: 'name',
  seriesField: 'name',
  axes: [
    { orient: 'left', type: 'band', inverse: true },
    { orient: 'bottom', type: 'linear', max: 100 },
  ],
  label: { visible: !compact },
  title: { visible: !compact, text: 'Browser share over the years' },
  legends: { visible: false },
  player: {
    type: 'discrete',
    specs: frames.map((rows) => ({ data: [{ id: 'frame', values: rows }] })),
    auto,
    loop,
    interval,
    orient: 'bottom',
    position: 'middle',
    slider: { visible: true },
    controller: { visible: true },
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(ctx.preview ? 900 : 1200, true, true, ctx.preview), { height: 460 });
  let released = false;

  if (!ctx.preview) {
    let interval = 1200;
    let loop = true;
    let auto = true;
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(interval, loop, auto));
    };
    const bar = controlBar(el);
    slider(bar, 'interval ms', [300, 2500, 100], interval, (v) => ((interval = v), apply()));
    select(bar, 'loop', ['true', 'false'], (v) => ((loop = v === 'true'), apply()));
    select(bar, 'auto', ['true', 'false'], (v) => ((auto = v === 'true'), apply()));
    el.prepend(bar);
  }

  return () => {
    released = true;
    release();
  };
};

export default mount;
