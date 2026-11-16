// Canvas: toDataURL() exports the canvas as an image; format, multiplier, quality and a crop box are options
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, select, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { panes: ctx.preview ? undefined : ['canvas', 'toDataURL result'], width: 760, height: 300, hint: 'Move the shapes and change the options: the picture on the right is always the latest export, shown on a checkerboard so transparency is visible.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);
  const { width: w, height: h } = stage;

  const rect = new Rect({ left: w * 0.3, top: h * 0.5, width: w * 0.28, height: h * 0.4, fill: '#3b7dd8', angle: 10 });
  canvas.add(rect, new Circle({ left: w * 0.62, top: h * 0.45, radius: h * 0.2, fill: '#e94b3c' }), new Triangle({ left: w * 0.5, top: h * 0.78, width: w * 0.2, height: h * 0.2, fill: '#2e9e5b' }));

  // The result: a pane of its own in the full view, a thumbnail over the corner of a card.
  const img = document.createElement('img');
  const checker = 'repeating-conic-gradient(#d9d4c7 0% 25%, #f6f3ec 0% 50%) 0 0 / 16px 16px';
  if (stage.preview) {
    img.style.cssText = `position:absolute;right:6px;top:6px;width:${w * 0.4}px;border:2px solid #3b2a8c;background:${checker};z-index:4`;
    stage.frame.append(img);
  } else {
    const slot = stage.panes[1]!;
    img.style.cssText = `max-width:100%;max-height:100%;background:${checker};display:block;margin:auto`;
    slot.frame.style.display = 'flex';
    slot.frame.style.alignItems = 'center';
    slot.frame.append(img);
    slot.el.remove();
  }

  const o = { format: 'png' as 'png' | 'jpeg', multiplier: 1, quality: 0.8, crop: false };
  const exportNow = (): void => {
    const url = canvas.toDataURL({
      format: o.format,
      multiplier: o.multiplier,
      quality: o.quality,
      ...(o.crop ? { left: w * 0.2, top: h * 0.15, width: w * 0.5, height: h * 0.6 } : {}),
    });
    img.src = url;
    say(`${o.format} · ${o.multiplier}x · ${(url.length / 1024).toFixed(1)} kB`);
  };
  exportNow();
  canvas.on('object:moving', exportNow);
  canvas.on('object:modified', exportNow);

  if (stage.bar) {
    select(stage.bar, 'format', ['png', 'jpeg'], (v) => ((o.format = v), exportNow()));
    slider(stage.bar, 'multiplier', 0.5, 3, 0.5, 1, (v) => ((o.multiplier = v), exportNow()), (v) => `${v}x`);
    slider(stage.bar, 'quality (jpeg)', 0.1, 1, 0.1, 0.8, (v) => ((o.quality = v), exportNow()), (v) => v.toFixed(1));
    checkbox(stage.bar, 'crop to a box', false, (v) => ((o.crop = v), exportNow()));
  } else {
    stage.loop((_dt, t) => {
      rect.set({ left: w * 0.3 + 25 * Math.sin(t * 1.4), angle: 10 + 30 * Math.sin(t * 1.1) });
      rect.setCoords();
      canvas.requestRenderAll();
    });
    stage.every(250, exportNow);
  }

  return stage.dispose;
};

export default mount;
