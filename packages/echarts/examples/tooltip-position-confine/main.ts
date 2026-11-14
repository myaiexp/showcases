// tooltip.position as a fixed array, a keyword or a callback, and confine keeping it inside the chart
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { FINANCE, MONTHS } from '../../shared/interaction-data.ts';

type Position = NonNullable<NonNullable<EChartsOption['tooltip']> extends infer T ? (T extends { position?: infer P } ? P : never) : never>;

const POSITIONS = ['follow the mouse', 'array [10, 10]', 'keyword top', 'callback: above the bar', 'callback: opposite side'] as const;
type Pick = (typeof POSITIONS)[number];

function positionFor(pick: Pick): Position | undefined {
  switch (pick) {
    case 'array [10, 10]':
      // Absolute pixels from the top left of the chart container ('50%' strings work too).
      return [10, 10];
    case 'keyword top':
      // 'top' | 'bottom' | 'left' | 'right' | 'inside': relative to the hovered element (trigger 'item').
      return 'top';
    case 'callback: above the bar':
      // rect is the bounding box of the hovered graphic; size has the tooltip's own size.
      return (point, _params, _dom, rect, size) => {
        const w = size.contentSize[0];
        const h = size.contentSize[1];
        return rect ? [rect.x + rect.width / 2 - w / 2, rect.y - h - 8] : [point[0], point[1]];
      };
    case 'callback: opposite side':
      // Pinned to the right when the mouse is on the left half, and the other way round.
      return (point, _params, _dom, _rect, size) => {
        const side = point[0] < size.viewSize[0] / 2 ? 'right' : 'left';
        return { top: 40, [side]: 8 };
      };
    default:
      return undefined;
  }
}

function build(pick: Pick, confine: boolean): EChartsOption {
  return {
    tooltip: {
      trigger: 'item',
      // confine: keep the floating layer inside the chart's view rect instead of being cut off.
      confine,
      position: positionFor(pick),
      // A deliberately wide tooltip, so the edges matter.
      formatter: (p) => {
        const q = p as unknown as { name: string; value: number };
        return q.name + ': ' + q.value + 'k revenue, the long label makes this box wide';
      },
    },
    grid: { top: 40, left: 44, right: 16, bottom: 28 },
    xAxis: { type: 'category', data: MONTHS },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: FINANCE.revenue }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let pick: Pick = 'callback: above the bar';
  let confine = true;
  const show = (): void => {
    chart.setOption(build(pick, confine), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'position', POSITIONS, (v) => {
      pick = v as Pick;
      show();
    });
    const c = button(bar, 'confine: on', () => {
      confine = !confine;
      c.textContent = 'confine: ' + (confine ? 'on' : 'off');
      show();
    });
  } else {
    // Walk the tooltip along the bars; every lap uses the next position setting.
    let i = 0;
    stop = every(1100, () => {
      i++;
      if (i % 12 === 0) {
        pick = POSITIONS[(i / 12) % POSITIONS.length]!;
        show();
      }
      chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: i % 12 });
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
