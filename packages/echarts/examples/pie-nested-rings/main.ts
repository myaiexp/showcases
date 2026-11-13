// Two pie series as concentric rings: categories inside, their members outside
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, slider } from '../../shared/chart.ts';

// Outer values add up to the inner value of their group, so the rings line up.
const groups = [
  { name: 'Fruit', items: [['Apple', 30], ['Pear', 14], ['Grape', 22], ['Fig', 6]] },
  { name: 'Vegetables', items: [['Carrot', 25], ['Leek', 10], ['Beet', 12]] },
  { name: 'Grains', items: [['Rye', 28], ['Oat', 16], ['Spelt', 7]] },
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);

  const look = { gap: true, inner: 45, outer: 65 };
  const apply = (): void => {
    chart.setOption({
      tooltip: { trigger: 'item', formatter: '{a}<br/>{b}: {c} ({d}%)' },
      series: [
        {
          name: 'Group',
          type: 'pie',
          // The inner ring: radius is [inner, outer] and ends where the outer ring starts.
          radius: [0, '35%'],
          center: ['50%', '50%'],
          selectedMode: 'single',
          label: { position: 'inside', fontSize: ctx.preview ? 10 : 12 },
          labelLine: { show: false },
          itemStyle: { borderColor: '#1b1f27', borderWidth: look.gap ? 2 : 0 },
          data: groups.map((g) => ({ name: g.name, value: g.items.reduce((s, [, v]) => s + v, 0) })),
        },
        {
          name: 'Item',
          type: 'pie',
          radius: [`${look.inner}%`, `${look.outer}%`],
          center: ['50%', '50%'],
          label: { show: !ctx.preview, formatter: '{b}' },
          itemStyle: { borderColor: '#1b1f27', borderWidth: look.gap ? 2 : 0 },
          data: groups.flatMap((g) => g.items.map(([name, value]) => ({ name, value }))),
        },
      ],
    });
  };
  apply();

  let stop = (): void => {};
  if (ctx.preview) {
    // Highlight the groups in turn: inner sector n and the first member of the outer ring.
    let n = 0;
    stop = every(1100, () => {
      chart.dispatchAction({ type: 'downplay', seriesIndex: [0, 1] });
      chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: n % groups.length });
      n += 1;
    });
  } else {
    const gap = button(bar!, 'sector borders: on', () => {
      look.gap = !look.gap;
      gap.textContent = `sector borders: ${look.gap ? 'on' : 'off'}`;
      apply();
    });
    slider(bar!, 'outer ring inner radius %', [36, 60, 1], look.inner, (v) => { look.inner = v; apply(); });
    slider(bar!, 'outer ring outer radius %', [62, 85, 1], look.outer, (v) => { look.outer = v; apply(); });
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;
