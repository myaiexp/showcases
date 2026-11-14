// Sankey dropIsolatedNode: nodes without any link
import type { Mount } from '@/types.ts';
import { button } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ drop: boolean }>(el, ctx, {
    initial: { drop: false },
    build: ({ drop }, preview) =>
      asSpec({
        type: 'sankey',
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
        // Two nodes with no links at all.
        data: [{ id: 'data', values: budgetFlat(4, ['Lottery', 'Gifts']) }],
        dropIsolatedNode: drop,
        title: { visible: true, text: `dropIsolatedNode: ${drop}`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      button(bar, 'toggle dropIsolatedNode', () => live.set({ drop: !live.state.drop }));
    },
    step: (s) => ({ drop: !s.drop }),
    previewMs: 1800,
  });

export default mount;
