// Sankey label.position: where node names sit relative to their node
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, sankeyBase } from '../../shared/flow-data.ts';

const POSITIONS = ['outside', 'inside-start', 'inside-middle', 'inside-end', 'left', 'right'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string }>(el, ctx, {
    initial: { position: 'outside' },
    build: ({ position }, preview) => {
      const base = sankeyBase(preview) as { label: object };
      return asSpec({
        ...base,
        nodeWidth: 40,
        label: { ...base.label, position },
        title: { visible: true, text: `label.position: '${position}'`, textStyle: { fontSize: preview ? 11 : 15 } },
      });
    },
    controls: (bar, live) => {
      select(bar, 'position', POSITIONS, (v) => live.set({ position: v }));
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] as string }),
    previewMs: 1800,
  });

export default mount;
