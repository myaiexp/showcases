// Per-item layer heights (data[i].itemStyle.height) and styled guide lines for outside labels
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { STAGES } from '../../shared/pie-data.ts';

// Heights are percentages of the layout height and should add up to 100%.
const heights: Record<string, number[]> = {
  even: [20, 20, 20, 20, 20],
  'top heavy': [40, 25, 15, 12, 8],
  'bottom heavy': [8, 12, 15, 25, 40],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { heights: 'top heavy', length: 40, curve: 'solid', width: 2 };
  const apply = (): void => {
    chart.setOption({
      series: [
        {
          type: 'funnel',
          left: '25%',
          width: '50%',
          top: ctx.preview ? 8 : 20,
          bottom: ctx.preview ? 8 : 20,
          sort: 'none',
          gap: 2,
          label: { show: true, position: 'left', formatter: '{b}: {c}', fontSize: ctx.preview ? 10 : 12 },
          labelLine: {
            show: true,
            length: look.length,
            lineStyle: { type: look.curve, width: look.width },
          },
          itemStyle: { borderColor: '#1b1f27', borderWidth: 1 },
          data: STAGES.map((s, i) => ({
            name: s.name,
            value: s.actual,
            // Height of this layer: a number of pixels or a percentage string.
            itemStyle: { height: `${heights[look.heights]![i]}%` },
          })),
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const names = Object.keys(heights);
    let n = 0;
    stop = every(1500, () => {
      n += 1;
      look.heights = names[n % names.length]!;
      look.length = [40, 15, 60][n % 3]!;
      apply();
    });
  } else {
    select(bar!, 'item heights', Object.keys(heights), (v) => { look.heights = v; apply(); }).value = look.heights;
    select(bar!, 'labelLine type', ['solid', 'dashed', 'dotted'], (v) => { look.curve = v; apply(); });
    slider(bar!, 'labelLine.length', [0, 100, 1], look.length, (v) => { look.length = v; apply(); });
    slider(bar!, 'lineStyle.width', [1, 6, 1], look.width, (v) => { look.width = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
