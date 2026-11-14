// Chart-level theme: background, padding and fontFamily
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { grouped } from '../../shared/theme-data.ts';

interface State {
  background: string;
  padding: number;
  font: string;
}

const GRADIENT = {
  type: 'linear',
  x0: 0,
  y0: 0,
  x1: 1,
  y1: 1,
  stops: [
    { offset: 0, color: '#1857A3' },
    { offset: 1, color: '#7568D9' },
  ],
};
const BACKGROUNDS: Record<string, unknown> = { transparent: 'transparent', solid: '#2A3142', gradient: GRADIENT };
const FONTS = ['sans-serif', 'Times New Roman', 'Courier New'];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { background: 'gradient', padding: 24, font: 'Times New Roman' },
    build: (s) =>
      ({
        type: 'bar',
        data: [{ id: 'days', values: grouped() }],
        xField: 'type',
        yField: 'value',
        seriesField: 'group',
        legends: { visible: !ctx.preview },
        // ITheme.background, ITheme.padding and ITheme.fontFamily, passed as the spec's theme.
        theme: { background: BACKGROUNDS[s.background], padding: s.padding, fontFamily: s.font },
      }) as never,
    controls(bar, live) {
      select(bar, 'background', Object.keys(BACKGROUNDS), (background) => live.set({ background }));
      slider(bar, 'padding', [0, 60, 4], live.state.padding, (padding) => live.set({ padding }));
      select(bar, 'fontFamily', FONTS, (font) => live.set({ font }));
    },
    step: (_, i) => ({ background: ['gradient', 'solid', 'transparent'][i % 3] ?? 'solid', padding: [24, 8, 40][i % 3] ?? 24 }),
    mode: 'rebuild',
  });

export default mount;
