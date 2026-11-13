// Bar emphasis.focus: none, self or series fade-out, and blurScope across two grids
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const cats = ['A', 'B', 'C', 'D', 'E'];
const names = ['Alpha', 'Beta', 'Gamma'];
const data = [
  [12, 18, 9, 15, 21],
  [8, 11, 17, 10, 14],
  [15, 7, 12, 19, 9],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let focus: 'none' | 'self' | 'series' = 'series';
  let blurScope: 'coordinateSystem' | 'series' | 'global' = 'coordinateSystem';

  const apply = (): void => {
    // Two grids side by side: left holds series 0-2, right holds series 3-5 (the same data again).
    const side = (gridIndex: number, suffix: string): object[] =>
      names.map((n, i) => ({
        name: n + suffix,
        type: 'bar',
        xAxisIndex: gridIndex,
        yAxisIndex: gridIndex,
        data: data[i],
        // focus: what stays visible when a bar is highlighted; the rest goes into the blur state.
        // blurScope: how far the fading reaches (coordinate system, series, or everything).
        emphasis: { focus, blurScope },
        blur: { itemStyle: { opacity: 0.2 } },
      }));
    chart.setOption(
      {
        tooltip: {},
        grid: [
          { left: 36, width: '41%', top: 24, bottom: 30 },
          { right: 16, width: '41%', top: 24, bottom: 30 },
        ],
        xAxis: [
          { type: 'category', data: cats, gridIndex: 0 },
          { type: 'category', data: cats, gridIndex: 1 },
        ],
        yAxis: [
          { type: 'value', gridIndex: 0 },
          { type: 'value', gridIndex: 1 },
        ],
        series: [...side(0, ' L'), ...side(1, ' R')],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'emphasis.focus', ['series', 'self', 'none'], (v) => {
      focus = v as typeof focus;
      apply();
    });
    select(bar, 'emphasis.blurScope', ['coordinateSystem', 'series', 'global'], (v) => {
      blurScope = v as typeof blurScope;
      apply();
    });
    const hint = document.createElement('span');
    hint.textContent = 'Hover a bar in the left grid. blurScope applies with focus: series or self.';
    bar.append(hint);
  } else {
    // No pointer in a preview: highlight bars with an action on a timer.
    let i = 0;
    let last = { seriesIndex: 0, dataIndex: 0 };
    stop = every(1100, () => {
      chart.dispatchAction({ type: 'downplay', ...last });
      i++;
      last = { seriesIndex: i % 3, dataIndex: i % 5 };
      chart.dispatchAction({ type: 'highlight', ...last });
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
