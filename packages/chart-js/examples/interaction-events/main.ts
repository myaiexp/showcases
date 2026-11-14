// events picks the browser events a chart listens to; onHover and onClick report them
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { controlBar, log, select } from '../../shared/controls.ts';
import { C, MONTHS, alpha } from '../../shared/data.ts';
import { ghostCursor } from '../../shared/config-data.ts';

// interactions.md § Events: the default list, and some narrower ones.
const PRESETS = {
  'all (default)': ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
  'click only': ['click'],
  'mousemove only': ['mousemove'],
  'nothing': [],
} satisfies Record<string, (keyof HTMLElementEventMap)[]>;
type Preset = keyof typeof PRESETS;
const NAMES = Object.keys(PRESETS) as Preset[];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 164 });
  const note = caption(el);
  note.style.whiteSpace = 'pre-line';
  const write = ctx.preview ? () => {} : log(el, 5);
  const ghost = ghostCursor();

  const seen = { hover: 0, click: 0 };
  let preset: Preset = 'all (default)';
  const describe = (): void => {
    note.textContent = `events: ${JSON.stringify(PRESETS[preset]).replaceAll('"', "'")}\nonHover ${seen.hover} · onClick ${seen.click}`;
  };

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [{ label: 'Visitors', data: [320, 410, 380, 520, 610, 560], backgroundColor: alpha(C.cyan, 0.65), borderColor: C.cyan, borderWidth: 1 }],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true, max: 800 } },
      events: PRESETS[preset],
      // Both are called for events over the chart area; e.type tells which one it was.
      onHover: (e) => {
        seen.hover++;
        write(`onHover: ${e.type}`);
        describe();
      },
      onClick: (e, active) => {
        seen.click++;
        write(`onClick: ${e.type}, ${active.length ? `bar ${active[0]!.index + 1}` : 'no bar'}`);
        describe();
      },
      plugins: { legend: { display: false } },
    },
    plugins: ctx.preview ? [ghost.plugin] : [],
  });

  const choose = (p: Preset): void => {
    preset = p;
    seen.hover = seen.click = 0;
    // update() notices the changed list and rebinds the canvas listeners.
    chart.options.events = [...PRESETS[p]];
    chart.update();
    describe();
  };
  describe();

  if (bar) select(bar, 'events', NAMES, preset, choose);
  // The card's pointer moves to a bar, then clicks it, over and over; each preset runs 4 rounds.
  let step = 0;
  const stop = ctx.preview
    ? every(700, () => {
        const n = step++;
        if (n % 8 === 0 && n > 0) choose(NAMES[(n / 8) % NAMES.length]!);
        const bar = chart.getDatasetMeta(0).data[Math.floor(n / 2) % 6]!;
        ghost.move(chart, bar.x, bar.y + 12, n % 2 === 0 ? 'mousemove' : 'click');
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
