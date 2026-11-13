// How a funnel maps values to widths: min, max, minSize and maxSize
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, slider } from '../../shared/chart.ts';
import { STAGES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { min: 0, max: 100, minSize: 0, maxSize: 100 };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}' },
      series: [
        {
          type: 'funnel',
          left: '15%',
          width: '70%',
          top: ctx.preview ? 8 : 20,
          bottom: ctx.preview ? 8 : 20,
          // A value of min is drawn minSize wide, a value of max is drawn maxSize wide (percent of the layout width).
          min: look.min,
          max: look.max,
          minSize: `${look.minSize}%`,
          maxSize: `${look.maxSize}%`,
          sort: 'descending',
          gap: 2,
          label: { show: true, position: 'inside', formatter: '{b}: {c}', fontSize: ctx.preview ? 10 : 12 },
          itemStyle: { borderColor: '#1b1f27', borderWidth: 1 },
          data: STAGES.map((s) => ({ name: s.name, value: s.actual })),
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps = [
      [0, 100, 0, 100],
      [0, 100, 30, 100],
      [0, 100, 30, 60],
      [40, 100, 0, 100],
      [0, 60, 0, 100],
    ] as const;
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      [look.min, look.max, look.minSize, look.maxSize] = steps[n % steps.length]!;
      apply();
    });
  } else {
    slider(bar!, 'min', [0, 60, 5], look.min, (v) => { look.min = v; apply(); });
    slider(bar!, 'max', [60, 200, 5], look.max, (v) => { look.max = v; apply(); });
    slider(bar!, 'minSize %', [0, 90, 5], look.minSize, (v) => { look.minSize = v; apply(); });
    slider(bar!, 'maxSize %', [30, 100, 5], look.maxSize, (v) => { look.maxSize = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
