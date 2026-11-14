// A basic spec built up part by part: mapping, series style, label, legend, crosshair
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { yearGroups } from '../../shared/concepts-data.ts';

const STAGES = ['1 type, data, mapping', '2 + bar style', '3 + label', '4 + legends', '5 + crosshair'] as const;

/** The spec of A_Basic_Spec.md, with every part past `stage` left out. */
function specAt(stage: number): ISpec {
  const spec: Record<string, unknown> = {
    type: 'bar',
    data: [{ id: 'barData', values: yearGroups }],
    xField: ['year', 'type'],
    yField: 'value',
    seriesField: 'type',
  };
  if (stage >= 1) spec.bar = { style: { cornerRadius: 4 } };
  if (stage >= 2) spec.label = { visible: true, position: 'top' };
  if (stage >= 3) spec.legends = { visible: true, orient: 'top', position: 'start' };
  if (stage >= 4) spec.crosshair = { xField: { visible: true }, yField: { visible: false } };
  return spec as unknown as ISpec;
}

const mount: Mount = (el, ctx) => {
  let stage = ctx.preview ? 0 : STAGES.length - 1;
  const bar = ctx.preview ? null : controlBar(el);
  let chart = createChart(el, ctx, specAt(stage));
  // A new instance per stage: updateSpec merges into the old spec, so a removed part could linger.
  const apply = (): void => {
    chart.release();
    chart = createChart(el, ctx, specAt(stage));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    stop = every(1500, () => {
      stage = (stage + 1) % STAGES.length;
      apply();
    });
  } else if (bar) {
    const out = readout(el);
    const show = (): void => {
      out.textContent = `Spec keys: ${Object.keys(specAt(stage)).join(', ')}`;
    };
    const sel = select(bar, 'Parts', STAGES, (v) => {
      stage = STAGES.indexOf(v as (typeof STAGES)[number]);
      apply();
      show();
    });
    sel.value = STAGES[stage] ?? STAGES[0];
    button(bar, 'Next part', () => {
      stage = (stage + 1) % STAGES.length;
      sel.value = STAGES[stage] ?? STAGES[0];
      apply();
      show();
    });
    show();
  }

  return () => {
    stop();
    chart.release();
  };
};

export default mount;
