// Every categorical scheme as the colours an ordinal scale hands out, one row lit at a time
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { cycleSteps } from '../../shared/cards.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const sizes: Record<string, number> = {
    accent: 8, category10: 10, category20: 20, category20b: 20, category20c: 20, observable10: 10, dark2: 8, paired: 12,
    pastel1: 9, pastel2: 8, set1: 9, set2: 8, set3: 12, tableau10: 10, tableau20: 20,
  };
  const names = Object.keys(sizes);
  type Scales = NonNullable<Spec['scales']>;
  type Marks = NonNullable<Spec['marks']>;
  const cells = names.flatMap((s) => Array.from({ length: sizes[s] ?? 0 }, (_, i) => ({ s, i })));
  // One ordinal scale per scheme: each category (0, 1, 2, ...) gets the scheme's next colour.
  const schemes: Scales = names.map((n) => ({
    name: n, type: 'ordinal', domain: Array.from({ length: sizes[n] ?? 0 }, (_, i) => i), range: { scheme: n },
  }));
  const rows: Marks = names.map((n) => ({
    type: 'rect', from: { data: 'cells' },
    encode: { update: {
      x: { scale: 'x', field: 'i' }, width: { scale: 'x', band: 1 },
      y: { scale: 'row', value: n }, height: { scale: 'row', band: 1 },
      fill: { scale: n, field: 'i' }, opacity: { signal: `focus === '${n}' ? 1 : 0.5` },
    } },
  }));

  const spec: Spec = {
    width: 420, height: 260, padding: 5,
    signals: [{ name: 'focus', value: 'accent', bind: { input: 'select', options: names } }],
    data: [{ name: 'cells', values: cells }],
    scales: [
      { name: 'x', type: 'band', domain: Array.from({ length: 20 }, (_, i) => i), range: 'width', paddingInner: 0.08 },
      { name: 'row', type: 'band', domain: names, range: 'height', paddingInner: 0.15 },
      ...schemes,
    ],
    axes: [{ orient: 'left', scale: 'row', ticks: false, domain: false, labelFontSize: 9 }],
    marks: rows,
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, names.map((focus) => ({ focus })), 700);
  return () => stage.dispose();
};

export default mount;
