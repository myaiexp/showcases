// Treemap splitType: five ways to divide a rectangle among its children
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, moduleTree, pathOf } from '../../shared/hierarchy-data.ts';

const TYPES = ['binary', 'dice', 'slice', 'sliceDice', 'squarify'] as const;
type SplitType = (typeof TYPES)[number];

const mount: Mount = (el, ctx) =>
  mountLive<{ splitType: SplitType }>(el, ctx, {
    initial: { splitType: 'binary' },
    build: ({ splitType }, preview) =>
      asSpec({
        type: 'treemap',
        data: [{ id: 'data', values: moduleTree() }],
        categoryField: 'name',
        valueField: 'value',
        tooltip: { mark: { title: { value: pathOf } } },
        splitType,
        label: { visible: !preview, style: { fontSize: 11 } },
        title: { visible: true, text: `splitType: '${splitType}'`, textStyle: { fontSize: preview ? 12 : 16 } },
      }),
    controls: (bar, live) => {
      select(bar, 'splitType', TYPES, (v) => live.set({ splitType: v as SplitType }));
    },
    step: (_s, i) => ({ splitType: TYPES[i % TYPES.length] as SplitType }),
    previewMs: 2000,
  });

export default mount;
