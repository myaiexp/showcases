// Coffee stock as an object: each property name a label, its value the bar
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

const ORIGINS: readonly (readonly [string, number])[] = [
  ['Brazil', 120],
  ['Colombia', 85],
  ['Ethiopia', 60],
  ['Kenya', 45],
  ['Guatemala', 70],
  ['Vietnam', 95],
  ['Peru', 55],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);
  // data-structures.md § Object: property names index the x scale, values the y scale.
  const stock: Record<string, number> = Object.fromEntries(ORIGINS.slice(0, 4));

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      datasets: [{ label: 'Green beans in stock (kg)', data: stock, backgroundColor: alpha(C.amber, 0.6), borderColor: C.amber, borderWidth: 1 }],
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } } },
  });

  const show = (): void => {
    chart.update();
    label.textContent = ctx.preview ? `${Object.keys(stock).length} properties in the object` : JSON.stringify(stock);
  };
  const add = (): void => {
    const next = ORIGINS.find(([name]) => !(name in stock));
    if (next) stock[next[0]] = next[1];
    show();
  };
  const remove = (): void => {
    const last = Object.keys(stock).at(-1);
    if (last && Object.keys(stock).length > 1) delete stock[last];
    show();
  };
  show();

  if (bar) {
    button(bar, 'Add an origin', add);
    button(bar, 'Remove the last', remove);
  }
  const stop = ctx.preview
    ? every(1600, () => {
        if (Object.keys(stock).length < ORIGINS.length) add();
        else {
          while (Object.keys(stock).length > 3) remove();
        }
      })
    : () => {};

  return () => {
    stop();
    stage.release(chart as unknown as Chart); // release() takes the default chart type
  };
};

export default mount;
