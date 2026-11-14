// FAQ: make the stack, legend and tooltip order agree: stackInverse, field domain and updateContent
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { pick, rng } from '../../shared/components-data.ts';

const GROUPS = ['China', 'USA', 'EU', 'Africa'];
const TYPES = ['Nail polish', 'Lipstick', 'Mascara', 'Rouge'];
const r = rng(31);
const values = TYPES.flatMap((type) => GROUPS.map((country) => ({ type, country, value: Math.round(3000 + r() * 12000) })));
const MODES = ['default', 'stackInverse', 'updateContent reverse', 'domain + sortIndex'] as const;

const build = (mode: string): ISpec => {
  const spec: Record<string, unknown> = {
    type: 'bar',
    data: [{ id: 'd', values, ...(mode === 'domain + sortIndex' ? { fields: { country: { domain: [...GROUPS].reverse(), sortIndex: 0 } } } : {}) }],
    xField: 'type',
    yField: 'value',
    seriesField: 'country',
    stack: true,
    legends: { visible: true, orient: 'top' },
    tooltip: { activeType: ['dimension'], dimension: {} },
  };
  // 1. stackInverse flips the stack so it matches the tooltip's order.
  if (mode === 'stackInverse') spec.stackInverse = true;
  // 2. Or leave the stack and reverse the tooltip lines.
  if (mode === 'updateContent reverse') {
    spec.tooltip = { activeType: ['dimension'], dimension: { updateContent: (items: unknown[]) => [...items].reverse() } };
  }
  // 3. data.fields domain + sortIndex 0 fixes the order of the group field (and so stack and legend).
  return spec as unknown as ISpec;
};

const mount: Mount = (el, ctx) => {
  let chart = createChart(el, ctx, build(MODES[0]));
  const rebuild = (mode: string): void => {
    chart.release();
    chart = createChart(el, ctx, build(mode));
  };
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'ordering', MODES, rebuild);
  }
  let i = 0;
  const stop = every(1300, () => {
    i += 1;
    if (ctx.preview && i % 4 === 0) rebuild(pick(MODES, i / 4));
    chart.vchart.setDimensionIndex(pick(TYPES, i));
  });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;
