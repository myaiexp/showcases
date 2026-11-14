// setDimensionIndex with its options: tooltip only, crosshair only, or both
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { CATS, barSpec } from '../../shared/api-data.ts';
import { pick } from '../../shared/components-data.ts';

type Mix = 'tooltip + crosshair' | 'tooltip only' | 'crosshair only';
const MIXES: Mix[] = ['tooltip + crosshair', 'tooltip only', 'crosshair only'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = barSpec({
    legend: false,
    extra: {
      tooltip: { dimension: { visible: true }, mark: { visible: false } },
      crosshair: { xField: { visible: true, line: { type: 'rect', style: { fill: 'rgba(246,189,22,0.18)' } } } },
    },
  });
  const { vchart, release } = createChart(el, ctx, spec);
  const out = bar ? readout(el) : null;
  let mix: Mix = 'tooltip + crosshair';
  let i = 0;
  let alive = true;

  const step = (): void => {
    if (!alive) return;
    const category = pick(CATS, i++);
    vchart.setDimensionIndex(category, {
      tooltip: mix !== 'crosshair only',
      crosshair: mix !== 'tooltip only',
      // filter limits which axis components react; here only the bottom (category) axis does.
      filter: (cmp) => (cmp as unknown as { getOrient?: () => string }).getOrient?.() === 'bottom',
    });
    if (out) out.textContent = `setDimensionIndex('${category}', { tooltip: ${mix !== 'crosshair only'}, crosshair: ${mix !== 'tooltip only'}, filter: bottom axis only })`;
  };
  if (bar) {
    window.setTimeout(step, 500);
    select(bar, 'show', MIXES, (v) => {
      mix = v as Mix;
      step();
    });
    const next = document.createElement('button');
    next.type = 'button';
    next.textContent = 'Next category';
    next.addEventListener('click', step);
    bar.append(next);
    return () => {
      alive = false;
      release();
    };
  }
  let k = 0;
  const stop = every(1000, () => {
    if (k++ % 5 === 0) mix = MIXES[(k / 5) % 3 | 0] as Mix;
    step();
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
