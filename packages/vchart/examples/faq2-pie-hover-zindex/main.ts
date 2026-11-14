// FAQ: pie.state.hover.zIndex lifts the hovered sector so its stroke is not covered by a neighbour
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, type Chart } from '../../shared/chart.ts';

const TYPES = ['oxygen', 'silicon', 'aluminum', 'iron', 'calcium', 'sodium'];
const values = TYPES.map((type, i) => ({ type, value: [46, 28, 13, 8, 6, 4][i] }));

const mount: Mount = (el, ctx) => {
  let alive = true;
  let lift = true;
  const make = (): Chart =>
    createChart(el, ctx, {
      type: 'pie',
      data: [{ id: 'elements', values }],
      valueField: 'value',
      categoryField: 'type',
      outerRadius: 0.8,
      // Without zIndex, the stroke is covered where the next sector is drawn over it.
      pie: { state: { hover: { stroke: '#ffffff', lineWidth: 6, ...(lift ? { zIndex: 1 } : {}) } } },
      legends: { visible: false },
    } as unknown as ISpec);
  let chart = make();
  const rebuild = (): void => {
    chart.release();
    chart = make();
  };
  let i = 0;
  // Hover from code (the card has no pointer): one sector at a time, a lap with zIndex, a lap without.
  const stop = every(900, () => {
    if (!alive || !ctx.preview) return;
    if (i > 0 && i % TYPES.length === 0) {
      lift = !lift;
      rebuild();
    }
    chart.vchart.setHovered({ type: TYPES[i % TYPES.length] });
    i++;
  });
  if (!ctx.preview) {
    const bar = controlBar(el);
    el.prepend(bar);
    select(bar, 'hover zIndex', ['1', '0'], (v) => {
      lift = v === '1';
      rebuild();
    });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;
