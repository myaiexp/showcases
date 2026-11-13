// Treemap with per-level styling and click-to-drill-down with a breadcrumb
import type { Mount } from '@/types.ts';
import { createChart } from '../../shared/chart.ts';

const leaf = (name: string, value: number): { name: string; value: number } => ({ name, value });
const data = [
  { name: 'Frontend', children: [leaf('React', 40), leaf('Vue', 30), leaf('Svelte', 12), leaf('Solid', 6)] },
  { name: 'Backend', children: [leaf('Node', 35), leaf('Go', 22), leaf('Rust', 15), leaf('Python', 28)] },
  { name: 'Data', children: [
    { name: 'SQL', children: [leaf('Postgres', 25), leaf('MySQL', 14), leaf('SQLite', 10)] },
    { name: 'NoSQL', children: [leaf('Redis', 16), leaf('Mongo', 12)] },
  ] },
  { name: 'Ops', children: [leaf('Docker', 20), leaf('K8s', 18), leaf('Terraform', 9)] },
];

const mount: Mount = (el, ctx) => {
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  chart.setOption({
    tooltip: { formatter: '{b}: {c}' },
    series: [
      {
        type: 'treemap',
        data,
        roam: false,
        // nodeClick 'zoomToNode' zooms; 'link' follows links; false disables.
        nodeClick: ctx.preview ? false : 'zoomToNode',
        // Breadcrumb shows the path of the drilled root. Hidden in the small preview.
        breadcrumb: { show: !ctx.preview, bottom: 4 },
        top: 4,
        bottom: ctx.preview ? 4 : 36,
        left: 4,
        right: 4,
        // levels[i] styles tree depth i; colorSaturation shades children within a parent.
        levels: [
          { itemStyle: { borderColor: '#555', borderWidth: 0, gapWidth: 2 } },
          {
            colorSaturation: [0.35, 0.6],
            itemStyle: { borderColorSaturation: 0.7, gapWidth: 2, borderWidth: 2 },
            upperLabel: { show: !ctx.preview, height: 22 },
          },
          { colorSaturation: [0.3, 0.5], itemStyle: { borderColorSaturation: 0.6, gapWidth: 1 } },
        ],
        label: { show: true, formatter: '{b}', fontSize: ctx.preview ? 10 : 12 },
        upperLabel: { show: false },
        animationDurationUpdate: 600,
      },
    ],
  });

  // The preview has no pointer, so it "drills down" by swapping the data root itself
  // between the whole tree and each top-level group.
  let timer = 0;
  if (ctx.preview) {
    let i = 0;
    timer = window.setInterval(() => {
      const k = i++ % (data.length + 1);
      chart.setOption({ series: [{ data: k === data.length ? data : data[k]!.children }] });
    }, 2200);
  }

  return () => {
    window.clearInterval(timer);
    dispose();
  };
};

export default mount;
