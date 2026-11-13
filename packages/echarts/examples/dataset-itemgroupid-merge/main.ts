// Twelve monthly bars merge into four quarterly bars and split back, linked by encode.itemGroupId
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthly = [42, 55, 38, 61, 70, 52, 45, 66, 58, 80, 73, 90];

// Each row is [label, value, groupId]. A month's group id is its quarter; a quarter's own
// group id is that same quarter, so the old and new items that share an id are matched.
const monthRows = months.map((m, i) => [m, monthly[i]!, `Q${Math.floor(i / 3) + 1}`]);
const quarterRows = [0, 1, 2, 3].map((q) => [`Q${q + 1}`, monthly.slice(q * 3, q * 3 + 3).reduce((a, b) => a + b, 0), `Q${q + 1}`]);

function build(view: 'months' | 'quarters', divide: 'split' | 'clone'): EChartsOption {
  return {
    animationDurationUpdate: 900,
    grid: { top: 24, left: 44, right: 16, bottom: 28 },
    // dimensions name the columns so encode can refer to them.
    dataset: { dimensions: ['label', 'value', 'group'], source: view === 'months' ? monthRows : quarterRows },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [
      {
        type: 'bar',
        // The shared id is what associates the series between the two options.
        id: 'revenue',
        colorBy: 'data',
        label: { show: true, position: 'top' },
        // itemGroupId: the dimension holding each item's group id.
        encode: { x: 'label', y: 'value', itemGroupId: 'group' },
        universalTransition: { enabled: true, divideShape: divide },
      },
    ],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let view: 'months' | 'quarters' = 'months';
  let divide: 'split' | 'clone' = 'split';
  const show = (): void => {
    chart.setOption(build(view, divide), true);
  };
  const flip = (): void => {
    view = view === 'months' ? 'quarters' : 'months';
    show();
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(2200, flip);
  } else {
    button(bar!, 'merge / split', flip);
    select(bar!, 'divideShape', ['split', 'clone'], (v) => {
      divide = v as 'split' | 'clone';
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;
