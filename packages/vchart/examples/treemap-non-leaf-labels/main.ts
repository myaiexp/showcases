// Treemap nonLeafLabel: titles for parent rectangles, with reserved space
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, treemapBase } from '../../shared/hierarchy-data.ts';

const POSITIONS = ['top', 'bottom', 'left', 'right'] as const;
type Pos = (typeof POSITIONS)[number];

const mount: Mount = (el, ctx) =>
  mountLive<{ position: Pos }>(el, ctx, {
    initial: { position: 'top' },
    mode: 'rebuild',
    build: ({ position }, preview) =>
      asSpec({
        ...treemapBase(preview),
        nonLeaf: { visible: true },
        nonLeafLabel: {
          visible: true,
          position,
          // Reserved space; ignored for nodes without enough room.
          padding: preview ? 16 : 30,
          style: {
            // Left-align the label inside the reserved strip (labelRect is the strip's box).
            x: (d: { labelRect?: { x0: number } }) => (d.labelRect?.x0 ?? 0) + 4,
            textAlign: 'left',
            fontSize: preview ? 9 : 12,
            fill: '#fff',
            // A string array draws multi-line text.
            text: (d: { name: string; value: number }) => [d.name, String(d.value)],
          },
        },
        title: { visible: !preview, text: `nonLeafLabel.position: '${position}'` },
      }),
    controls: (bar, live) => {
      select(bar, 'position', POSITIONS, (v) => live.set({ position: v as Pos }));
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] as Pos }),
    previewMs: 2200,
  });

export default mount;
