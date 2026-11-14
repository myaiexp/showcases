// Pie label position: outside with guide lines, or inside the sector at four radial anchors
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

type Position = 'outside' | 'inside' | 'inside-outer' | 'inside-inner' | 'inside-center';
const POSITIONS: Position[] = ['outside', 'inside', 'inside-outer', 'inside-inner', 'inside-center'];

interface State {
  position: Position;
  rotate: boolean;
  offset: number;
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { position: 'outside', rotate: true, offset: 0 },
    build: ({ position, rotate, offset }, preview) => ({
      type: 'pie',
      data: [{ id: 'elements', values: ELEMENTS }],
      categoryField: 'type',
      valueField: 'value',
      innerRadius: 0.3,
      outerRadius: 0.7,
      legends: { visible: false },
      label: { visible: true, position, rotate, offsetRadius: offset, style: { fontSize: preview ? 11 : 13 } },
    }),
    controls: (bar, live) => {
      select(bar, 'position', POSITIONS, (v) => live.set({ position: v as Position }));
      select(bar, 'rotate', ['true', 'false'], (v) => live.set({ rotate: v === 'true' }));
      // offsetRadius is relative to the outer radius for 'inside-outer' and the inner radius for 'inside-inner'.
      slider(bar, 'offsetRadius', [-20, 20, 1], 0, (offset) => live.set({ offset }));
    },
    step: (_s, i) => ({ position: POSITIONS[i % POSITIONS.length] as Position }),
    previewMs: 1800,
  });

export default mount;
