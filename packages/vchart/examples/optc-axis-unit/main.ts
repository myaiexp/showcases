// Axis unit: a short text at the end of an axis, set through axes.unit
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { QUARTERS, REGIONS, grouped, seeded } from '../../shared/cartesian-data.ts';

const UNITS = ['USD k', 'EUR k', 'units', 'kg'];

const mount: Mount = (el, ctx) =>
  mountLive(el, ctx, {
    initial: { unit: 'USD k', visible: true },
    previewMs: 1300,
    step: (s, i) => ({ unit: UNITS[i % UNITS.length] as string, visible: s.visible }),
    build: (s) => ({
      type: 'bar',
      data: [{ id: 'd', values: grouped(seeded(4), QUARTERS.slice(0, 4), REGIONS.slice(0, 2), 20, 90) }],
      xField: ['cat', 'group'],
      yField: 'value',
      seriesField: 'group',
      axes: [
        {
          orient: 'left',
          unit: { visible: s.visible, text: s.unit, style: { fill: '#fbbf24', fontSize: 13, fontWeight: 'bold' } },
        },
        { orient: 'bottom', unit: { visible: s.visible, text: 'quarter', style: { fill: '#7dd3fc', fontSize: 12 } } },
      ],
    }),
    controls: (bar, live) => {
      select(bar, 'unit text', UNITS, (v) => live.set({ unit: v }));
      select(bar, 'visible', ['true', 'false'], (v) => live.set({ visible: v === 'true' }));
    },
  });

export default mount;
