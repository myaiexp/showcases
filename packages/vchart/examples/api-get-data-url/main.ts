// getDataURL: a snapshot of the chart shown in an <img>
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { barSpec, rows } from '../../shared/api-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;gap:12px;align-items:flex-start;width:100%';
  el.append(wrap);
  const left = document.createElement('div');
  left.style.cssText = 'flex:1 1 0;min-width:0';
  wrap.append(left);
  const img = document.createElement('img');
  img.alt = 'snapshot from getDataURL';
  img.style.cssText = `width:${ctx.preview ? 110 : 240}px;border:1px solid #4a5060;background:#0c0d11`;
  wrap.append(img);

  const { vchart, release } = createChart(el, ctx, barSpec({ legend: false }), { parent: left, previewHeight: 200, height: 320 });
  const out = bar ? readout(el) : null;
  let alive = true;
  let seed = 1;
  const snap = async (): Promise<void> => {
    const url = (await vchart.getDataURL()) as string;
    if (!alive) return;
    img.src = url;
    if (out) out.textContent = `getDataURL() -> ${url.slice(0, 48)}... (${url.length} characters)`;
  };
  const change = (): void => {
    if (!alive) return;
    seed += 1;
    void vchart.updateData('main', rows(seed));
    // Give the bars time to finish animating before the snapshot.
    window.setTimeout(() => {
      if (alive) void snap();
    }, 900);
  };
  setTimeout(() => void snap(), 600);
  if (bar) {
    button(bar, 'New data, then snapshot', change);
    button(bar, 'Snapshot now', () => void snap());
  }
  const stop = bar ? () => {} : every(2400, change);
  return () => {
    alive = false;
    stop();
    release();
    wrap.remove();
  };
};

export default mount;
