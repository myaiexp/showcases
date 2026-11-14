// HTML badges placed from the x and y in getDatasetMeta
import type { Mount } from '@/types.ts';
import { Chart, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, alpha, numbers, seeded } from '../../shared/data.ts';

const TEAS = ['Green', 'Black', 'Chai', 'Mint', 'Oolong', 'Rooibos'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx);
  const rand = seeded(9);
  const badges = TEAS.map(() => {
    const b = document.createElement('div');
    Object.assign(b.style, {
      position: 'absolute',
      transform: 'translate(-50%, -100%)',
      padding: '1px 6px',
      borderRadius: '9px',
      font: `${ctx.preview ? 10 : 12}px ui-monospace, monospace`,
      background: 'var(--bg-surface)',
      color: 'var(--fg-1)',
      border: '1px solid var(--fg-3)',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
    });
    stage.box.append(b);
    return b;
  });

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: TEAS,
      datasets: [{ label: 'Cups per week', data: numbers(6, 20, 90, rand), backgroundColor: alpha(C.green, 0.6), borderRadius: 3 }],
    },
    options: {
      maintainAspectRatio: false,
      layout: { padding: { top: 26 } },
      scales: { x: { ticks: { font: { size: ctx.preview ? 9 : 12 }, maxRotation: 0, autoSkip: false } } },
      plugins: { legend: { display: false } },
    },
    plugins: [
      {
        id: 'showcaseBadges',
        // afterDraw runs on every frame (afterRender does not during animations), so the
        // badges ride along with the bars.
        afterDraw(c) {
          const meta = c.getDatasetMeta(0);
          const values = c.data.datasets[0]!.data as number[];
          const best = values.indexOf(Math.max(...values));
          meta.data.forEach((element, i) => {
            const badge = badges[i]!;
            // developers/api.md § getDatasetMeta: every bar knows where it was drawn.
            badge.style.left = `${element.x}px`;
            badge.style.top = `${element.y - 4}px`;
            badge.textContent = `${i === best ? '★ ' : ''}${values[i]}`;
            badge.style.borderColor = i === best ? C.amber : 'var(--fg-3)';
          });
        },
      },
    ],
  });

  const shuffle = (): void => {
    chart.data.datasets[0]!.data = numbers(6, 15, 95, rand);
    chart.update();
  };
  if (bar) button(bar, 'New week', shuffle);
  const stop = ctx.preview ? every(2000, shuffle) : () => {};

  return () => {
    stop();
    for (const b of badges) b.remove();
    stage.release(chart);
  };
};

export default mount;
