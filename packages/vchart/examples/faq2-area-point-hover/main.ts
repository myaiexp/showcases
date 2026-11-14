// FAQ: area points drawn at zero opacity still take hover; the hover state makes them visible
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const TIMES = ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00'];

const mount: Mount = (el, ctx) => {
  const rand = seeded(7);
  const rows = (): { time: string; value: number }[] =>
    TIMES.map((time) => ({ time, value: Math.round(8 + rand() * 20) }));
  const out = ctx.preview ? null : readout(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'area',
    data: [{ id: 'area', values: rows() }],
    xField: 'time',
    yField: 'value',
    // visible: false would remove the points from hit testing. Opacity 0 keeps them hoverable.
    point: {
      visible: true,
      style: { size: 14, fill: '#ffd666', stroke: '#ffffff', lineWidth: 2, fillOpacity: 0, strokeOpacity: 0 },
      state: { hover: { fillOpacity: 1, strokeOpacity: 1 } },
    },
  });
  if (out) {
    out.textContent = 'Hover the chart: a point appears only under the pointer.';
    vchart.on('pointerover', { markName: 'point' }, (e) => {
      const d = e.datum as { time?: string; value?: number } | undefined;
      out.textContent = `point hovered: ${d?.time} = ${d?.value}`;
    });
  }
  // Card: no pointer, so the hover state is set from code, one point after another.
  let i = 0;
  let alive = true;
  const stop = every(900, () => {
    if (!alive) return;
    if (i % 12 === 11) void vchart.updateData('area', rows());
    else vchart.setHovered({ time: TIMES[i % TIMES.length] });
    i++;
  });
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
