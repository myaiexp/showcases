// containerAlign: where the label block sits inside the axis container
import type { Mount } from '@/types.ts';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';

const ITEMS = ['Alpha', 'Beta', 'Gamma', 'Delta'];
const ALIGNS = ['left', 'center', 'right'];

const mount: Mount = (el, ctx) =>
  mountLive<{ align: string }>(el, ctx, {
    initial: { align: 'left' },
    previewMs: 1300,
    step: (_s, i) => ({ align: ALIGNS[i % ALIGNS.length] as string }),
    build: (s) => ({
      type: 'bar',
      direction: 'horizontal',
      data: [{ id: 'd', values: ITEMS.map((name, i) => ({ name: i % 2 ? name : `${name} / long label`, value: 30 + i * 18 })) }],
      xField: 'value',
      yField: 'name',
      axes: [
        { orient: 'left', type: 'band', label: { containerAlign: s.align, style: { fill: '#fbbf24' } }, domainLine: { visible: true } },
        { orient: 'bottom', type: 'linear' },
      ],
    }),
    controls: (bar, live) => {
      select(bar, 'containerAlign', ALIGNS, (v) => live.set({ align: v }));
    },
  });

export default mount;
