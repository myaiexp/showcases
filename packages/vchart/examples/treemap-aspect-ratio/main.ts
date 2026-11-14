// Treemap aspectRatio: the target tile shape for the squarify split
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, moduleTree, pathOf } from '../../shared/hierarchy-data.ts';

const RATIOS = [0.5, 1, 1.618, 3, 6];

const mount: Mount = (el, ctx) =>
  mountLive<{ aspectRatio: number }>(el, ctx, {
    initial: { aspectRatio: 1 },
    build: ({ aspectRatio }, preview) =>
      asSpec({
        type: 'treemap',
        data: [{ id: 'data', values: moduleTree() }],
        categoryField: 'name',
        valueField: 'value',
        label: { visible: true, style: { fontSize: preview ? 9 : 11 } },
        tooltip: { mark: { title: { value: pathOf } } },
        splitType: 'squarify',
        aspectRatio,
        title: { visible: true, text: `aspectRatio: ${aspectRatio}`, textStyle: { fontSize: preview ? 12 : 16 } },
      }),
    controls: (bar, live) => {
      slider(bar, 'aspectRatio', [0.3, 8, 0.1], 1, (v) => live.set({ aspectRatio: v }));
    },
    step: (_s, i) => ({ aspectRatio: RATIOS[i % RATIOS.length] as number }),
    previewMs: 1800,
  });

export default mount;
