// Grouped bars: xField as an array of category and group, seriesField for the column color
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { grouped, REGIONS, seeded } from '../../shared/cartesian-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const all = grouped(seeded(5), ['Q1', 'Q2', 'Q3', 'Q4'], REGIONS);

const mount: Mount = (el, ctx) =>
  mountLive<{ groups: number }>(el, ctx, {
    initial: { groups: 3 },
    mode: 'rebuild',
    build: ({ groups }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'sales', values: all.filter((d) => REGIONS.indexOf(String(d.group)) < groups) }],
        // The second xField entry is the group; the columns of one category sit side by side.
        xField: ['cat', 'group'],
        yField: 'value',
        seriesField: 'group',
        legends: { visible: !preview, orient: 'top' },
      }) as ISpec,
    controls: (bar, live) => {
      select(bar, 'groups', ['1', '2', '3', '4'], (v) => live.set({ groups: Number(v) })).value = '3';
    },
    step: (_s, i) => ({ groups: 2 + (i % 3) }),
  });

export default mount;
