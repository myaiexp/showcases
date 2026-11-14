// A funnel laid out left to right with orient 'horizontal', and the label positions it allows
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { STAGES } from '../../shared/pie-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { orient: 'horizontal', position: 'top', gap: 4, lineLength: 20 };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{b}: {c}' },
      series: [
        {
          type: 'funnel',
          // 'vertical' (the default) stacks the layers top to bottom, 'horizontal' runs them left to right.
          orient: look.orient,
          left: 40,
          right: 40,
          top: ctx.preview ? 30 : 60,
          bottom: ctx.preview ? 30 : 60,
          sort: 'descending',
          gap: look.gap,
          label: {
            show: true,
            // 'top' and 'bottom' go with a horizontal funnel, 'left' and 'right' with a vertical one;
            // 'inside' and the corner positions work for both.
            position: look.position,
            formatter: '{b}\n{c}',
            fontSize: ctx.preview ? 10 : 12,
          },
          // The guide line shows when the label is outside the layer.
          labelLine: { length: look.lineLength, lineStyle: { width: 1, type: 'solid' } },
          itemStyle: { borderColor: '#1b1f27', borderWidth: 1 },
          data: STAGES.map((s) => ({ name: s.name, value: s.actual })),
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps = [
      ['horizontal', 'top'],
      ['horizontal', 'bottom'],
      ['horizontal', 'inside'],
      ['vertical', 'right'],
    ] as const;
    let n = 0;
    stop = every(1600, () => {
      n += 1;
      [look.orient, look.position] = steps[n % steps.length]!;
      apply();
    });
  } else {
    // The outside positions depend on orient: a horizontal funnel rejects 'left'/'right' and a
    // vertical one 'top'/'bottom' (ECharts warns and falls back), so the list follows orient.
    const shared = ['inside', 'insideLeft', 'insideRight', 'leftTop', 'rightBottom'];
    const outside = { horizontal: ['top', 'bottom'], vertical: ['left', 'right'] } as const;
    select(bar!, 'orient', ['horizontal', 'vertical'], (v) => {
      const from = outside[look.orient as keyof typeof outside];
      const to = outside[v as keyof typeof outside];
      const i = (from as readonly string[]).indexOf(look.position);
      if (i >= 0) look.position = to[i]!;
      look.orient = v;
      fillPositions();
      apply();
    });
    const positions = select(bar!, 'label.position', [], (v) => {
      look.position = v;
      apply();
    });
    const fillPositions = (): void => {
      positions.length = 0;
      for (const p of [...outside[look.orient as keyof typeof outside], ...shared]) positions.add(new Option(p, p));
      positions.value = look.position;
    };
    fillPositions();
    slider(bar!, 'gap', [0, 20, 1], look.gap, (v) => { look.gap = v; apply(); });
    slider(bar!, 'labelLine.length', [0, 60, 1], look.lineLength, (v) => { look.lineLength = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
