// A duration slider sets how long the bars take to grow; replay to feel it
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { button, controlBar, slider } from '../../shared/controls.ts';
import { drinkBars, SALES_MONTHS } from '../../shared/config-data.ts';

const CARD_DURATIONS = [200, 1800, 600, 3000] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, `duration: ${CARD_DURATIONS[0]} ms`);

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: { labels: SALES_MONTHS, datasets: drinkBars(2) },
    options: {
      maintainAspectRatio: false,
      // animations.md § animation: duration is in milliseconds (default 1000).
      animation: { duration: CARD_DURATIONS[0] },
      scales: { y: { beginAtZero: true, max: 700 } },
      plugins: { legend: { display: !ctx.preview } },
    },
  });

  const replay = (): void => {
    chart.reset();
    chart.update();
  };
  const setDuration = (duration: number): void => {
    chart.options.animation = { ...(chart.options.animation || {}), duration };
    note.textContent = `duration: ${duration} ms`;
  };

  if (bar) {
    slider(bar, 'Duration (ms)', [0, 4000, 100], 1000, setDuration);
    button(bar, 'Replay', replay);
    setDuration(1000);
    replay();
  }
  const stop = ctx.preview
    ? cycle(CARD_DURATIONS, 3400, (d) => {
        setDuration(d);
        replay();
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
