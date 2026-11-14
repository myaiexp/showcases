// Tree with emphasis.focus 'ancestor', 'descendant' or 'relative' and a blur state for the rest
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { project } from '../../shared/hierarchy-data.ts';

const FOCUS = ['ancestor', 'descendant', 'relative', 'self', 'none'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (focus: string): void => {
    chart.setOption({
      tooltip: { formatter: '{b}' },
      series: [
        {
          type: 'tree',
          data: [project],
          orient: 'LR',
          initialTreeDepth: ctx.preview ? 2 : -1,
          symbolSize: 9,
          label: { show: !ctx.preview, position: 'left', verticalAlign: 'middle', fontSize: 12 },
          leaves: { label: { show: !ctx.preview, position: 'right', verticalAlign: 'middle' } },
          lineStyle: { width: 1.5 },
          // focus: 'ancestor' keeps the path up to the root, 'descendant' the whole subtree,
          // 'relative' both. Everything else switches to the blur state below.
          emphasis: { focus },
          blur: { itemStyle: { opacity: 0.2 }, label: { opacity: 0.2 }, lineStyle: { opacity: 0.15 } },
          top: 10,
          bottom: 10,
          left: 70,
          right: 70,
        },
      ],
    });
  };

  let focus = 'relative';
  render(focus);

  if (ctx.preview) {
    // Pointer-free: highlight a node by index, cycling through the tree.
    let i = 0;
    const stop = every(900, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 1 + (i++ % 10) });
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'emphasis.focus', FOCUS, (v) => {
    focus = v;
    render(focus);
  }).value = focus;

  return dispose;
};

export default mount;
