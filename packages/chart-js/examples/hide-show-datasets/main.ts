// Your own legend: HTML buttons that hide and show lines
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { drinkLines, DRINKS, SALES_MONTHS } from '../../shared/config-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 176 });
  const note = caption(el, 'cups sold per month');
  let animated = true;

  const chart = new Chart(stage.canvas, {
    type: 'line',
    data: { labels: SALES_MONTHS, datasets: drinkLines(3) },
    options: {
      maintainAspectRatio: false,
      // The built-in legend is off: the buttons below take its place.
      plugins: { legend: { display: false } },
    },
  });

  // api.md: hide(i)/show(i) animate; setDatasetVisibility(i, v) + update() is the plain switch.
  const setVisible = (i: number, visible: boolean): void => {
    if (animated) {
      if (visible) chart.show(i);
      else chart.hide(i);
      note.textContent = `chart.${visible ? 'show' : 'hide'}(${i})`;
    } else {
      chart.setDatasetVisibility(i, visible);
      chart.update('none');
      note.textContent = `chart.setDatasetVisibility(${i}, ${visible})`;
    }
  };

  const chips: HTMLButtonElement[] = [];
  const refreshChips = (): void => {
    chips.forEach((chip, i) => {
      const on = chart.isDatasetVisible(i);
      chip.style.opacity = on ? '1' : '0.4';
      chip.style.textDecoration = on ? 'none' : 'line-through';
    });
  };

  if (bar) {
    DRINKS.forEach(([name, color], i) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.textContent = name;
      chip.style.borderLeft = `6px solid ${color}`;
      chip.addEventListener('click', () => {
        setVisible(i, !chart.isDatasetVisible(i));
        refreshChips();
      });
      bar.append(chip);
      chips.push(chip);
    });
    toggle(bar, 'animate (hide/show)', true, (v) => (animated = v));
  }

  // A card has no pointer: it presses the buttons itself, one drink at a time.
  const steps = [
    [1, false],
    [2, false],
    [1, true],
    [2, true],
  ] as const;
  const stop = ctx.preview ? cycle(steps, 1700, ([i, v]) => setVisible(i, v)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
