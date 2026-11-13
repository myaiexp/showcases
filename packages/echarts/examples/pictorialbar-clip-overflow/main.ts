// pictorialBar clip: symbols that run past the axis max are cut at the grid edge, or drawn over it when clip is off
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider, button } from '../../shared/chart.ts';
import { MONTHS } from '../../shared/bar-data.ts';

const months = MONTHS.slice(0, 6);
const values = [30, 55, 80, 120, 65, 95];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let clip = true;
  let max = 70;

  const apply = (): void => {
    chart.setOption(
      {
        title: ctx.preview ? { text: `clip: ${clip}   yAxis.max: ${max}`, left: 'center', top: 0, textStyle: { fontSize: 12, fontWeight: 'normal' } } : undefined,
        grid: { top: 36, left: 40, right: 16, bottom: 28, show: true, borderColor: '#888' },
        xAxis: { type: 'category', data: months },
        // A fixed max puts some values beyond the top of the grid.
        yAxis: { type: 'value', min: 0, max },
        series: {
          type: 'pictorialBar',
          data: values,
          symbol: 'rect',
          symbolRepeat: true,
          symbolSize: ['60%', 10],
          symbolMargin: 3,
          itemStyle: { color: '#73c0de' },
          // clip: cut symbols that overflow the coordinate system. false is the default for pictorialBar.
          clip,
        },
      },
      true,
    );
  };
  apply();

  let stop = (): void => {};
  if (bar) {
    const c = button(bar, 'clip: on', () => {
      clip = !clip;
      c.textContent = `clip: ${clip ? 'on' : 'off'}`;
      apply();
    });
    slider(bar, 'yAxis.max', [40, 130, 5], max, (v) => {
      max = v;
      apply();
    });
  } else {
    let i = 0;
    stop = every(1700, () => {
      i++;
      clip = i % 2 === 0;
      max = [70, 100, 60][Math.floor(i / 2) % 3]!;
      apply();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
