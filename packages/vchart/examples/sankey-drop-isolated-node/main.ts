// Sankey dropIsolatedNode: nodes without any link
import type { Mount } from '@/types.ts';
import { button } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat, sankeyBase } from '../../shared/flow-data.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ drop: boolean }>(el, ctx, {
    initial: { drop: false },
    build: ({ drop }, preview) =>
      asSpec({
        ...sankeyBase(preview),
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
