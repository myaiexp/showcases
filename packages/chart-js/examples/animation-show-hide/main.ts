// Hiding or showing a dataset flies its points to the corner and back
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, select } from '../../shared/controls.ts';
import { drinkLines, SALES_MONTHS } from '../../shared/config-data.ts';

type Style = 'fly to the corner' | 'default fade';
const STYLES: readonly Style[] = ['fly to the corner', 'default fade'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el);
  let chart: Chart<'line'> | null = null;

  const build = (style: Style): void => {
    chart?.destroy();
    note.textContent = style === 'default fade' ? 'transitions: default' : 'transitions.show / hide';
    chart = new Chart<'line'>(stage.canvas, {
      type: 'line',
      data: { labels: SALES_MONTHS, datasets: drinkLines(3) },
      options: {
        maintainAspectRatio: false,
        // animations.md, "Hide and show": x and y start from 0 on show and end at 0 on hide.
        transitions:
          style === 'default fade'
            ? {}
            : {
                show: { animations: { x: { from: 0 }, y: { from: 0 } } },
                hide: { animations: { x: { to: 0 }, y: { to: 0 } } },
              },
        // Fixed range, so hiding a dataset does not rescale the others.
        scales: { y: { min: 0, max: 700 } },
        plugins: { legend: { display: !ctx.preview } },
      },
    });
  };
  const flip = (index: number): void => {
    if (!chart) return;
    if (chart.isDatasetVisible(index)) chart.hide(index);
    else chart.show(index);
  };

  build('fly to the corner');
  if (bar) {
    select(bar, 'Transition', STYLES, 'fly to the corner', build);
    for (const [i, label] of ['Espresso', 'Filter', 'Cold brew'].entries()) button(bar, `Toggle ${label}`, () => flip(i));
  }
  // A card has no legend to click, so it hides and shows the datasets itself.
  let n = 0;
  const stop = ctx.preview ? every(1500, () => flip([0, 2, 1][n++ % 3]!)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
