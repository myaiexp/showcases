// Coffee per weekday: axis titles say what each axis measures
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

type Align = 'start' | 'center' | 'end';
interface Title {
  display: boolean;
  align: Align;
  size: number;
  padding: number;
  multiline: boolean;
}
const STATES: Title[] = [
  { display: false, align: 'center', size: 12, padding: 4, multiline: false },
  { display: true, align: 'center', size: 12, padding: 4, multiline: false },
  { display: true, align: 'start', size: 16, padding: 4, multiline: false },
  { display: true, align: 'end', size: 12, padding: 16, multiline: false },
  { display: true, align: 'center', size: 12, padding: 4, multiline: true },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const label = caption(el);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Cups', data: [14, 18, 17, 21, 24, 9, 6], backgroundColor: alpha(C.amber, 0.7) }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { x: { title: {} }, y: { title: {} } },
      plugins: { legend: { display: false } },
    },
  });

  // labelling.md § Scale Title Configuration: display, text (string or lines), align, font, padding.
  const apply = (t: Title): void => {
    const scales = chart.options.scales!;
    scales.x!.title = { display: t.display, text: 'Day of the week', align: t.align, font: { size: t.size, weight: 'bold' }, padding: t.padding };
    scales.y!.title = {
      display: t.display,
      text: t.multiline ? ['Cups of coffee', 'served'] : 'Cups of coffee served',
      align: t.align,
      font: { size: t.size, weight: 'bold' },
      padding: t.padding,
    };
    chart.update();
    label.textContent = t.display
      ? `title: align '${t.align}', size ${t.size}, padding ${t.padding}${t.multiline ? ', text[]' : ''}`
      : 'title.display: false';
  };
  apply(STATES[0]!);

  if (bar) {
    const now: Title = { ...STATES[1]! };
    apply(now);
    toggle(bar, 'display', now.display, (v) => ((now.display = v), apply(now)));
    select(bar, 'align', ['start', 'center', 'end'] as const, now.align, (v) => ((now.align = v), apply(now)));
    slider(bar, 'font size', [9, 26, 1], now.size, (v) => ((now.size = v), apply(now)));
    slider(bar, 'padding', [0, 30, 1], now.padding, (v) => ((now.padding = v), apply(now)));
    toggle(bar, 'two lines (y)', now.multiline, (v) => ((now.multiline = v), apply(now)));
  }
  const stop = ctx.preview ? cycle(STATES, 2200, apply) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
