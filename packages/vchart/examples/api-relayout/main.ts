// setLayout installs a custom layout function; reLayout runs it again after the state it reads changes
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, slider, type ISpec } from '../../shared/chart.ts';

const pie = (i: number): object => ({
  type: 'pie',
  regionId: `r${i}`,
  categoryField: 'type',
  valueField: 'value',
  seriesField: 'type',
  label: { visible: false },
  outerRadius: 0.95,
  data: { id: `d${i}`, values: [10, 6, 14].map((value, k) => ({ type: `t${k}`, value: value + i * 4 })) },
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = {
    type: 'common',
    padding: 0,
    region: [{ id: 'r0' }, { id: 'r1' }],
    series: [pie(0), pie(1)],
    legends: { visible: false },
    tooltip: { visible: false },
  } as unknown as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  const out = bar ? readout(el) : null;

  let gap = 0.1;
  // The layout function closes over `gap`; it runs on every layout pass, including reLayout().
  vchart.setLayout((_chart, items, rect) => {
    const regions = items.filter((item) => item.layoutType === 'region');
    const size = Math.min(rect.height, (rect.width * (1 - gap)) / 2);
    const total = size * 2 + rect.width * gap;
    const x0 = (rect.width - total) / 2;
    regions.forEach((item, i) => {
      item.setLayoutStartPosition({ x: x0 + i * (size + rect.width * gap), y: (rect.height - size) / 2 });
      item.setLayoutRect({ width: size, height: size });
      (item as { updateLayoutAttribute?: () => void }).updateLayoutAttribute?.();
    });
  });
  let alive = true;
  const apply = (): void => {
    if (!alive) return;
    vchart.reLayout();
    if (out) out.textContent = `gap = ${gap.toFixed(2)} of the width; reLayout() re-ran the function`;
  };
  apply();
  if (bar) {
    slider(bar, 'gap %', [0, 60, 2], 10, (v) => {
      gap = v / 100;
      apply();
    });
    return () => {
      alive = false;
      release();
    };
  }
  let t = 0;
  const stop = every(100, () => {
    t += 0.1;
    gap = 0.1 + 0.4 * ((Math.sin(t) + 1) / 2);
    apply();
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
