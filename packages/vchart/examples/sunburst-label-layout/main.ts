// Sunburst labelLayout: per-level label alignment and rotation
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, salesTree, pathOf } from '../../shared/hierarchy-data.ts';

type Layout = ({ align: string; rotate: string; offset: number } | null)[];
const LAYOUTS: Record<string, Layout> = {
  'tangential centre': [
    { align: 'center', rotate: 'tangential', offset: 0 },
    { align: 'center', rotate: 'tangential', offset: 0 },
    { align: 'center', rotate: 'tangential', offset: 0 },
  ],
  'docs mix': [{ align: 'center', rotate: 'tangential', offset: 0 }, null, { align: 'start', rotate: 'radial', offset: 15 }],
  'radial start': [
    { align: 'start', rotate: 'radial', offset: 6 },
    { align: 'start', rotate: 'radial', offset: 6 },
    { align: 'start', rotate: 'radial', offset: 6 },
  ],
  'radial end': [
    { align: 'end', rotate: 'radial', offset: 6 },
    { align: 'end', rotate: 'radial', offset: 6 },
    { align: 'end', rotate: 'radial', offset: 6 },
  ],
};
const NAMES = Object.keys(LAYOUTS);

const mount: Mount = (el, ctx) =>
  mountLive<{ name: string }>(el, ctx, {
    initial: { name: 'tangential centre' },
    mode: 'rebuild',
    build: ({ name }, preview) =>
      asSpec({
        type: 'sunburst',
        data: [{ id: 'data', values: salesTree() }],
        categoryField: 'name',
        valueField: 'value',
        sunburst: { style: { fillOpacity: (d: { isLeaf?: boolean }) => (d.isLeaf ? 0.45 : 0.85) } },
        tooltip: { mark: { title: { value: pathOf } } },
        innerRadius: [0, 0.35, 0.65],
        outerRadius: [0.35, 0.65, 0.95],
        label: { visible: true, style: { fontSize: preview ? 7 : 11 } },
        labelLayout: LAYOUTS[name],
        // Hide labels on arcs shorter than 20 px along the circumference.
        labelAutoVisible: { enable: true, circumference: 20 },
        title: { visible: true, text: name, textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      select(bar, 'labelLayout', NAMES, (v) => live.set({ name: v }));
    },
    step: (_s, i) => ({ name: NAMES[i % NAMES.length] as string }),
    previewMs: 2200,
  });

export default mount;
