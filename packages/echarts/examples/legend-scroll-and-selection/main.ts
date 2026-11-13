// A scrollable legend with selectedMode, driven by legendToggleSelect and legendScroll actions
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, button, every } from '../../shared/chart.ts';

const names = ['Apple', 'Banana', 'Cherry', 'Date', 'Elder', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange', 'Papaya'];
const hours = Array.from({ length: 12 }, (_, i) => `${i * 2}h`);

// Deterministic smooth-ish series, one per legend entry.
const data = (k: number): number[] => hours.map((_, i) => Math.round(50 + 30 * Math.sin(i / 2 + k) + k * 2));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  chart.setOption({
    tooltip: { trigger: 'axis' },
    legend: {
      // 'scroll' keeps one row with page buttons instead of wrapping over the plot.
      type: 'scroll',
      orient: 'horizontal',
      bottom: 0,
      // true: many can be on; 'single': picking one hides the rest; false: legend is inert.
      selectedMode: true,
      pageButtonItemGap: 8,
    },
    grid: { top: 16, left: 36, right: 16, bottom: 44 },
    xAxis: { type: 'category', data: hours },
    yAxis: {},
    series: names.map((name, k) => ({ name, type: 'line' as const, data: data(k), showSymbol: false, smooth: true })),
  });

  let stop = (): void => {};
  if (ctx.preview) {
    // Toggle one entry and scroll the legend to a later one, over and over.
    let n = 0;
    stop = every(1100, () => {
      chart.dispatchAction({ type: 'legendToggleSelect', name: names[(n * 3) % names.length] });
      chart.dispatchAction({ type: 'legendScroll', scrollDataIndex: (n * 3) % names.length });
      n += 1;
    });
  } else {
    select(bar!, 'selectedMode', ['true', 'single', 'false'], (v) => {
      const selectedMode = v === 'true' ? true : v === 'false' ? false : 'single';
      chart.setOption({ legend: { selectedMode } });
    });
    button(bar!, 'legendAllSelect', () => chart.dispatchAction({ type: 'legendAllSelect' }));
    button(bar!, 'legendInverseSelect', () => chart.dispatchAction({ type: 'legendInverseSelect' }));
    button(bar!, 'toggle "Mango"', () => chart.dispatchAction({ type: 'legendToggleSelect', name: 'Mango' }));
    button(bar!, 'scroll to "Mango"', () => chart.dispatchAction({ type: 'legendScroll', scrollDataIndex: names.indexOf('Mango') }));
    // The actions above report back through the legendselectchanged event.
    const status = document.createElement('span');
    bar!.append(status);
    chart.on('legendselectchanged', (p) => {
      const on = Object.values((p as { selected: Record<string, boolean> }).selected).filter(Boolean).length;
      status.textContent = `${on} of ${names.length} series shown`;
    });
  }

  return () => {
    stop();
    chart.off('legendselectchanged');
    dispose();
  };
};

export default mount;
