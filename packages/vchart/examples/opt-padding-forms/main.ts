// Chart padding in the forms the option reference lists
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const FORMS: Record<string, unknown> = {
  'padding: 12': 12,
  'padding: 48': 48,
  'object: { top, right, bottom, left }': { top: 10, right: 10, bottom: 10, left: 90 },
  "percentages: { left: '20%', right: '5%' }": { top: 16, bottom: 16, left: '20%', right: '5%' },
  'callbacks: ({ height }) => height * 0.2': { top: ({ height }: { height: number }) => height * 0.2, bottom: 10, left: 10, right: 10 },
};
const NAMES = Object.keys(FORMS);

const mount: Mount = (el, ctx) =>
  mountLive<{ form: string }>(el, ctx, {
    initial: { form: NAMES[1] ?? '' },
    mode: 'rebuild',
    previewMs: 1500,
    step: (_s, i) => ({ form: NAMES[i % NAMES.length] ?? '' }),
    build: ({ form }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], ['North', 'South'], 9) }],
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        background: '#1d2a52',
        padding: FORMS[form],
        legends: { visible: false },
        title: preview ? undefined : { visible: true, text: form, orient: 'bottom', textStyle: { fontSize: 12 } },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'padding', NAMES, (v) => live.set({ form: v })).value = NAMES[1] ?? '';
    },
  });

export default mount;
