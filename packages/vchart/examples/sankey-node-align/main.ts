// Sankey nodeAlign: how node depth maps to a column
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

const ALIGNS = ['left', 'right', 'center', 'justify', 'start', 'end'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ align: string }>(el, ctx, {
    initial: { align: 'justify' },
    build: ({ align }, preview) =>
      asSpec({
        type: 'sankey',
        data: [{ id: 'data', values: budgetFlat() }],
        categoryField: 'nodeName',
        valueField: 'value',
        sourceField: 'source',
        targetField: 'target',
        nodeKey: 'nodeName',
        nodeGap: preview ? 6 : 10,
        nodeWidth: 12,
        minNodeHeight: 4,
        link: { style: { fillOpacity: 0.5 } },
        label: { visible: true, style: { fontSize: preview ? 8 : 11 } },
        nodeAlign: align,
        title: { visible: true, text: `nodeAlign: '${align}'`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      const sel = select(bar, 'nodeAlign', ALIGNS, (v) => live.set({ align: v }));
      sel.value = 'justify';
    },
    step: (_s, i) => ({ align: ALIGNS[i % ALIGNS.length] as string }),
    previewMs: 1800,
  });

export default mount;
