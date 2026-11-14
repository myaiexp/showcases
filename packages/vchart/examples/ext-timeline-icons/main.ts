// Timeline icons: iconField picks a built-in symbol per event; offsets move icon and title off the dot
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { slider, type ISpec } from '../../shared/chart.ts';
import { EVENTS } from '../../shared/ext-timeline.ts';

const mount: Mount = (el, ctx) =>
  mountLive<{ icon: number; title: number }>(el, ctx, {
    initial: { icon: 6, title: 6 },
    build: (s, p) =>
      ({
        type: 'timeline',
        animation: false,
        direction: 'horizontal',
        data: [{ id: 'events', values: p ? EVENTS.slice(0, 3) : EVENTS }],
        timeField: 'year',
        eventField: 'event',
        subTitleField: p ? undefined : 'detail',
        // Each event row carries a built-in symbol name in its `icon` field.
        iconField: 'icon',
        labelPosition: 'top',
        dot: { style: { size: p ? 8 : 12, stroke: '#0c0d11', lineWidth: 2 } },
        icon: { visible: true, offset: s.icon, style: { size: p ? 12 : 20 } },
        title: { offset: s.title, style: { fontSize: p ? 10 : 14, fontWeight: 'bold', fill: '#e6e8ee' } },
        subTitle: { style: { fontSize: 12, fill: '#9aa1b0' } },
        line: { style: { stroke: '#4a5060', lineWidth: 2 } },
        arrow: { visible: true, thickness: 14, style: { fill: '#3b82a0' } },
        padding: p ? 8 : 24,
      }) as unknown as ISpec,
    controls(bar, live) {
      slider(bar, 'icon.offset', [-10, 30, 2], 6, (v) => live.set({ icon: v }));
      slider(bar, 'title.offset', [-10, 30, 2], 6, (v) => live.set({ title: v }));
    },
    step: (_, i) => ({ icon: [0, 12, 24][i % 3] as number, title: [0, 8, 16][i % 3] as number }),
    previewMs: 1500,
    mode: 'rebuild',
    chart: { height: 340 },
  });

export default mount;
