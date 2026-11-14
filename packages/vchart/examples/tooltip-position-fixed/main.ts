// Tooltip placement: fixed orient relative to the mark, the pointer or the crosshair
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider, every } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

const ORIENTS = ['top', 'bottom', 'left', 'right', 'tl', 'tr', 'bl', 'br', 'center'] as const;
const MODES = ['mark', 'pointer', 'crosshair'] as const;
type Orient = (typeof ORIENTS)[number];
type Mode = (typeof MODES)[number];

const data = walk(10, 14);

const build = (orient: Orient, mode: Mode, offset: number): ISpec => ({
  type: 'bar',
  data: [{ id: 'bars', values: data }],
  xField: 'x',
  yField: 'y',
  bar: { style: { fill: '#38bdf8' } },
  crosshair: { xField: { visible: true } },
  tooltip: {
    activeType: ['mark'],
    // position is a fixed orientation; positionMode says what it is fixed to.
    mark: { position: { x: { orient, mode, offset }, y: { orient, mode, offset } }, positionMode: mode },
  },
});

const mount: Mount = (el, ctx) => {
  let orient: Orient = 'top';
  let mode: Mode = 'mark';
  let offset = 8;
  const { vchart, release } = createChart(el, ctx, build(orient, mode, offset));
  let released = false;
  const apply = (): void => {
    if (!released) void vchart.updateSpec(build(orient, mode, offset));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1300, () => {
      i += 1;
      if (i % 3 === 0) {
        orient = pick(ORIENTS, i / 3);
        apply();
      }
      vchart.showTooltip(pick(data, i * 3), { activeType: 'mark', alwaysShow: true });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'orient', ORIENTS, (v) => ((orient = v as Orient), apply()));
    select(bar, 'mode', MODES, (v) => ((mode = v as Mode), apply()));
    slider(bar, 'offset', [0, 40, 2], offset, (v) => ((offset = v), apply()));
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
