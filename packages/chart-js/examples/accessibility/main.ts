// A step-count chart with and without an accessible name and fallback content
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha } from '../../shared/data.ts';

const STEPS = [8200, 6900, 9400, 7100, 10300, 12800, 5600];
const SUMMARY = 'Bar chart of daily steps. Lowest Sunday with 5,600, highest Saturday with 12,800.';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 150, height: 300 });
  const canvas = stage.canvas;
  const label = caption(el);
  label.style.whiteSpace = 'pre-line';
  const reader = ctx.preview ? null : document.createElement('pre');
  if (reader) {
    reader.style.cssText = 'width:100%;margin:10px 0 0;font:12px ui-monospace,monospace;color:var(--fg-2);white-space:pre-wrap';
    el.append(reader);
  }

  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Steps', data: STEPS, backgroundColor: alpha(C.green, 0.6), borderColor: C.green, borderWidth: 1 }],
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } } },
  });

  // accessibility.md: ARIA attributes on the canvas, or fallback content inside it.
  const apply = (named: boolean, fallback: boolean): void => {
    if (named) {
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', SUMMARY);
    } else {
      canvas.removeAttribute('role');
      canvas.removeAttribute('aria-label');
    }
    canvas.replaceChildren();
    if (fallback) {
      const table = document.createElement('table');
      table.innerHTML =
        '<caption>Daily steps</caption><tr><th>Day</th><th>Steps</th></tr>' +
        WEEKDAYS.map((d, i) => `<tr><td>${d}</td><td>${STEPS[i]}</td></tr>`).join('');
      canvas.append(table);
    }
    label.textContent = named
      ? 'role="img" aria-label="…"'
      : fallback
        ? '<canvas><table>…</table></canvas>'
        : '<canvas></canvas> with nothing added';
    if (ctx.preview) label.textContent += named ? '\nreads: "image, Bar chart of…"' : fallback ? '\nreads: 8 table rows' : '\nreads: nothing useful';
    if (reader) {
      reader.textContent =
        `Accessible name: ${named ? `image, "${SUMMARY}"` : 'none, so a screen reader skips the chart'}\n` +
        `Fallback content: ${fallback ? `a table of ${STEPS.length} rows inside the canvas tags` : 'none'}`;
    }
  };
  let namedOn = true;
  let fallbackOn = false;
  apply(namedOn, fallbackOn);

  if (bar) {
    toggle(bar, 'role="img" and aria-label', true, (v) => apply((namedOn = v), fallbackOn));
    toggle(bar, 'fallback table inside <canvas>', false, (v) => apply(namedOn, (fallbackOn = v)));
  }
  const states = [
    [false, false],
    [true, false],
    [false, true],
  ] as const;
  const stop = ctx.preview ? cycle(states, 2200, ([n, f]) => apply(n, f)) : () => {};

  return () => {
    stop();
    stage.release(chart);
  };
};

export default mount;
