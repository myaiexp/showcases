// Mosaic bandWidthField: column width from a field other than the stacked value
import type { Mount } from '@/types.ts';
import { registerMosaicChart } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { asSpec, mosaicRows } from '../../shared/flow-data.ts';

// Each row also carries a headcount, so width can follow staff instead of sales.
const rows = mosaicRows().map((d, i) => ({ ...d, staff: [3, 9, 4, 12, 5, 2, 8, 8, 3, 6, 11, 5][i] as number }));
const FIELDS = ['(none: share of sales)', 'staff'] as const;

// The mosaic chart is not in the default registration: register it once before creating a chart.
registerMosaicChart();

const mount: Mount = (el, ctx) =>
  mountLive<{ field: string }>(el, ctx, {
    initial: { field: FIELDS[0] },
    mode: 'rebuild',
    build: ({ field }, preview) =>
      asSpec({
        type: 'mosaic',
        data: [{ id: 'data', values: rows }],
        xField: 'region',
        yField: 'sales',
        seriesField: 'segment',
        percent: true,
        ...(field === 'staff' ? { bandWidthField: 'staff' } : {}),
        label: [{ visible: true, position: 'center', smartInvert: true, style: { fontSize: preview ? 9 : 12 } }],
        legends: { visible: !preview },
        title: { visible: true, text: field === 'staff' ? "bandWidthField: 'staff'" : 'bandWidthField not set', textStyle: { fontSize: preview ? 11 : 15 } },
      }),
    controls: (bar, live) => {
      select(bar, 'column width from', FIELDS, (v) => live.set({ field: v }));
    },
    step: (_s, i) => ({ field: FIELDS[i % FIELDS.length] as string }),
    previewMs: 2200,
  });

export default mount;
