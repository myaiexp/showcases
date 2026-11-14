// Band axis domain: reorder, subset or extend the categories the axis lists
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const data = DAYS.map((day, i) => ({ day, visits: [42, 58, 35, 71, 64][i] }));
const DOMAINS: Record<string, string[] | undefined> = {
  'data order': undefined,
  reversed: [...DAYS].reverse(),
  'subset Tue-Thu': ['Tue', 'Wed', 'Thu'],
  'with empty Sat': [...DAYS, 'Sat'],
};
interface State { name: string }

const build = (s: State): ISpec => {
  const domain = DOMAINS[s.name];
  return {
    type: 'bar',
    data: [{ values: data }],
    xField: 'day',
    yField: 'visits',
    label: { visible: true },
    axes: [{ orient: 'bottom', type: 'band', ...(domain ? { domain } : {}) }, { orient: 'left', max: 80 }],
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { name: 'reversed' },
    build,
    mode: 'rebuild',
    step: (s) => {
      const names = Object.keys(DOMAINS);
      return { name: names[(names.indexOf(s.name) + 1) % names.length] ?? 'data order' };
    },
    controls: (bar, live) => {
      select(bar, 'domain', Object.keys(DOMAINS), (v) => live.set({ name: v })).value = 'reversed';
    },
  });

export default mount;
