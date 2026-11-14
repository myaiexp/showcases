// Sankey crossNodeAlign: alignment of nodes across the flow direction
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

const ALIGNS = ['start', 'middle', 'end', 'parent'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ align: string }>(el, ctx, {
    initial: { align: 'start' },
    mode: 'rebuild',
    build: ({ align }, preview) =>
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
        minNodeHeight: 4,
        link: { style: { fillOpacity: 0.5 } },
        label: { visible: true, style: { fontSize: preview ? 8 : 11 } },
        crossNodeAlign: align,
        title: { visible: true, text: `crossNodeAlign: '${align}'`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      select(bar, 'crossNodeAlign', ALIGNS, (v) => live.set({ align: v }));
    },
    step: (_s, i) => ({ align: ALIGNS[i % ALIGNS.length] as string }),
    previewMs: 1800,
  });

export default mount;
