// baseOption plus media rules that re-lay-out two pies and the legend by container width
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, slider, every } from '../../shared/chart.ts';

const fruit = [
  { name: 'Apple', value: 40 },
  { name: 'Pear', value: 25 },
  { name: 'Plum', value: 20 },
  { name: 'Fig', value: 15 },
];
const grains = [
  { name: 'Rye', value: 30 },
  { name: 'Oat', value: 45 },
  { name: 'Wheat', value: 25 },
];

// Below this width the layout switches. A preview card is narrow, so it uses a smaller threshold.
const mount: Mount = (el, ctx) => {
  const threshold = ctx.preview ? 240 : 520;
  const wrap = document.createElement('div');
  wrap.style.width = ctx.preview ? '300px' : '100%';
  wrap.style.maxWidth = '100%';
  const bar = ctx.preview ? null : controlBar(el);
  el.append(wrap);
  const { chart, dispose } = createChart(el, ctx, { parent: wrap, height: 400 });

  const option: EChartsOption = {
    // baseOption always applies...
    baseOption: {
      tooltip: {},
      legend: { textStyle: { fontSize: ctx.preview ? 10 : 12 } },
      series: [
        { name: 'Fruit', type: 'pie', data: fruit, label: { show: false } },
        { name: 'Grain', type: 'pie', data: grains, label: { show: false } },
      ],
    },
    // ...and each media rule whose query matches is merged on top of it, in order.
    media: [
      {
        // No query: the default, used when no other rule matches.
        option: {
          legend: { orient: 'horizontal', left: 'center', right: 'auto', top: 'auto', bottom: 0 },
          series: [
            { radius: [20, '55%'], center: ['27%', '45%'] },
            { radius: [20, '55%'], center: ['73%', '45%'] },
          ],
        },
      },
      {
        query: { maxWidth: threshold },
        option: {
          // Every property touched here is also set in the default rule, so a live resize
          // goes back cleanly (media-query.md: write it in all the rules).
          legend: { orient: 'vertical', left: 'auto', right: 4, top: '15%', bottom: 'auto' },
          series: [
            { radius: [14, '28%'], center: ['40%', '27%'] },
            { radius: [14, '28%'], center: ['40%', '75%'] },
          ],
        },
      },
    ],
  };
  chart.setOption(option);

  let stop = (): void => {};
  if (ctx.preview) {
    let wide = false;
    stop = every(2000, () => {
      wide = !wide;
      wrap.style.width = wide ? '300px' : '180px';
    });
  } else {
    slider(bar!, `container width px (rule at maxWidth ${threshold})`, [280, 900, 10], 900, (v) => {
      wrap.style.width = `${v}px`;
    });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
