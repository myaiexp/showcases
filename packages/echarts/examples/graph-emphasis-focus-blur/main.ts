// Graph emphasis state: focus (none, self, series, adjacency), blurScope, highlight scale and blur opacity
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { TEAMS, collaborations, people } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (focus: string, blurScope: string, scale: number, blurOpacity: number): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'graph',
          layout: 'circular',
          categories: TEAMS.map((name) => ({ name })),
          data: people.map((p) => ({ name: p.name, category: p.team, symbolSize: 22 })),
          links: collaborations.map(([source, target]) => ({ source, target })),
          label: { show: !ctx.preview, position: 'right' },
          lineStyle: { opacity: 0.6, curveness: 0.2 },
          emphasis: {
            // focus: what stays sharp when a node is highlighted; 'adjacency' keeps its
            // neighbours and the edges between them. The rest turns to the blur state.
            focus,
            // blurScope: how far the fading reaches (only matters for 'self' and 'series').
            blurScope,
            // scale: the node grows by this factor when highlighted.
            scale,
            lineStyle: { width: 4 },
          },
          blur: { itemStyle: { opacity: blurOpacity }, lineStyle: { opacity: blurOpacity / 2 } },
          top: 40,
          bottom: 40,
        },
      ],
    });
  };

  let focus = 'adjacency';
  let blurScope = 'coordinateSystem';
  let scale = 1.6;
  let blurOpacity = 0.15;
  render(focus, blurScope, scale, blurOpacity);

  if (ctx.preview) {
    // No pointer in a preview: highlight one node after another by action.
    let i = 0;
    const stop = every(900, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: 0 });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: i++ % people.length });
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'emphasis.focus', ['none', 'self', 'series', 'adjacency'], (v) => {
    focus = v;
    render(focus, blurScope, scale, blurOpacity);
  }).value = focus;
  select(bar!, 'emphasis.blurScope', ['coordinateSystem', 'series', 'global'], (v) => {
    blurScope = v;
    render(focus, blurScope, scale, blurOpacity);
  });
  slider(bar!, 'emphasis.scale', [1, 2.5, 0.1], scale, (v) => {
    scale = v;
    render(focus, blurScope, scale, blurOpacity);
  });
  slider(bar!, 'blur opacity', [0, 1, 0.05], blurOpacity, (v) => {
    blurOpacity = v;
    render(focus, blurScope, scale, blurOpacity);
  });

  return dispose;
};

export default mount;
