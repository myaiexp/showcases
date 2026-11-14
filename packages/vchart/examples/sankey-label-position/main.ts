// Sankey label.position: where node names sit relative to their node
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, budgetFlat } from '../../shared/flow-data.ts';

const POSITIONS = ['outside', 'inside-start', 'inside-middle', 'inside-end', 'left', 'right'] as const;

const mount: Mount = (el, ctx) =>
  mountLive<{ position: string }>(el, ctx, {
    initial: { position: 'outside' },
    build: ({ position }, preview) =>
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
        nodeWidth: 40,
        minNodeHeight: 4,
        link: { style: { fillOpacity: 0.5 } },
        label: { visible: true, position, style: { fontSize: preview ? 8 : 11 } },
        title: { visible: true, text: `label.position: '${position}'`, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      select(bar, 'position', POSITIONS, (v) => live.set({ position: v }));
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] as string }),
    previewMs: 1800,
  });

export default mount;
