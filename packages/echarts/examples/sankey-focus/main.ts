// Sankey flows with orient and emphasis.focus adjacency, highlighting nodes on a timer
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const nodes = ['Coal', 'Gas', 'Wind', 'Grid', 'Industry', 'Homes', 'Transport', 'Losses'].map((name) => ({ name }));
const links = [
  { source: 'Coal', target: 'Grid', value: 30 },
  { source: 'Gas', target: 'Grid', value: 25 },
  { source: 'Wind', target: 'Grid', value: 20 },
  { source: 'Gas', target: 'Transport', value: 10 },
  { source: 'Grid', target: 'Industry', value: 35 },
  { source: 'Grid', target: 'Homes', value: 28 },
  { source: 'Grid', target: 'Transport', value: 5 },
  { source: 'Grid', target: 'Losses', value: 7 },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const apply = (orient: string, focus: string): void => {
    chart.setOption({
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'sankey',
          orient, // 'horizontal' | 'vertical'
          left: 20,
          right: 60,
          top: 10,
          bottom: 10,
          nodeWidth: 14,
          nodeGap: 8,
          draggable: !ctx.preview,
          // focus: 'adjacency' dims everything except the hovered edge/node and its neighbours.
          emphasis: { focus },
          lineStyle: { color: 'gradient', curveness: 0.5 },
          label: { fontSize: ctx.preview ? 10 : 12 },
          data: nodes,
          links,
        },
      ],
    });
  };
  apply('horizontal', 'adjacency');

  if (bar) {
    let orient = 'horizontal';
    let focus = 'adjacency';
    select(bar, 'orient', ['horizontal', 'vertical'], (v) => { orient = v; apply(orient, focus); });
    select(bar, 'emphasis.focus', ['adjacency', 'trajectory', 'self', 'none'], (v) => { focus = v; apply(orient, focus); });
  }

  // Emphasis state can be driven by dispatchAction, which is also how the preview moves.
  let i = 0;
  let prev = -1;
  const stop = every(ctx.preview ? 1200 : 1800, () => {
    if (prev >= 0) chart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: prev });
    prev = i++ % nodes.length;
    chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: prev });
  });

  return () => {
    stop();
    dispose();
  };
};

export default mount;
