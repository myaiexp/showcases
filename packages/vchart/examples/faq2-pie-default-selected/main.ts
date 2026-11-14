// FAQ: pie.state.selected + setSelected right after renderSync gives a pie a selected sector from the start
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

const TYPES = ['oxygen', 'silicon', 'aluminum', 'iron', 'calcium', 'sodium', 'others'];
const values = TYPES.map((type, i) => ({ type, value: [46.6, 27.7, 8.1, 5, 3.6, 2.8, 3.5][i] }));

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, {
    type: 'pie',
    data: [{ id: 'elements', values }],
    valueField: 'value',
    categoryField: 'type',
    outerRadius: 0.8,
    innerRadius: 0.5,
    padAngle: 0.6,
    // The look of a selected sector.
    pie: { state: { selected: { outerRadius: 0.87, stroke: '#ffffff', lineWidth: 2 } } },
    legends: { visible: !ctx.preview, orient: 'right' },
  });
  // The default selection: one datum, set once the chart is drawn.
  vchart.setSelected({ type: 'oxygen' });

  let alive = true;
  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1300, () => {
      if (alive) vchart.setSelected({ type: TYPES[++i % TYPES.length] });
    });
  } else {
    const bar = controlBar(el);
    el.prepend(bar);
    button(bar, 'select oxygen', () => vchart.setSelected({ type: 'oxygen' }));
    button(bar, 'select silicon', () => vchart.setSelected({ type: 'silicon' }));
    button(bar, 'setSelected(null)', () => vchart.setSelected(null));
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
