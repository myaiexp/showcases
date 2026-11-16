// The object's cache canvas drawn beside the scene: size and repaints
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { briefStatus } from '../../shared/code-panel.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['the object', 'its _cacheCanvas'],
    scene: [200, 200],
    hint: 'With objectCaching on, fabric paints the object into a hidden canvas (_cacheCanvas) and drawImage()s it. Right: that bitmap, with the object bounds in red. Scaling changes its size and repaints it; rotating does not.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  const canvas = stage.own(new Canvas(pa.el, { selection: false }), pa);
  const say = briefStatus(stage, pb);

  const rect = new Rect({
    left: 100, top: 100, width: 90, height: 56, rx: 10, ry: 10,
    fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 4, strokeDashArray: [10, 6],
  });
  canvas.add(rect);

  // Count repaints of the cache: drawObject runs on the cache's context only when the object is dirty.
  let repaints = 0;
  const drawObject = rect.drawObject;
  rect.drawObject = function (...args: Parameters<typeof drawObject>) {
    repaints++;
    return drawObject.apply(this, args);
  };

  // The cache pane is a plain 2D canvas: copy the bitmap in at its real size (shrunk to fit).
  const view = pb.el.getContext('2d')!;
  const show = (): void => {
    view.clearRect(0, 0, pb.width, pb.height);
    const cache = rect._cacheCanvas;
    if (!cache) {
      say('objectCaching is off: no cache canvas');
      return;
    }
    const k = Math.min(1, pb.width / cache.width, pb.height / cache.height);
    const ox = (pb.width - cache.width * k) / 2;
    const oy = (pb.height - cache.height * k) / 2;
    view.fillStyle = '#fffdf7';
    view.fillRect(ox, oy, cache.width * k, cache.height * k);
    view.drawImage(cache, ox, oy, cache.width * k, cache.height * k);
    view.strokeStyle = '#999';
    view.strokeRect(ox + 0.5, oy + 0.5, cache.width * k - 1, cache.height * k - 1);
    // the object's own bounds inside the cache
    const { x, y } = rect._getCacheCanvasDimensions();
    view.strokeStyle = '#e94b3c';
    view.setLineDash([4, 3]);
    view.strokeRect(ox + (cache.width - x) * k / 2, oy + (cache.height - y) * k / 2, x * k, y * k);
    view.setLineDash([]);
    say(`cache ${cache.width}×${cache.height}px · repaints ${repaints}`);
  };
  canvas.on('after:render', show);

  const o = { scale: 1, spin: true };
  if (stage.bar) {
    slider(stage.bar, 'scale', 0.3, 3, 0.1, 1, (v) => {
      o.scale = v;
      rect.set({ scaleX: v, scaleY: v });
      canvas.requestRenderAll();
    });
    checkbox(stage.bar, 'spin', true, (v) => (o.spin = v));
    checkbox(stage.bar, 'objectCaching', true, (v) => {
      rect.set('objectCaching', v);
      canvas.requestRenderAll();
    });
  }
  stage.loop((_dt, t) => {
    if (o.spin) rect.rotate((t * 50) % 360);
    if (stage.preview) rect.set({ scaleX: 1 + 0.7 * Math.sin(t), scaleY: 1 + 0.7 * Math.sin(t) });
    canvas.requestRenderAll();
  });
  return stage.dispose;
};

export default mount;
