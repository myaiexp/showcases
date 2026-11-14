// Spec background as an image configuration: backgroundMode, backgroundPosition, backgroundScale
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select, slider } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { dotTile, wideImage } from '../../shared/opt-images.ts';

const MODES = ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'no-repeat-cover', 'no-repeat-contain', 'no-repeat-fill', 'no-repeat-auto'];
const POSITIONS = ['center', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
const tile = dotTile('#4d7cff').toDataURL();
const wide = wideImage().toDataURL();

interface S {
  mode: string;
  position: string;
  scale: number;
}

const mount: Mount = (el, ctx) =>
  mountLive<S>(el, ctx, {
    initial: { mode: 'repeat', position: 'center', scale: 1 },
    mode: 'rebuild',
    previewMs: 1800,
    step: (_s, i) => ({ mode: MODES[i % MODES.length] ?? 'repeat', position: POSITIONS[i % POSITIONS.length] ?? 'center' }),
    build: ({ mode, position, scale }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: groupedRows(['Q1', 'Q2', 'Q3', 'Q4'], ['North', 'South'], 5) }],
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        background: {
          image: mode.startsWith('repeat') ? tile : wide,
          backgroundMode: mode,
          backgroundPosition: position,
          backgroundScale: scale,
          backgroundOpacity: 0.5,
        },
        legends: { visible: !preview },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'backgroundMode', MODES, (v) => live.set({ mode: v }));
      select(bar, 'backgroundPosition', POSITIONS, (v) => live.set({ position: v }));
      slider(bar, 'backgroundScale', [0.3, 2, 0.05], 1, (v) => live.set({ scale: v }));
    },
  });

export default mount;
