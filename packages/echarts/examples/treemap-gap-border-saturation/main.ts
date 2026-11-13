// Treemap level borders: gapWidth, borderWidth, borderRadius and borderColorSaturation versus a fixed borderColor
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { project } from '../../shared/hierarchy-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (gap: number, border: number, radius: number, saturation: string): void => {
    // With borderColorSaturation set, borderColor is ignored: each border is the node's
    // colour mixed with that saturation. Otherwise every level shares the fixed colour.
    const border2 = saturation === 'fixed' ? { borderColor: '#f4f4f4' } : { borderColorSaturation: Number(saturation) };
    chart.setOption(
      {
        tooltip: { formatter: '{b}: {c} KB' },
        series: [
          {
            type: 'treemap',
            data: project.children,
            roam: false,
            nodeClick: false,
            breadcrumb: { show: false },
            top: 4,
            bottom: 4,
            left: 4,
            right: 4,
            label: { show: !ctx.preview, formatter: '{b}', fontSize: 11 },
            upperLabel: { show: false },
            levels: [
              // Level 0: the top-level boxes; gapWidth spaces the boxes inside each one.
              { itemStyle: { borderColor: '#222', borderWidth: 0, gapWidth: gap } },
              // Deeper levels take their colour from the parent and shade it with colorSaturation.
              { colorSaturation: [0.35, 0.6], itemStyle: { ...border2, borderWidth: border, gapWidth: gap, borderRadius: radius } },
              { colorSaturation: [0.3, 0.5], itemStyle: { ...border2, borderWidth: border, gapWidth: Math.max(1, gap - 1), borderRadius: radius } },
            ],
            animationDurationUpdate: 500,
          },
        ],
      },
      true,
    );
  };

  let gap = 4;
  let border = 3;
  let radius = 4;
  let sat = '0.6';
  render(gap, border, radius, sat);

  if (ctx.preview) {
    let t = 0;
    const stop = every(1500, () => {
      t++;
      gap = [1, 6, 10, 4][t % 4]!;
      border = [1, 3, 5, 3][t % 4]!;
      sat = ['fixed', '0.6', '0.9', '0.3'][t % 4]!;
      render(gap, border, radius, sat);
    });
    return () => {
      stop();
      dispose();
    };
  }

  slider(bar!, 'gapWidth', [0, 12, 1], gap, (v) => { gap = v; render(gap, border, radius, sat); });
  slider(bar!, 'borderWidth', [0, 8, 1], border, (v) => { border = v; render(gap, border, radius, sat); });
  slider(bar!, 'borderRadius', [0, 16, 1], radius, (v) => { radius = v; render(gap, border, radius, sat); });
  select(bar!, 'borderColorSaturation', ['fixed', '0.3', '0.6', '0.9'], (v) => { sat = v; render(gap, border, radius, sat); }).value = sat;

  return dispose;
};

export default mount;
