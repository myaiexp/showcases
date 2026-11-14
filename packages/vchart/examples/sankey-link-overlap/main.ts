// Sankey linkOverlap: links of a node laid over each other
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sankeyBase } from '../../shared/flow-data.ts';

const MODES = ['off', 'start', 'center', 'end'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ overlap: string }>(el, ctx, {
    initial: { overlap: 'off' },
    mode: 'rebuild',
    build: ({ overlap }, preview) =>
      asSpec({
        ...sankeyBase(preview),
        // Leaving the key out gives the default layout; a rebuild drops it cleanly.
        ...(overlap === 'off' ? {} : { linkOverlap: overlap }),
        link: { style: { fillOpacity: 0.35 } },
        title: { visible: true, text: overlap === 'off' ? 'linkOverlap not set' : `linkOverlap: '${overlap}'`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      select(bar, 'linkOverlap', MODES, (v) => live.set({ overlap: v }));
    },
    step: (_s, i) => ({ overlap: MODES[i % MODES.length] as string }),
    previewMs: 1800,
  });

export default mount;
