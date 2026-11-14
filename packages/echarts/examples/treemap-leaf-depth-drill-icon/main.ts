// Treemap drill down with leafDepth, drillDownIcon and a styled breadcrumb
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { project, type HNode } from '../../shared/hierarchy-data.ts';

// ids by path so treemapRootToNode can find a node
const withIds = (n: HNode, path = ''): Record<string, unknown> => ({
  ...n,
  id: `${path}/${n.name}`,
  ...(n.children ? { children: n.children.map((c) => withIds(c, `${path}/${n.name}`)) } : {}),
});
const data = (project.children ?? []).map((c) => withIds(c));
const TOP_IDS = (project.children ?? []).map((c) => `/${c.name}`);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (leafDepth: number, icon: string, crumbHeight: number): void => {
    chart.setOption(
      {
        tooltip: { formatter: '{b}: {c} KB' },
        series: [
          {
            type: 'treemap',
            data,
            // leafDepth: show this many levels below the current root; clicking a node
            // with deeper children makes it the root (drill down). Unset, there is no drill down.
            leafDepth,
            // drillDownIcon marks nodes that can still be opened.
            drillDownIcon: icon,
            roam: false,
            top: 4,
            left: 4,
            right: 4,
            bottom: ctx.preview ? 4 : crumbHeight + 12,
            // breadcrumb: the path back up. height and itemStyle restyle it.
            breadcrumb: {
              show: !ctx.preview,
              height: crumbHeight,
              bottom: 4,
              itemStyle: { color: '#3a4a63', borderColor: '#6c85b0', textStyle: { color: '#fff' } },
              emphasis: { itemStyle: { color: '#5470c6' } },
            },
            upperLabel: { show: true, height: 22, color: '#fff' },
            label: { show: !ctx.preview, formatter: '{b}', fontSize: 12 },
            levels: [
              { itemStyle: { borderColor: '#222', borderWidth: 3, gapWidth: 3 }, colorSaturation: [0.35, 0.55] },
              { itemStyle: { borderColor: '#222', borderWidth: 2, gapWidth: 2 }, colorSaturation: [0.3, 0.5] },
              { itemStyle: { borderColor: '#222', borderWidth: 1, gapWidth: 1 }, colorSaturation: [0.3, 0.5] },
            ],
            animationDurationUpdate: 600,
          },
        ],
      },
      true,
    );
  };

  let leafDepth = 1;
  let icon = '▶';
  let crumbHeight = 22;
  render(leafDepth, icon, crumbHeight);

  if (ctx.preview) {
    // No pointer: enter each top-level node by action, then re-render to climb back out.
    let i = 0;
    const stop = every(2000, () => {
      const k = i++ % (TOP_IDS.length + 1);
      if (k === TOP_IDS.length) render(leafDepth, icon, crumbHeight);
      else chart.dispatchAction({ type: 'treemapRootToNode', seriesIndex: 0, targetNodeId: TOP_IDS[k] });
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'leafDepth', ['1', '2', '3'], (v) => {
    leafDepth = Number(v);
    render(leafDepth, icon, crumbHeight);
  });
  select(bar!, 'drillDownIcon', ['▶', '▸', '+', '»', ''], (v) => {
    icon = v;
    render(leafDepth, icon, crumbHeight);
  });
  slider(bar!, 'breadcrumb.height', [16, 40, 2], crumbHeight, (v) => {
    crumbHeight = v;
    render(leafDepth, icon, crumbHeight);
  });

  return dispose;
};

export default mount;
