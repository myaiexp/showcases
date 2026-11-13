// A doughnut: [inner, outer] radius, with the highlighted sector's name shown in the hole
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, button, every } from '../../shared/chart.ts';

const data = [
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const show = (inner: number, rounded: boolean): void => {
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: ctx.preview ? { show: false } : { top: 0 },
      series: [
        {
          name: 'Access from',
          type: 'pie',
          // radius as [inner, outer]: a pie is a doughnut with inner radius 0.
          radius: [`${inner}%`, '72%'],
          center: ['50%', ctx.preview ? '50%' : '56%'],
          // Labels are placed by hand in the hole, so keep them from being moved around.
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: rounded ? 8 : 0, borderColor: '#1b1b1f', borderWidth: 2 },
          // Hidden normally, shown big in the center only for the emphasized sector.
          label: { show: false, position: 'center' },
          emphasis: { label: { show: true, fontSize: ctx.preview ? 14 : 24, fontWeight: 'bold' } },
          labelLine: { show: false },
          data,
        },
      ],
    });
  };
  let inner = 45;
  let rounded = true;
  show(inner, rounded);

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 0;
    chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 0 });
    stop = every(1200, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      n += 1;
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: n % data.length });
    });
  } else {
    slider(bar!, 'inner radius %', [0, 70, 1], inner, (v) => {
      inner = v;
      show(inner, rounded);
    });
    const r = button(bar!, 'borderRadius: on', () => {
      rounded = !rounded;
      r.textContent = `borderRadius: ${rounded ? 'on' : 'off'}`;
      show(inner, rounded);
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
