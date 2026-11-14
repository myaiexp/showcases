// Timeline grouping: seriesField draws one timeline per track on a shared time scale
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, type ISpec } from '../../shared/chart.ts';
import { EVENTS, TEAM } from '../../shared/ext-timeline.ts';

const POSITIONS = ['top', 'bottom', 'top-bottom'];
// Two tracks (Product, Team) interleaved by year.
const ALL = [...EVENTS, ...TEAM].sort((a, b) => a.year - b.year);

const mount: Mount = (el, ctx) =>
  mountLive<{ pos: string }>(el, ctx, {
    initial: { pos: 'top' },
    build: (s, p) =>
      ({
        type: 'timeline',
        animation: false,
        direction: 'horizontal',
        data: [{ id: 'events', values: p ? ALL.slice(0, 3) : ALL }],
        timeField: 'year',
        eventField: 'event',
        subTitleField: p ? undefined : 'detail',
        // One timeline per distinct `track` value.
        seriesField: 'track',
        labelPosition: s.pos,
        dot: { style: { size: p ? 8 : 12, stroke: '#0c0d11', lineWidth: 2 } },
        title: { style: { fontSize: p ? 10 : 14, fontWeight: 'bold', fill: '#e6e8ee' } },
        subTitle: { style: { fontSize: 12, fill: '#9aa1b0' } },
        line: { style: { stroke: '#4a5060', lineWidth: 2 } },
        arrow: { visible: true, thickness: 14, style: { fill: '#3b82a0' } },
        padding: p ? 8 : 24,
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'labelPosition', POSITIONS, (v) => live.set({ pos: v }));
    },
    step: (_, i) => ({ pos: POSITIONS[i % 3] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 400 },
  });

export default mount;
