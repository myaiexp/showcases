// Sankey crossNodeAlign: alignment of nodes across the flow direction
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sankeyBase } from '../../shared/flow-data.ts';

const ALIGNS = ['start', 'middle', 'end', 'parent'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ align: string }>(el, ctx, {
    initial: { align: 'start' },
    mode: 'rebuild',
    build: ({ align }, preview) =>
      asSpec({
        ...sankeyBase(preview),
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
