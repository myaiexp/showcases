// Take a snapshot of the chart with toBase64Image() and drop it into an <img>
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, every } from '../../shared/stage.ts';
import { button, controlBar, select, slider, toggle } from '../../shared/controls.ts';
import { C, WEEKDAYS, alpha, numbers, seeded } from '../../shared/data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 118 });
  const rand = seeded(31);
  let solid = true;
  let type: 'image/png' | 'image/jpeg' = 'image/png';
  let quality = 0.9;

  const chart = new Chart(stage.canvas, {
    type: 'bar',
    data: {
      labels: WEEKDAYS,
      datasets: [{ label: 'Hours slept', data: numbers(7, 5, 9, rand), backgroundColor: alpha(C.purple, 0.7), borderRadius: 3 }],
    },
    options: { maintainAspectRatio: false, scales: { y: { min: 0, max: 10 } }, plugins: { legend: { display: !ctx.preview } } },
    // A canvas is transparent until painted, and a JPEG turns transparent into black.
    plugins: [
      {
        id: 'showcaseBackground',
        beforeDraw(c) {
          if (!solid) return;
          c.ctx.save();
          c.ctx.globalCompositeOperation = 'destination-over';
          c.ctx.fillStyle = '#18181b';
          c.ctx.fillRect(0, 0, c.width, c.height);
          c.ctx.restore();
        },
      },
    ],
  });

  // The shelf of snapshots: each one is a plain <img> whose src is the data URL.
  const shelf = document.createElement('div');
  Object.assign(shelf.style, { display: 'flex', gap: '6px', flexWrap: ctx.preview ? 'nowrap' : 'wrap', width: '100%', padding: ctx.preview ? '6px 0 0' : '10px 0 0', justifyContent: 'center' });
  const note = caption(el, 'toBase64Image()');
  el.insertBefore(shelf, note);
  const maxShots = ctx.preview ? 3 : 6;

  const snapshot = (): void => {
    const url = chart.toBase64Image(type, quality);
    const img = new Image();
    img.src = url;
    img.alt = 'Snapshot of the chart';
    if (ctx.preview) img.width = 80;
    else img.height = 90;
    img.style.border = '1px solid var(--fg-3)';
    img.style.borderRadius = '4px';
    const link = document.createElement('a');
    link.href = url;
    link.download = `sleep-chart.${type === 'image/png' ? 'png' : 'jpg'}`;
    link.title = 'Download';
    link.append(img);
    shelf.prepend(link);
    while (shelf.children.length > maxShots) shelf.lastElementChild?.remove();
    note.textContent = `toBase64Image('${type}'${type === 'image/jpeg' ? `, ${quality}` : ''}) · ${Math.round(url.length / 1024)} kB`;
  };

  if (bar) {
    button(bar, 'Take snapshot', snapshot);
    button(bar, 'New week', () => {
      chart.data.datasets[0]!.data = numbers(7, 4, 9, rand);
      chart.update('none');
    });
    select(bar, 'Format', ['image/png', 'image/jpeg'] as const, type, (v) => (type = v));
    slider(bar, 'JPEG quality', [0.1, 1, 0.1], quality, (v) => (quality = v));
    toggle(bar, 'solid background', true, (v) => ((solid = v), chart.update('none')));
  }
  // The card shoots a new week every couple of seconds. update('none') first, so the
  // picture is the finished chart and not a frame from the middle of an animation.
  const stop = ctx.preview
    ? every(1900, () => {
        chart.data.datasets[0]!.data = numbers(7, 4, 9, rand);
        chart.update('none');
        snapshot();
      })
    : () => {};
  if (ctx.preview) snapshot();
  // The full view starts with one picture on the shelf, once the entrance animation is done.
  const first = ctx.preview ? 0 : window.setTimeout(snapshot, 1300);

  return () => {
    stop();
    window.clearTimeout(first);
    shelf.remove();
    note.remove();
    stage.release(chart);
  };
};

export default mount;
