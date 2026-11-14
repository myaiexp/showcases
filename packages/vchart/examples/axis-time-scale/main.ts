// Time axis: type 'time', layers with a timeFormat and tickStep in milliseconds
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rand = seeded(23);
const DAY = 24 * 3600 * 1000;
const data = Array.from({ length: 30 }, (_, i) => ({
  day: Date.UTC(2024, 2, i + 1),
  visits: Math.round(120 + 60 * Math.sin(i / 4) + rand() * 40),
}));
const STEPS: Record<string, number | undefined> = { auto: undefined, '1 day': DAY, '7 days': 7 * DAY, '14 days': 14 * DAY };
interface State { step: string; twoLayers: boolean }

const build = (s: State): ISpec => {
  const tickStep = STEPS[s.step];
  // Each layer carries its own timeFormat and tick step; layer 0 sits next to the axis line.
  const layers = [{ timeFormat: '%b %d', ...(tickStep ? { tickStep } : {}) }];
  if (s.twoLayers) layers.push({ timeFormat: '%B %Y', tickStep: 31 * DAY });
  return {
    type: 'line',
    data: [{ values: data }],
    xField: 'day',
    yField: 'visits',
    point: { visible: false },
    axes: [{ orient: 'bottom', type: 'time', timeFormatMode: 'utc', layers }, { orient: 'left', type: 'linear' }],
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { step: '7 days', twoLayers: false },
    build,
    mode: 'rebuild',
    previewMs: 1500,
    step: (s) => {
      const names = Object.keys(STEPS);
      const next = names[(names.indexOf(s.step) + 1) % names.length] ?? 'auto';
      return { step: next, twoLayers: next === '7 days' };
    },
    controls: (bar, live) => {
      select(bar, 'tickStep', Object.keys(STEPS), (v) => live.set({ step: v })).value = '7 days';
      select(bar, 'layers', ['1', '2'], (v) => live.set({ twoLayers: v === '2' }));
    },
  });

export default mount;
