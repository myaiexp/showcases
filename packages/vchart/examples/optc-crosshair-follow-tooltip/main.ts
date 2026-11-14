// crosshair.followTooltip: show the crosshair only while a chosen tooltip type is shown
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, every, select } from '../../shared/chart.ts';
import { walk } from '../../shared/components-data.ts';

const MODES = ['true', 'dimension off', 'dimension on, mark off'];
const rows = walk(8, 2);

const build = (mode: string): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: rows }],
  xField: 'x',
  yField: 'y',
  point: { visible: true },
  tooltip: { activeType: ['dimension'] },
  crosshair: {
    // The object form switches the crosshair off for one tooltip type (crosshair.md § followTooltip).
    followTooltip: mode === 'true' ? true : mode === 'dimension off' ? { dimension: false } : { dimension: true, mark: false },
    xField: { visible: true, line: { type: 'line', style: { stroke: '#fbbf24', lineDash: [4, 4] } } },
    yField: { visible: true, line: { type: 'line', style: { stroke: '#7dd3fc', lineDash: [4, 4] } } },
  },
});

const mount: Mount = (el, ctx) => {
  let mode = 'true';
  const { vchart, release } = createChart(el, ctx, build(mode));
  let alive = true;
  const apply = (): void => {
    if (alive) void vchart.updateSpec(build(mode));
  };
  // No pointer in a card: setDimensionIndex shows the tooltip, and the crosshair follows it.
  let i = 0;
  const stop = every(ctx.preview ? 900 : 1200, () => {
    i += 1;
    if (ctx.preview && i % 9 === 0) {
      mode = MODES[(i / 9) % 2 === 0 ? 0 : 1] as string;
      apply();
    }
    vchart.setDimensionIndex(rows[i % rows.length]!.x);
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'followTooltip', MODES, (v) => ((mode = v), apply()));
  }
  return () => {
    stop();
    alive = false;
    release();
  };
};

export default mount;
