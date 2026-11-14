// animationAppear.preset on line and area series: clipIn, fadeIn and grow
import type { Mount } from '@/types.ts';
import { mountReplay } from '../../shared/anim-data.ts';
import { walk } from '../../shared/components-data.ts';
import { select } from '../../shared/chart.ts';

const PRESETS = ['clipIn', 'fadeIn', 'grow'] as const;
type Preset = (typeof PRESETS)[number];

const mount: Mount = (el, ctx) =>
  mountReplay<{ preset: Preset }>(el, ctx, {
    initial: { preset: 'clipIn' },
    period: 3200,
    build: ({ preset }, preview) => ({
      type: 'common',
      title: { visible: true, text: `preset: ${preset}`, textStyle: { fontSize: preview ? 12 : 16 } },
      series: [
        {
          type: 'area',
          data: { id: 'area', values: walk(14, 4, 'Area') },
          xField: 'x',
          yField: 'y',
          animationAppear: { preset, duration: 1500 },
        },
        {
          type: 'line',
          data: { id: 'line', values: walk(14, 8, 'Line') },
          xField: 'x',
          yField: 'y',
          seriesField: 'c',
          stack: false,
          animationAppear: { preset, duration: 1500 },
        },
      ],
      axes: [
        { orient: 'left', type: 'linear' },
        { orient: 'bottom', type: 'band', label: { visible: !preview } },
      ],
      legends: { visible: false },
    }),
    step: (_s, i) => ({ preset: PRESETS[i % 3] ?? 'clipIn' }),
    controls: (bar, set) => {
      select(bar, 'preset', PRESETS, (v) => set({ preset: v as Preset }));
    },
  });

export default mount;
