// Reverse states: hover_reverse and selected_reverse restyle every mark that is not the active one
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

const ROWS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({ day, hours: [6, 9, 7, 11, 8, 4, 3][i] }));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'hours', values: ROWS }],
    xField: 'day',
    yField: 'hours',
    select: { enable: true, mode: 'multiple' },
    bar: {
      state: {
        hover: { fill: '#ffa94d' },
        hover_reverse: { fillOpacity: 0.3 },
        selected: { stroke: '#ffffff', lineWidth: 3 },
        selected_reverse: { fillOpacity: 0.45 },
      },
    },
  });
  let alive = true;
  let i = 0;
  const stop = every(ctx.preview ? 900 : 1200, () => {
    if (!alive || bar) return;
    const row = ROWS[i % ROWS.length];
    // First pass hovers each bar, second pass selects them one by one.
    const pass = Math.floor(i / ROWS.length) % 2;
    if (pass === 0) {
      vchart.clearSelected();
      vchart.setHovered(row ?? null);
    } else {
      vchart.clearHovered();
      vchart.setSelected(row ?? null);
    }
    i++;
  });
  if (bar) {
    button(bar, 'Select Mon and Wed', () => vchart.setSelected([ROWS[0] ?? {}, ROWS[2] ?? {}]));
    button(bar, 'Clear selected', () => vchart.clearSelected());
    button(bar, 'Clear all states', () => vchart.clearAllStates());
  }
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;
