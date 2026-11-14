// exportCanvas: copy the chart's canvas, draw a watermark on the copy, show it as an <img>
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';
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
  img.alt = 'exported canvas with a watermark';
  img.style.cssText = `width:${ctx.preview ? 110 : 280}px;border:1px solid #4a5060;background:#0c0d11`;
  wrap.append(img);

  const { vchart, release } = createChart(el, ctx, barSpec({ legend: false }), { parent: left, previewHeight: 200, height: 320 });
  let alive = true;
  let seed = 1;
  let text = 'SAMPLE';
  const stamp = (): void => {
    if (!alive) return;
    const source = vchart.exportCanvas();
    if (!source) return;
    const copy = document.createElement('canvas');
    copy.width = source.width;
    copy.height = source.height;
    const g = copy.getContext('2d');
    if (!g) return;
    // The copy gets an opaque background (the chart's own is transparent), the chart, then the stamp.
    g.fillStyle = '#0c0d11';
    g.fillRect(0, 0, copy.width, copy.height);
    g.drawImage(source, 0, 0);
    g.save();
    g.translate(copy.width / 2, copy.height / 2);
    g.rotate(-Math.PI / 8);
    g.font = `bold ${Math.round(copy.width / 6)}px sans-serif`;
    g.textAlign = 'center';
    g.fillStyle = 'rgba(246,189,22,0.35)';
    g.fillText(text, 0, 0);
    g.restore();
    img.src = copy.toDataURL('image/png');
  };
  window.setTimeout(stamp, 700);
  const change = (): void => {
    if (!alive) return;
    seed += 1;
    void vchart.updateData('main', rows(seed));
    window.setTimeout(stamp, 900);
  };
  if (bar) {
    button(bar, 'New data and export', change);
    button(bar, 'Watermark: SAMPLE', () => {
      text = 'SAMPLE';
      stamp();
    });
    button(bar, 'Watermark: DRAFT', () => {
      text = 'DRAFT';
      stamp();
    });
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
