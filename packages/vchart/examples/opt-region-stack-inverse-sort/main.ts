// region[].stackInverse and stackSort on a stacked bar
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { groupedRows } from '../../shared/components-data.ts';
import { mountLive } from '../../shared/live-spec.ts';

const rows = groupedRows(['Q1', 'Q2', 'Q3', 'Q4', 'Q5'], ['North', 'South', 'East', 'West'], 17);

const mount: Mount = (el, ctx) =>
  mountLive<{ inverse: boolean; sort: boolean }>(el, ctx, {
    initial: { inverse: false, sort: false },
    mode: 'rebuild',
    previewMs: 1400,
    step: (_s, i) => ({ inverse: i % 4 >= 2, sort: i % 2 === 1 }),
    build: ({ inverse, sort }, preview) =>
      ({
        type: 'bar',
        data: [{ id: 'd', values: rows }],
        xField: 'x',
        yField: 'y',
        seriesField: 'c',
        stack: true,
        region: [{ stackInverse: inverse, stackSort: sort }],
        legends: { visible: !preview },
        title: preview ? undefined : { visible: true, text: `stackInverse: ${inverse}, stackSort: ${sort}`, textStyle: { fontSize: 13 } },
        tooltip: { visible: false },
      }) as unknown as ISpec,
    controls: (bar, live) => {
      select(bar, 'stackInverse', ['false', 'true'], (v) => live.set({ inverse: v === 'true' }));
      select(bar, 'stackSort', ['false', 'true'], (v) => live.set({ sort: v === 'true' }));
    },
  });

export default mount;
