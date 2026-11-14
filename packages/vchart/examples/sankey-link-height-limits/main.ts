// Sankey min/max node and link height, and equalNodeHeight
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

type S = { min: number; mode: string };
const MODES = ['proportional', 'maxNodeHeight 40', 'equalNodeHeight'] as const;
const STEPS: S[] = [
  { min: 0, mode: 'proportional' },
  { min: 14, mode: 'proportional' },
  { min: 0, mode: 'maxNodeHeight 40' },
  { min: 0, mode: 'equalNodeHeight' },
];

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: STEPS[0] as S,
    mode: 'rebuild',
    build: ({ min, mode }, preview) =>
      asSpec({
        type: 'sankey',
        data: [{ id: 'data', values: budgetFlat() }],
        categoryField: 'nodeName',
        valueField: 'value',
        sourceField: 'source',
        targetField: 'target',
        nodeKey: 'nodeName',
        nodeAlign: 'justify',
        nodeGap: preview ? 6 : 10,
        nodeWidth: 12,
        link: { style: { fillOpacity: 0.5 } },
        label: { visible: true, style: { fontSize: preview ? 8 : 11 } },
        minNodeHeight: min,
        minLinkHeight: min / 2,
        ...(mode === 'maxNodeHeight 40' ? { maxNodeHeight: 40 } : {}),
        ...(mode === 'equalNodeHeight' ? { equalNodeHeight: true } : {}),
        title: { visible: true, text: `min ${min}px, ${mode}`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'minNodeHeight', [0, 30, 1], 0, (v) => live.set({ min: v }));
      select(bar, 'size mode', MODES, (v) => live.set({ mode: v }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as S,
    previewMs: 1800,
  });

export default mount;
