// Treemap layout tuning: squareRatio, visibleMin and childrenVisibleMin on many uneven nodes
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

// Deterministic skewed sizes: a few big nodes, many tiny ones.
let seed = 11;
const rnd = (): number => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const data = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'].map((group) => ({
  name: group,
  children: Array.from({ length: 14 }, (_, i) => ({ name: `${group[0]}${i + 1}`, value: Math.round(2 + rnd() ** 3 * 300) })),
}));

const GOLDEN = String(0.5 * (1 + Math.sqrt(5)));
const RATIOS: Record<string, number> = { 'golden (default)': Number(GOLDEN), '0.5 (tall)': 0.5, '1 (squares)': 1, '3 (wide)': 3 };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (ratio: number, visibleMin: number, childrenMin: number): void => {
    chart.setOption({
      tooltip: { formatter: '{b}: {c}' },
      series: [
        {
          type: 'treemap',
          data,
          // squareRatio: the aspect ratio (width / height) the layout approaches for each rectangle.
          squareRatio: ratio,
          // visibleMin: a node smaller than this many square pixels is not drawn.
          // childrenVisibleMin: a node smaller than this does not draw its children.
          // Zooming (roam) grows nodes past the thresholds so they appear.
          visibleMin,
          childrenVisibleMin: childrenMin,
          roam: !ctx.preview,
          scaleLimit: { min: 1, max: 6 },
          nodeClick: false,
          breadcrumb: { show: false },
          top: 4,
          bottom: 4,
          left: 4,
          right: 4,
          label: { show: !ctx.preview, formatter: '{b}', fontSize: 10 },
          upperLabel: { show: !ctx.preview, height: 18 },
          levels: [
            { itemStyle: { borderColor: '#222', borderWidth: 2, gapWidth: 2 } },
            { colorSaturation: [0.35, 0.6], itemStyle: { borderColorSaturation: 0.6, gapWidth: 1, borderWidth: 1 } },
          ],
          animationDurationUpdate: 500,
        },
      ],
    });
  };

  let ratio = Number(GOLDEN);
  let visibleMin = 10;
  let childrenMin = 0;
  render(ratio, visibleMin, childrenMin);

  if (ctx.preview) {
    const values = [Number(GOLDEN), 0.5, 1, 3];
    let i = 0;
    const stop = every(1800, () => {
      i++;
      ratio = values[i % values.length]!;
      visibleMin = i % 2 ? 400 : 10;
      render(ratio, visibleMin, childrenMin);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'squareRatio', Object.keys(RATIOS), (v) => {
    ratio = RATIOS[v]!;
    render(ratio, visibleMin, childrenMin);
  });
  slider(bar!, 'visibleMin (px²)', [0, 1500, 50], visibleMin, (v) => {
    visibleMin = v;
    render(ratio, visibleMin, childrenMin);
  });
  slider(bar!, 'childrenVisibleMin (px²)', [0, 20000, 500], childrenMin, (v) => {
    childrenMin = v;
    render(ratio, visibleMin, childrenMin);
  });

  return dispose;
};

export default mount;
