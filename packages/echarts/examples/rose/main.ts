// Rose (Nightingale) chart: roseType 'area' versus 'radius' on the same pie data
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, every } from '../../shared/chart.ts';

const data = [
  { value: 40, name: 'rose 1' },
  { value: 38, name: 'rose 2' },
  { value: 32, name: 'rose 3' },
  { value: 30, name: 'rose 4' },
  { value: 28, name: 'rose 5' },
  { value: 26, name: 'rose 6' },
  { value: 22, name: 'rose 7' },
  { value: 18, name: 'rose 8' },
];

type Rose = 'area' | 'radius';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const show = (roseType: Rose): void => {
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: ctx.preview ? { show: false } : { top: 0 },
      series: [
        {
          name: 'Radius mode',
          type: 'pie',
          // 'area': every sector spans the same angle and the value is the radius.
          // 'radius': the angle shows the share and the radius shows the value as well.
          roseType,
          radius: ctx.preview ? [20, '78%'] : [30, '70%'],
          center: ['50%', ctx.preview ? '50%' : '56%'],
          itemStyle: { borderRadius: 6 },
          label: { show: !ctx.preview },
          data,
        },
      ],
    });
  };
  show('area');

  let stop = (): void => {};
  if (ctx.preview) {
    let mode: Rose = 'area';
    stop = every(2200, () => {
      mode = mode === 'area' ? 'radius' : 'area';
      show(mode);
    });
  } else {
    select(bar!, 'roseType', ['area', 'radius'], (v) => show(v as Rose));
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
