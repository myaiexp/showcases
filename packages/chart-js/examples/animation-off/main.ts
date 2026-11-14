// Animated updates, a skipped update with 'none', and animation: false
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, toggle } from '../../shared/controls.ts';
import { drinkBars, SALES_MONTHS } from '../../shared/config-data.ts';
import { seeded } from '../../shared/data.ts';

const CARD_MODES = ['update()', "update('none')", 'animation: false'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  const rand = seeded(11);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets: drinkBars(2) },
    // Slow on purpose (2 s), so the difference between the modes is easy to see.
    options: {
      maintainAspectRatio: false,
      animation: { duration: 2000 },
      scales: { y: { beginAtZero: true, max: 700 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const newFigures = (): void => {
    for (const ds of chart.data.datasets) ds.data = ds.data.map(() => Math.round(150 + rand() * 450));
  };
  const setAnimation = (on: boolean): void => {
    // animations.md § Disabling animation: `animation = false` turns every animation off.
    chart.options.animation = on ? { duration: 2000 } : false;
  };

  if (bar) {
    button(bar, 'New figures: update()', () => {
      newFigures();
      chart.update();
    });
    // api.md: the 'none' mode skips the animation for this one update only.
    button(bar, "New figures: update('none')", () => {
      newFigures();
      chart.update('none');
    });
    toggle(bar, 'Animation on (off = animation: false)', true, setAnimation);
  }

  let tick = 0;
  note.textContent = CARD_MODES[0];
  const stop = ctx.preview
    ? every(1700, () => {
        const mode = CARD_MODES[Math.floor(tick++ / 2) % CARD_MODES.length]!;
        note.textContent = mode;
        setAnimation(mode !== 'animation: false');
        newFigures();
        chart.update(mode === "update('none')" ? 'none' : undefined);
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
