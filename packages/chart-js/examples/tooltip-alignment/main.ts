// Where the tooltip sits (xAlign, yAlign, position) and how its text lines up
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { autoHover } from '../../shared/hover.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

type X = 'auto' | 'left' | 'center' | 'right';
type Y = 'auto' | 'top' | 'center' | 'bottom';
type Text = 'left' | 'center' | 'right';
type Where = 'average' | 'nearest';
const XS: readonly X[] = ['auto', 'left', 'center', 'right'];
const YS: readonly Y[] = ['auto', 'top', 'center', 'bottom'];
const TEXTS: readonly Text[] = ['left', 'center', 'right'];
const WHERES: readonly Where[] = ['average', 'nearest'];

interface State {
  x: X;
  y: Y;
  text: Text;
  where: Where;
}
const CARD_STATES: readonly State[] = [
  { x: 'auto', y: 'auto', text: 'left', where: 'average' },
  { x: 'center', y: 'bottom', text: 'center', where: 'average' },
  { x: 'left', y: 'center', text: 'right', where: 'average' },
  { x: 'auto', y: 'auto', text: 'left', where: 'nearest' },
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const note = caption(el);
  note.style.whiteSpace = 'pre-line';

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3).map((d) => ({ ...d, pointRadius: 4 })) },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: !ctx.preview },
        tooltip: {
          // A footer gives the three text blocks (title, body, footer) something to align.
          callbacks: { footer: (items) => `Total ${items.reduce((t, i) => t + (i.parsed.y ?? 0), 0)}` },
        },
      },
    },
  });

  let state: State = { x: 'auto', y: 'auto', text: 'left', where: 'average' };
  const apply = (s: State): void => {
    state = s;
    const tip = chart.options.plugins!.tooltip!;
    // tooltip.md § Tooltip Alignment: leaving xAlign / yAlign unset lets Chart.js choose.
    tip.xAlign = s.x === 'auto' ? undefined : s.x;
    tip.yAlign = s.y === 'auto' ? undefined : s.y;
    tip.titleAlign = tip.bodyAlign = tip.footerAlign = s.text;
    tip.position = s.where;
    note.textContent = `xAlign: '${s.x}', yAlign: '${s.y}'\ntext: '${s.text}', position: '${s.where}'`;
    chart.update();
  };
  apply(state);

  if (bar) {
    select(bar, 'xAlign', XS, 'auto', (x) => apply({ ...state, x }));
    select(bar, 'yAlign', YS, 'auto', (y) => apply({ ...state, y }));
    select(bar, 'text align', TEXTS, 'left', (text) => apply({ ...state, text }));
    select(bar, 'position', WHERES, 'average', (where) => apply({ ...state, where }));
  }
  const stopLook = ctx.preview ? cycle(CARD_STATES, 3000, apply) : () => {};
  const stopHover = ctx.preview
    ? autoHover(chart, 1500, (s) => [0, 1, 2].map((datasetIndex) => ({ datasetIndex, index: (s * 2 + 1) % 6 })))
    : () => {};

  return () => {
    stopLook();
    stopHover();
    stage.release(chart);
  };
};

export default mount;
