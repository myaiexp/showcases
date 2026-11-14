// The timeline chart, horizontal: label position and arrow thickness as live settings
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { select, slider, type ISpec } from '../../shared/chart.ts';
import { EVENTS } from '../../shared/ext-timeline.ts';

const POSITIONS = ['top-bottom', 'bottom-top', 'top', 'bottom'];

const mount: Mount = (el, ctx) =>
  mountLive<{ pos: string; thickness: number }>(el, ctx, {
    initial: { pos: 'top-bottom', thickness: 14 },
    build: (s, p) =>
      ({
        type: 'timeline',
        animation: false,
        direction: 'horizontal',
        data: [{ id: 'events', values: p ? EVENTS.slice(0, 3) : EVENTS }],
        timeField: 'year',
        eventField: 'event',
        subTitleField: p ? undefined : 'detail',
        labelPosition: s.pos,
        dot: { style: { size: p ? 8 : 12, stroke: '#0c0d11', lineWidth: 2 } },
        title: { style: { fontSize: p ? 10 : 14, fontWeight: 'bold', fill: '#e6e8ee' } },
        subTitle: { style: { fontSize: 12, fill: '#9aa1b0' } },
        line: { style: { stroke: '#4a5060', lineWidth: 2 } },
        arrow: { visible: true, thickness: s.thickness, style: { fill: '#3b82a0' } },
        padding: p ? 8 : 24,
      }) as unknown as ISpec,
    controls(bar, live) {
      select(bar, 'labelPosition', POSITIONS, (v) => live.set({ pos: v }));
      slider(bar, 'arrow.thickness', [4, 30, 2], 14, (v) => live.set({ thickness: v }));
    },
    step: (_, i) => ({ pos: POSITIONS[i % POSITIONS.length] as string }),
    previewMs: 1800,
    mode: 'rebuild',
    chart: { height: 340 },
  });

export default mount;
