// Chart.getChart(canvas) finds a chart; isPluginEnabled() its plugins
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle, type Stage } from '../../shared/stage.ts';
import { log } from '../../shared/controls.ts';
import { C, MONTHS, PALETTE, alpha } from '../../shared/data.ts';

const PLUGINS = ['legend', 'tooltip', 'title', 'filler'];

const mount: Mount = (el, ctx) => {
  // Two charts side by side, each in its own stage box, plus a third canvas with no chart.
  const row = document.createElement('div');
  Object.assign(row.style, { display: 'flex', gap: '12px', width: '100%', alignItems: 'flex-start' });
  el.append(row);
  const cell = (): HTMLDivElement => {
    const div = document.createElement('div');
    Object.assign(div.style, { flex: '1', minWidth: '0', borderRadius: '6px', cursor: 'pointer', outlineOffset: '2px' });
    row.append(div);
    return div;
  };
  const cells = ctx.preview ? [cell(), cell()] : [cell(), cell(), cell()];
  const size = { previewHeight: 130, height: 220 };
  const stages = cells.map((c) => createStage(el, ctx, { ...size, parent: c }));
  const [a, b, c] = stages as [Stage, Stage, Stage | undefined];
  a.canvas.id = 'showcase-line-canvas';
  const note = caption(el, 'click a canvas');
  const write = ctx.preview ? null : log(el, 4);
  note.style.display = ctx.preview ? '' : 'none';

  const line = new Chart(a.canvas, {
    type: 'line',
    data: {
      labels: MONTHS.slice(0, 6),
      datasets: [{ label: 'Visitors', data: [12, 19, 15, 25, 22, 30], borderColor: C.blue, backgroundColor: alpha(C.blue, 0.3), fill: true }],
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } } },
  });
  const doughnut = new Chart(b.canvas, {
    type: 'doughnut',
    data: { labels: ['Mon', 'Tue', 'Wed'], datasets: [{ data: [3, 5, 2], backgroundColor: PALETTE.slice(0, 3).map((p) => alpha(p, 0.8)) }] },
    // plugins.legend: false (plugins.md § Disable plugins; the types only allow it on `plugins`) removes the plugin from this chart altogether.
    options: { maintainAspectRatio: false, plugins: { legend: false as unknown as undefined, title: { display: true, text: 'No legend plugin' } } },
  });
  // The third canvas is plain: no chart was ever created on it.
  const ctx2d = c?.canvas.getContext('2d');
  if (ctx2d) {
    ctx2d.fillStyle = 'rgba(250, 250, 250, 0.4)';
    ctx2d.font = '14px sans-serif';
    ctx2d.fillText('a plain canvas', 10, 30);
  }

  // api.md § Static: getChart(key) and § isPluginEnabled(pluginId).
  const inspect = (canvas: HTMLCanvasElement): string => {
    const found = Chart.getChart(canvas);
    if (!found) return 'Chart.getChart(canvas) → undefined (nothing is drawn by Chart.js here)';
    const on = PLUGINS.filter((id) => found.isPluginEnabled(id));
    return `Chart.getChart(canvas) → ${(found.config as { type?: string }).type} chart, ${found.data.datasets.length} dataset(s); plugins on: ${on.join(', ')}`;
  };
  const choose = (i: number): void => {
    cells.forEach((cellEl, j) => (cellEl.style.outline = j === i ? `2px solid ${C.amber}` : 'none'));
    const text = inspect(stages[i]!.canvas);
    note.textContent = ctx.preview ? text.replace(/^Chart.getChart\(canvas\) → /, '') : text;
    write?.(text);
  };
  cells.forEach((cellEl, i) => cellEl.addEventListener('click', () => choose(i)));
  choose(0);
  // Chart.getChart also takes the canvas id as a string.
  if (!ctx.preview) write?.(`Chart.getChart('showcase-line-canvas') is the same chart: ${Chart.getChart('showcase-line-canvas') === line}`);

  const stop = ctx.preview ? cycle(cells.map((_, i) => i), 1800, choose) : () => {};

  return () => {
    stop();
    line.destroy();
    doughnut.destroy();
    for (const s of stages) s.release();
    row.remove();
    note.remove();
  };
};

export default mount;
