// Bar selectedMode: single, multiple and series selection, the select state style, and a disabled item
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { DAYS } from '../../shared/bar-data.ts';

type Mode = 'single' | 'multiple' | 'series';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let mode: Mode = 'multiple';

  const apply = (): void => {
    chart.setOption(
      {
        legend: { show: !ctx.preview },
        grid: { top: 16, left: 40, right: 16, bottom: ctx.preview ? 28 : 60 },
        xAxis: { type: 'category', data: DAYS },
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Visitors',
            type: 'bar',
            data: [32, 41, 29, 52, 47, 63, 58].map((v, i) =>
              // select.disabled on a data item: it ignores clicks and select actions.
              i === 2 ? { value: v, select: { disabled: true }, itemStyle: { opacity: 0.45 } } : v,
            ),
            // selectedMode: true / 'single' / 'multiple' lets items be clicked; 'series' selects the whole series.
            selectedMode: mode,
            // select: the style of selected items (here a gold fill with a white border).
            select: { itemStyle: { color: '#f5c542', borderColor: '#fff', borderWidth: 2 } },
          },
          {
            name: 'Sign-ups',
            type: 'bar',
            data: [8, 12, 7, 15, 13, 21, 17],
            selectedMode: mode,
            select: { itemStyle: { color: '#f5c542', borderColor: '#fff', borderWidth: 2 } },
          },
        ],
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'selectedMode', ['multiple', 'single', 'series'], (v) => {
      mode = v as Mode;
      apply();
    });
    // The same state can be driven from code with the select / unselect actions.
    button(bar, 'select Fri (action)', () => chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: 4 }));
    button(bar, 'unselect all (action)', () => {
      for (const seriesIndex of [0, 1]) chart.dispatchAction({ type: 'unselect', seriesIndex, dataIndex: [0, 1, 2, 3, 4, 5, 6] });
    });
    const hint = document.createElement('span');
    hint.textContent = 'Click bars. Wednesday is disabled.';
    bar.append(hint);
  } else {
    // A preview takes no pointer input, so dispatch the select action on a timer instead.
    let i = 0;
    stop = every(900, () => {
      const idx = i++ % 7;
      if (idx === 0) chart.dispatchAction({ type: 'unselect', seriesIndex: 0, dataIndex: [0, 1, 2, 3, 4, 5, 6] });
      chart.dispatchAction({ type: 'select', seriesIndex: 0, dataIndex: idx });
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
