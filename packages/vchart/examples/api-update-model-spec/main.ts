// updateModelSpec: patch one component, selected by id or by { type, index }
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout, type ISpec } from '../../shared/chart.ts';
import { barSpec } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const spec = barSpec({
    legend: !ctx.preview,
    extra: {
      axes: [
        { id: 'value-axis', orient: 'left', title: { visible: !ctx.preview, text: 'value' } },
        { orient: 'bottom', type: 'band' },
      ],
    },
  }) as ISpec;
  const { vchart, release } = createChart(el, ctx, spec);
  const out = bar ? readout(el) : null;

  let alive = true;
  let n = 0;
  const colors = ['#f6bd16', '#5ad8a6', '#e8684a'];
  const byId = (): void => {
    if (!alive) return;
    n += 1;
    // A string filter is the component's id from the spec. forceMerge (third argument) merges the patch
    // into the component's whole spec; without it an axis patch throws because its label spec is missing.
    void vchart.updateModelSpec('value-axis', { title: { text: `value (#${n})`, style: { fill: colors[n % 3] } }, grid: { style: { stroke: colors[n % 3] } } }, true);
    if (out) out.textContent = `updateModelSpec('value-axis', { title: ..., grid: ... }, true)`;
  };
  const byType = (): void => {
    if (!alive) return;
    n += 1;
    // An object filter picks by component type and its index among components of that type.
    void vchart.updateModelSpec({ type: 'legends', index: 0 }, { orient: ['top', 'right', 'bottom'][n % 3] }, true);
    if (out) out.textContent = `updateModelSpec({ type: 'legends', index: 0 }, { orient: ... }, true)`;
  };
  if (bar) {
    button(bar, "By id: retitle 'value-axis'", byId);
    button(bar, 'By { type, index }: move the legend', byType);
    return () => {
      alive = false;
      release();
    };
  }
  // The card has no legend, so it only cycles the axis; the full view alternates both calls.
  const stop = every(1500, byId);
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
