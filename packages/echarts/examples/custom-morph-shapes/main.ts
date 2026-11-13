// A custom series whose rects morph into circles and into pie sectors through universalTransition
import type { CustomSeriesRenderItem, EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

const NAMES = ['Tea', 'Coffee', 'Water', 'Juice', 'Milk', 'Soda'];
const STATES = ['rects', 'circles', 'pie'] as const;
type State = (typeof STATES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let values = NAMES.map(() => Math.round(20 + Math.random() * 70));
  let state: State = 'rects';

  /** Same data, two shapes. `morph: true` lets a rect become a circle when universalTransition is on. */
  const renderItem: CustomSeriesRenderItem = (params, api) => {
    const v = api.value(0) as number;
    const [x, y] = api.coord([params.dataIndex, v]) as [number, number];
    const [, base] = api.coord([params.dataIndex, 0]) as [number, number];
    const w = (api.size!([1, 0]) as number[])[0]! * 0.6;
    const style = { fill: api.visual('color') as string };
    if (state === 'circles') {
      return { type: 'circle', shape: { cx: x, cy: y, r: 6 + v / 5 }, style, morph: true };
    }
    return { type: 'rect', shape: { x: x - w / 2, y, width: w, height: base - y }, style, morph: true };
  };

  const show = (): void => {
    const data = NAMES.map((name, i) => ({ name, value: values[i]! }));
    const base: EChartsOption = { tooltip: { show: !ctx.preview }, animationDurationUpdate: 1000 };
    // notMerge (second argument true): the pie has no axes, so the old option must not linger.
    if (state === 'pie') {
      chart.setOption(
        {
          ...base,
          series: [
            {
              // The same id on every state links the old elements to the new ones.
              id: 'drinks',
              type: 'pie',
              radius: ['25%', ctx.preview ? '85%' : '70%'],
              data,
              universalTransition: true,
            },
          ],
        },
        true,
      );
      return;
    }
    chart.setOption(
      {
        ...base,
        grid: { top: 20, left: 36, right: 16, bottom: ctx.preview ? 24 : 40 },
        xAxis: { type: 'category', data: NAMES },
        yAxis: { type: 'value', max: 110 },
        series: [{ id: 'drinks', type: 'custom', renderItem, colorBy: 'data', encode: { y: 0 }, data, universalTransition: true }],
      },
      true,
    );
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2600, () => {
      state = STATES[(STATES.indexOf(state) + 1) % STATES.length]!;
      show();
    });
  } else {
    for (const s of STATES) button(bar!, s, () => {
      state = s;
      show();
    });
    button(bar!, 'new data', () => {
      values = NAMES.map(() => Math.round(20 + Math.random() * 70));
      show();
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
