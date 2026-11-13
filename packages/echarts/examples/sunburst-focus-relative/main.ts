// Sunburst emphasis.focus: 'ancestor', 'descendant' and the 5.6 'relative', with a blur state for the rest
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { project } from '../../shared/hierarchy-data.ts';

const FOCUS = ['relative', 'ancestor', 'descendant', 'self', 'none'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (focus: string): void => {
    chart.setOption({
      tooltip: { formatter: '{b}: {c} KB' },
      series: [
        {
          type: 'sunburst',
          data: project.children,
          radius: ['10%', '92%'],
          itemStyle: { borderColor: '#222', borderWidth: 1 },
          label: { show: !ctx.preview, fontSize: 11, minAngle: 8 },
          // focus: 'ancestor' keeps the sectors toward the centre, 'descendant' those
          // outward, 'relative' (new in 5.6) both. The others go to the blur state.
          emphasis: { focus },
          blur: { itemStyle: { opacity: 0.2 }, label: { opacity: 0.2 } },
        },
      ],
    });
  };

  let focus = 'relative';
  render(focus);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1000, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: 3 + (i++ % 14) });
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'emphasis.focus', FOCUS, (v) => {
    focus = v;
    render(focus);
  });

  return dispose;
};

export default mount;
