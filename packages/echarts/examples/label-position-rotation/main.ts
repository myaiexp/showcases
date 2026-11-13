// Label position, distance and rotation on bars, with a rich fragment inside each label
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const POSITIONS = ['insideBottom', 'inside', 'insideTop', 'top', 'right', 'left'] as const;
type Position = (typeof POSITIONS)[number];
const years = ['2012', '2013', '2014', '2015', '2016'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let rotate = 90;
  let position: Position = 'insideBottom';
  let distance = 15;

  const render = (): void => {
    // `{c}` is the value and `{a}` the series name; `{name|...}` styles that fragment.
    const label = {
      show: true,
      position,
      distance,
      rotate,
      // align / verticalAlign are applied first, then the rotation.
      align: rotate === 90 ? ('left' as const) : ('center' as const),
      verticalAlign: 'middle' as const,
      formatter: '{c}  {name|{a}}',
      fontSize: ctx.preview ? 10 : 14,
      rich: { name: { color: '#ffd666' } },
    };
    chart.setOption({
      legend: { show: !ctx.preview },
      grid: ctx.preview ? { top: 10, bottom: 22, left: 34, right: 10 } : { bottom: 64 },
      xAxis: { type: 'category', data: years },
      yAxis: { type: 'value' },
      series: [
        { name: 'Forest', type: 'bar', barGap: 0, label, emphasis: { focus: 'series' }, data: [320, 332, 301, 334, 390] },
        { name: 'Steppe', type: 'bar', label, emphasis: { focus: 'series' }, data: [220, 182, 191, 234, 290] },
      ],
    });
  };
  render();

  if (ctx.preview) {
    // Upright angles only: at 0° the labels of neighbouring 20px bars overlap.
    const angles = [90, 60, 90, -90];
    let i = 0;
    const stop = every(1600, () => {
      rotate = angles[++i % angles.length]!;
      render();
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'position', POSITIONS, (v) => {
    position = v as Position;
    render();
  });
  slider(bar!, 'distance', [0, 40, 1], distance, (v) => {
    distance = v;
    render();
  });
  slider(bar!, 'rotate', [-90, 90, 5], rotate, (v) => {
    rotate = v;
    render();
  });

  return dispose;
};

export default mount;
