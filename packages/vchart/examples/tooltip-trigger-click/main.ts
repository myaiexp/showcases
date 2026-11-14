// Tooltip trigger and triggerOff: hover, click, lockAfterClick and hideTimer
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';
import { pick, walk } from '../../shared/components-data.ts';

type Tooltip = NonNullable<Extract<ISpec, { type: 'bar' }>['tooltip']>;

const MODES: Record<string, Tooltip> = {
  'hover (default)': { trigger: 'hover' },
  'click, click elsewhere hides': { trigger: 'click', triggerOff: 'click' },
  'hover, locked by a click': { trigger: ['hover', 'click'], lockAfterClick: true },
  'click, hides after 1.5 s': { trigger: 'click', triggerOff: 'none', hideTimer: 1500 },
};

const data = walk(8, 27);

const build = (tooltip: Tooltip): ISpec => ({
  type: 'bar',
  data: [{ id: 'bars', values: data }],
  xField: 'x',
  yField: 'y',
  bar: { style: { fill: '#a78bfa' } },
  tooltip: { activeType: ['mark'], ...tooltip },
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build(MODES['hover (default)'] as Tooltip));
  let released = false;

  let stop = (): void => {};
  if (ctx.preview) {
    // Show a bar's tooltip from code, then hide it again, one after the other.
    let i = 0;
    stop = every(900, () => {
      i += 1;
      if (i % 2 === 0) vchart.hideTooltip();
      else vchart.showTooltip(pick(data, i), { activeType: 'mark', alwaysShow: true });
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'tooltip trigger', Object.keys(MODES), (v) => {
      if (!released) void vchart.updateSpec(build(MODES[v] as Tooltip));
    });
    el.prepend(bar);
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;
