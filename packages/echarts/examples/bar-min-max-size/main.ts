// Bar sizing limits: barMinHeight keeps tiny values visible, barMaxWidth and barMinWidth clamp the width
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { MONTHS } from '../../shared/bar-data.ts';

// Several values are near zero, so without barMinHeight their bars are a pixel or less.
const values = [88, 0.4, 62, 1, 95, 0.2, 40, 2, 77, 0.8, 55, 0];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const look = { barMinHeight: 0, barMaxWidth: 60, barMinWidth: 1, barWidth: 0 };

  const apply = (): void => {
    chart.setOption({
      grid: { top: 24, left: 40, right: 16, bottom: 30 },
      xAxis: { type: 'category', data: MONTHS },
      yAxis: { type: 'value', max: 100 },
      series: {
        type: 'bar',
        data: values,
        label: { show: !ctx.preview, position: 'top' },
        // barMinHeight: smallest bar length in pixels, so small values stay visible and hoverable.
        barMinHeight: look.barMinHeight,
        // barWidth: a fixed width; 0 here means "not set", so the width adapts to the category.
        barWidth: look.barWidth || undefined,
        // barMaxWidth / barMinWidth: clamp the width; both rank above barWidth.
        barMaxWidth: look.barMaxWidth,
        barMinWidth: look.barMinWidth,
      },
    });
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    slider(bar, 'barMinHeight', [0, 30, 1], look.barMinHeight, (v) => ((look.barMinHeight = v), apply()));
    slider(bar, 'barMaxWidth', [4, 80, 1], look.barMaxWidth, (v) => ((look.barMaxWidth = v), apply()));
    slider(bar, 'barMinWidth', [1, 60, 1], look.barMinWidth, (v) => ((look.barMinWidth = v), apply()));
    slider(bar, 'barWidth (0 = auto)', [0, 80, 1], look.barWidth, (v) => ((look.barWidth = v), apply()));
  } else {
    let i = 0;
    const steps = [0, 6, 14, 6];
    stop = every(1400, () => {
      look.barMinHeight = steps[++i % steps.length]!;
      look.barMaxWidth = i % 2 ? 14 : 60;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
