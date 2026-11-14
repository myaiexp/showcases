// theme.series.line: defaults for every line series
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

type Preset = 'default' | 'smooth, no points' | 'thick, dashed';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const lines = ['a', 'b'].flatMap((g, j) => days.map((x, i) => ({ x, g, v: 20 + ((i * (7 + j * 5)) % 30) + j * 12 })));

const SERIES: Record<Preset, unknown> = {
  default: {},
  'smooth, no points': { line: { line: { style: { curveType: 'monotone', lineWidth: 3 } }, point: { visible: false } } },
  'thick, dashed': { line: { line: { style: { lineWidth: 6, lineDash: [10, 6] } }, point: { style: { size: 12 } } } },
};
const PRESETS = Object.keys(SERIES) as Preset[];

const mount: Mount = (el, ctx) =>
  mountLive<{ preset: Preset }>(el, ctx, {
    initial: { preset: 'default' },
    build: ({ preset }) =>
      ({
        type: 'line',
        data: [{ id: 'lines', values: lines }],
        xField: 'x',
        yField: 'v',
        seriesField: 'g',
        theme: { series: SERIES[preset] },
        legends: { visible: !ctx.preview },
      }) as never,
    controls(bar, live) {
      select(bar, 'theme.series.line', PRESETS, (preset) => live.set({ preset: preset as Preset }));
    },
    step: (_, i) => ({ preset: PRESETS[i % PRESETS.length] ?? 'default' }),
    mode: 'rebuild',
  });

export default mount;
