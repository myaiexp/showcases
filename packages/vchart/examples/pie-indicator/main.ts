// Donut indicator: the card in the hole shows the total, then the hovered sector
import type { Mount } from '@/types.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

interface State {
  current: number; // -1 shows the total; the preview walks through the sectors
}

const mount: Mount = (el, ctx) =>
  mountLive<State>(el, ctx, {
    initial: { current: -1 },
    build: ({ current }, preview) => {
      // In a card there is no pointer, so the title and content are written for the current sector by
      // hand and the other sectors fade. The full view gives text functions of the hovered datum.
      const d = ELEMENTS[current];
      return {
        type: 'pie',
        data: [{ id: 'elements', values: ELEMENTS }],
        categoryField: 'type',
        valueField: 'value',
        innerRadius: 0.62,
        outerRadius: 0.85,
        padAngle: 0.6,
        legends: { visible: !preview, orient: 'left' },
        pie: { style: { fillOpacity: (datum) => (!preview || !d || datum['type'] === d.type ? 1 : 0.3) } },
        indicator: {
          visible: true,
          trigger: 'hover',
          limitRatio: 0.5,
          title: {
            visible: true,
            autoFit: true,
            style: {
              fill: '#ddd',
              fontWeight: 'bolder',
              text: preview ? (d ? d.type : 'Total') : (datum: Record<string, unknown> | undefined) => (datum ? String(datum['type']) : 'Total'),
            },
          },
          content: [
            {
              visible: true,
              style: {
                fill: '#ffb84c',
                fontSize: 22,
                text: preview ? (d ? `${d.value}%` : '100%') : (datum: Record<string, unknown> | undefined) => (datum ? `${datum['value']}%` : '100%'),
              },
            },
          ],
        },
      };
    },
    step: (s) => ({ current: s.current + 1 >= ELEMENTS.length ? -1 : s.current + 1 }),
    previewMs: 1300,
  });

export default mount;
