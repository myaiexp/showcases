// Pie hover and selected states: pie.state.hover.centerOffset pushes a sector out, driven here by setHovered and setSelected
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { ELEMENTS } from '../../shared/polar-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'elements', values: ELEMENTS }],
    categoryField: 'type',
    valueField: 'value',
    outerRadius: 0.7,
    legends: { visible: false },
    label: { visible: !ctx.preview },
    pie: {
      state: {
        hover: { centerOffset: 14, stroke: '#fff', lineWidth: 2 },
        selected: { centerOffset: 24, stroke: '#ffd166', lineWidth: 3 },
      },
    },
  });

  let i = 0;
  const hoverNext = (): void => {
    const d = ELEMENTS[i++ % ELEMENTS.length];
    if (d) vchart.setHovered({ type: d.type });
  };
  hoverNext();
  // The preview has no pointer, so setHovered walks the sectors and every third step also selects one.
  let stop = (): void => {};
  let out: HTMLPreElement | null = null;
  if (ctx.preview) {
    stop = every(1100, () => {
      hoverNext();
      if (i % 3 === 0) vchart.setSelected({ type: ELEMENTS[(i + 3) % ELEMENTS.length]?.type });
    });
  } else if (bar) {
    out = readout(el);
    out.textContent = 'Hover a sector, or use the buttons. Click selects one.';
    button(bar, 'hover next (setHovered)', () => {
      hoverNext();
      if (out) out.textContent = `setHovered({ type: '${ELEMENTS[(i - 1) % ELEMENTS.length]?.type}' })`;
    });
    button(bar, 'select next (setSelected)', () => {
      const t = ELEMENTS[i++ % ELEMENTS.length]?.type;
      vchart.setSelected({ type: t });
      if (out) out.textContent = `setSelected({ type: '${t}' })`;
    });
    button(bar, 'clear (setSelected(null))', () => {
      vchart.setHovered(null);
      vchart.setSelected(null);
      if (out) out.textContent = 'setHovered(null) and setSelected(null)';
    });
  }
  return () => {
    stop();
    release();
  };
};

export default mount;
