// A progressive palette chosen by the number of data groups
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, slider } from '../../shared/chart.ts';
import { ELEMENTS } from '../../shared/theme-data.ts';

// The three cases of Color_Theme.md: the colours differ with the number of groups.
const colorScheme = {
  default: [
    { maxDomainLength: 3, scheme: ['#1f77b4', '#2ca02c', '#9467bd'] },
    { maxDomainLength: 5, scheme: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'] },
    {
      isAvailable: (domain: unknown[]) => domain.length > 5,
      scheme: ['#1f77b4', '#8c564b', '#ff7f0e', '#e377c2', '#2ca02c', '#7f7f7f', '#d62728', '#bcbd22', '#9467bd'],
    },
  ],
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'elements', values: ELEMENTS.slice(0, 3) }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: 0.85,
    innerRadius: 0.45,
    padAngle: 0.6,
    theme: { colorScheme },
    legends: { visible: !ctx.preview, orient: 'bottom' },
  } as never);
  const out = bar ? readout(el) : null;
  let released = false;
  const setCount = (n: number): void => {
    if (released) return;
    void vchart.updateData('elements', ELEMENTS.slice(0, n));
    const rule = n <= 3 ? 'maxDomainLength 3' : n <= 5 ? 'maxDomainLength 5' : 'isAvailable: domain.length > 5';
    if (out) out.textContent = `${n} groups use the case: ${rule}`;
  };
  setCount(3);

  let stop = (): void => {};
  if (ctx.preview) {
    let n = 3;
    stop = every(1500, () => {
      n = n >= 8 ? 3 : n + 1;
      setCount(n);
    });
  } else if (bar) {
    slider(bar, 'groups', [2, 8, 1], 3, setCount);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;
