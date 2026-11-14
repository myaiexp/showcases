// Player parts: controller buttons (style, order, position), slider rail / track / handle, orient
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select } from '../../shared/chart.ts';
import { barFrames } from '../../shared/player-data.ts';

const frames = barFrames(12);
type Orient = 'top' | 'bottom' | 'left' | 'right';

const build = (orient: Orient, alternate: boolean): ISpec => ({
  type: 'bar',
  data: [{ id: 'frame', values: frames[0] ?? [] }],
  xField: 'name',
  yField: 'value',
  seriesField: 'name',
  axes: [
    { orient: 'left', type: 'linear', max: 100 },
    { orient: 'bottom', type: 'band' },
  ],
  legends: { visible: false },
  player: {
    type: 'discrete',
    specs: frames.map((rows) => ({ data: [{ id: 'frame', values: rows }] })),
    auto: true,
    loop: true,
    alternate,
    interval: 1100,
    orient,
    position: 'middle',
    // Buttons are laid out by order and position; each takes a symbol style.
    controller: {
      visible: true,
      start: { order: 2, position: 'start', space: 0, style: { fill: '#34d399', size: 18 } },
      pause: { order: 2, position: 'start', space: 0, style: { fill: '#f59e0b', size: 18 } },
      backward: { order: 1, position: 'start', space: 12, style: { fill: '#94a3b8', size: 14 } },
      forward: { order: 3, position: 'end', space: 12, style: { fill: '#94a3b8', size: 14 } },
    },
    slider: {
      visible: true,
      railStyle: { height: 6, fill: 'rgba(148,163,184,0.25)' },
      trackStyle: { fill: '#34d399' },
      handlerStyle: { size: 14, fill: '#fde047', stroke: '#0f172a' },
    },
  },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('bottom', false), { height: 460 });
  let released = false;

  if (!ctx.preview) {
    let orient: Orient = 'bottom';
    let alternate = false;
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(orient, alternate));
    };
    const bar = controlBar(el);
    select(bar, 'orient', ['bottom', 'top', 'left', 'right'], (v) => ((orient = v as Orient), apply()));
    select(bar, 'alternate', ['false', 'true'], (v) => ((alternate = v === 'true'), apply()));
    el.prepend(bar);
  }

  return () => {
    released = true;
    release();
  };
};

export default mount;
