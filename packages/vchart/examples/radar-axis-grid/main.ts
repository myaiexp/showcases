// Radar axis grid: smooth radius rings, alternateColor bands and the angle axis domain line
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { monthRows } from '../../shared/polar-data.ts';

const ROWS = monthRows(['A'], undefined, 29);

interface State {
  smooth: boolean;
  bands: boolean;
  domain: boolean;
}

const STEPS: State[] = [
  { smooth: false, bands: false, domain: false },
  { smooth: true, bands: false, domain: false },
  { smooth: true, bands: true, domain: false },
  { smooth: false, bands: true, domain: true },
];

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: STEPS[0] as State,
    build: ({ smooth, bands, domain }, preview) => ({
      type: 'radar',
      data: [{ id: 'months', values: ROWS }],
      categoryField: 'month',
      valueField: 'value',
      area: { visible: true },
      axes: [
        {
          orient: 'radius',
          label: { visible: !preview },
          grid: { smooth, alternateColor: bands ? 'rgba(255,255,255,0.07)' : undefined, style: { lineDash: [0] } },
        },
        { orient: 'angle', tick: { visible: false }, domainLine: { visible: domain, style: { stroke: '#8fa2c7' } } },
      ],
    }),
    // alternateColor is removed from the spec by the 'false' option, which updateSpec would not clear.
    mode: 'rebuild',
    controls: (bar, live) => {
      select(bar, 'radius grid.smooth', ['false', 'true'], (v) => live.set({ smooth: v === 'true' }));
      select(bar, 'grid.alternateColor', ['off', 'on'], (v) => live.set({ bands: v === 'on' }));
      select(bar, 'angle domainLine', ['hidden', 'visible'], (v) => live.set({ domain: v === 'visible' }));
    },
    step: (_s, i) => STEPS[i % STEPS.length] as State,
    previewMs: 1800,
  });

export default mount;
