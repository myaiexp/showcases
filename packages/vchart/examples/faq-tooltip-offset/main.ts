// FAQ: keep the pointer off the tooltip with tooltip.offset
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { groupedRows, pick, QUARTERS } from '../../shared/components-data.ts';

const QS = QUARTERS.slice(0, 5);

const build = (x: number, y: number): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: groupedRows(QS, ['North', 'South'], 12) }],
  xField: 'x',
  yField: 'y',
  seriesField: 'c',
  legends: { visible: false },
  // Positive offsets push the tooltip away from the trigger point, negative ones pull it closer.
  tooltip: { activeType: ['dimension'], offset: { x, y } },
});

const mount: Mount = (el, ctx) => {
  let x = 50;
  let y = 50;
  const { vchart, release } = createChart(el, ctx, build(x, y));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(x, y));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    slider(bar, 'offset.x', [-60, 160, 5], x, (v) => {
      x = v;
      apply();
    });
    slider(bar, 'offset.y', [-60, 160, 5], y, (v) => {
      y = v;
      apply();
    });
  }
  // The preview sweeps the offset so the card shows the tooltip moving away and back.
  let t = 0;
  const stop = every(1100, () => {
    t += 1;
    if (ctx.preview) {
      x = y = t % 6 < 3 ? 10 : 90;
      apply();
    }
    vchart.setDimensionIndex(pick(QS, t));
  });
  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
