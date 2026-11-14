// bar label.position as a function of the datum, versus one fixed position for all
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const ROWS = [
  { x: 'Mon', y: 32 }, { x: 'Tue', y: 58 }, { x: 'Wed', y: -14 }, { x: 'Thu', y: 76 }, { x: 'Fri', y: 41 }, { x: 'Sat', y: -26 }, { x: 'Sun', y: 18 },
];
const MODES = ['callback', 'outside', 'inside-top', 'top-right', 'bottom-left'];

const mount: Mount = (el, ctx) =>
  mountLive<{ mode: string }>(el, ctx, {
    initial: { mode: 'callback' },
    previewMs: 1500,
    step: (s) => ({ mode: MODES[(MODES.indexOf(s.mode) + 1) % MODES.length] as string }),
    build: (s) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: ROWS }],
        xField: 'x',
        yField: 'y',
        label: {
          visible: true,
          // The function sees the datum behind each label (bar.md § label.position).
          position: s.mode === 'callback' ? (d: { y: number }) => (d.y < 0 ? 'bottom' : d.y > 70 ? 'inside-top' : 'top') : s.mode,
          style: { fontSize: 12 },
        },
        axes: [{ orient: 'left', type: 'linear' }, { orient: 'bottom', type: 'band' }],
      }) as never,
    controls: (bar, live) => {
      select(bar, 'label.position', MODES, (v) => live.set({ mode: v }));
    },
  });

export default mount;
