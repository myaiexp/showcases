// Graph with force layout, categories and draggable nodes
import type { Mount } from '@/types.ts';
import { controlBar, createChart, slider } from '../../shared/chart.ts';

// Deterministic PRNG so the graph is the same every run.
let seed = 7;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const categories = [{ name: 'Core' }, { name: 'Plugins' }, { name: 'Tools' }];
const nodes = Array.from({ length: 28 }, (_, i) => ({
  id: String(i),
  name: `n${i}`,
  category: i < 4 ? 0 : i < 16 ? 1 : 2,
  symbolSize: i < 4 ? 30 : 12 + Math.round(rnd() * 8),
}));
const links = nodes.slice(1).map((n, i) => ({
  source: n.id,
  target: String(n.category === 0 ? 0 : Math.floor(rnd() * Math.min(i + 1, n.category === 1 ? 4 : 16))),
}));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const apply = (repulsion: number, edgeLength: number): void => {
    chart.setOption({
      legend: ctx.preview ? undefined : { data: categories.map((c) => c.name) },
      tooltip: {},
      series: [
        {
          type: 'graph',
          layout: 'force',
          // force: repulsion between nodes, edgeLength of links; gravity pulls toward the centre.
          force: { repulsion, edgeLength, gravity: 0.08, friction: 0.12, layoutAnimation: true },
          draggable: !ctx.preview, // drag a node and the layout re-settles around it
          roam: !ctx.preview,
          categories,
          data: nodes,
          links,
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: 6,
          lineStyle: { opacity: 0.5, width: 1.5, curveness: 0.1 },
          label: { show: !ctx.preview, position: 'right' },
          emphasis: { focus: 'adjacency', lineStyle: { width: 4 } },
        },
      ],
    });
  };
  let repulsion = 120;
  let edge = 50;
  apply(repulsion, edge);

  if (bar) {
    slider(bar, 'repulsion', [20, 400, 10], repulsion, (v) => { repulsion = v; apply(repulsion, edge); });
    slider(bar, 'edgeLength', [10, 150, 5], edge, (v) => { edge = v; apply(repulsion, edge); });
  }

  return () => dispose();
};

export default mount;
