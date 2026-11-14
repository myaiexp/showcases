// A title and a subtitle, placed on any side and aligned, with font and padding
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C } from '../../shared/data.ts';
import { drinkBars, SALES_MONTHS } from '../../shared/config-data.ts';

// title.md § Position and § Align (the subtitle takes exactly the same options).
const POSITIONS = ['top', 'bottom', 'left', 'right'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;
type Position = (typeof POSITIONS)[number];
type Align = (typeof ALIGNS)[number];

const CARD_STATES: readonly [Position, Align][] = [
  ['top', 'center'],
  ['top', 'start'],
  ['bottom', 'end'],
  ['left', 'center'],
  ['right', 'start'],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, "position: 'top', align: 'center'");

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets: drinkBars(1) },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Espresso sales', color: C.amber, font: { size: 16 }, padding: { top: 6, bottom: 2 } },
        subtitle: { display: true, text: 'Cups per month, January to June', font: { size: 12, style: 'italic' }, padding: { bottom: 10 } },
      },
    },
  });

  const { title, subtitle } = chart.options.plugins!;
  let state: [Position, Align] = ['top', 'center'];
  const place = (position: Position, align: Align): void => {
    state = [position, align];
    for (const part of [title!, subtitle!]) Object.assign(part, { position, align });
    note.textContent = `position: '${position}', align: '${align}'`;
    chart.update();
  };

  if (bar) {
    select(bar, 'position', POSITIONS, 'top', (v) => place(v, state[1]));
    select(bar, 'align', ALIGNS, 'center', (v) => place(state[0], v));
    toggle(bar, 'subtitle', true, (v) => {
      subtitle!.display = v;
      chart.update();
    });
    slider(bar, 'title size', [10, 30, 1], 16, (v) => {
      title!.font = { size: v };
      chart.update();
    });
    slider(bar, 'title padding', [0, 40, 1], 2, (v) => {
      title!.padding = { top: 6, bottom: v };
      chart.update();
    });
  }
  const stop = ctx.preview ? cycle(CARD_STATES, 2000, (s) => place(...s)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
