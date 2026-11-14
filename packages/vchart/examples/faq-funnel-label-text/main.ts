// FAQ: two-line funnel labels and a different text on the outer label, through label.style.text
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const STEPS = ['Sent', 'Viewed', 'Clicked', 'Add to Cart', 'Purchased'];
const rows = (k: number): { name: string; value: number }[] =>
  [5676, 3872, 1668, 610, 565].map((value, i) => ({ name: STEPS[i] ?? '', value: Math.round(value * (1 + (k % 3) * 0.08)) }));

const MODES = ['custom text', 'default'] as const;

const build = (mode: string, preview: boolean): ISpec => {
  const custom = mode === 'custom text';
  return {
    type: 'funnel',
    data: [{ id: 'f', values: rows(0) }],
    categoryField: 'name',
    valueField: 'value',
    isTransform: true,
    legends: { visible: !preview, orient: 'top' },
    // style.text is a callback over the datum: an array becomes lines of text.
    label: { visible: true, style: custom ? { text: (d: Record<string, string | number>) => [String(d.name), String(d.value)] } : {} },
    transformLabel: { visible: true },
    outerLabel: {
      visible: true,
      position: 'right',
      style: custom ? { text: (d: Record<string, string | number>) => `${d.name}: ${d.value}` } : {},
    },
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, build(MODES[0], ctx.preview));
  let k = 0;
  const rebuild = (mode: string): void => {
    chart.release();
    chart = createChart(el, ctx, build(mode, ctx.preview));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'label text', MODES, rebuild);
  }
  const stop = every(1800, () => {
    k += 1;
    void chart.vchart.updateData('f', rows(k));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
