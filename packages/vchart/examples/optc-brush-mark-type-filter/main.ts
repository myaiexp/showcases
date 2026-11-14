// brush.markTypeFilter: keep the line mark out of the brush so only points change state
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { line, simulateDrag, walk } from '../../shared/components-data.ts';

const build = (filter: boolean): ISpec => ({
  type: 'line',
  data: [{ id: 'd', values: walk(30, 17) }],
  xField: 'x',
  yField: 'y',
  point: { visible: true, style: { size: 10 } },
  axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', label: { autoHide: true } }],
  brush: {
    brushType: 'x',
    inBrush: { color: '#fbbf24', colorAlpha: 1 },
    outOfBrush: { colorAlpha: 0.2 },
    ...(filter ? { markTypeFilter: ['line'] } : {}),
  },
});

const mount: Mount = (el, ctx) => {
  let filter = true;
  const { vchart, release, container } = createChart(el, ctx, build(filter));
  let alive = true;
  let cancel = (): void => {};
  const apply = (): void => {
    if (alive) void vchart.updateSpec(build(filter));
  };
  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    const run = (): void => {
      if (!alive) return;
      n += 1;
      filter = n % 2 === 1;
      void vchart.updateSpec(build(filter)).then(() => {
        if (alive) cancel = simulateDrag(container, line([0.3, 0.5], [0.65, 0.5]), { holdMs: 1100 });
      });
    };
    run();
    stop = every(3200, run);
  } else {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'markTypeFilter', ['line', 'none'], (v) => ((filter = v === 'line'), apply()));
  }
  return () => {
    stop();
    alive = false;
    cancel();
    release();
  };
};

export default mount;
