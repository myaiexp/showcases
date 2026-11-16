// config cache limits shape the cache canvas of a big object
import { Canvas, Point, Polygon, config } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['rendered', 'its _cacheCanvas'],
    scene: [300, 220],
    hint: 'The three limits in config bound the cache canvas. A big object past a limit gets a smaller cache that is stretched back up (blurry); a small one gets padded up to minCacheSideLimit. They are page-wide, so each render here sets them and restores the defaults in the same tick.',
  });
  const [pa, pb] = stage.panes as [(typeof stage.panes)[0], (typeof stage.panes)[0]];
  // Nothing else may repaint this canvas: a render at the default limits would rebuild the cache.
  const canvas = stage.own(new Canvas(pa.el, { selection: false, skipTargetFind: true, renderOnAddRemove: false }), pa);
  const say = status(stage, '', pb);

  const star = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12 - Math.PI / 2;
    const d = i % 2 ? 62 : 100;
    return new Point(Math.cos(a) * d, Math.sin(a) * d);
  });
  const shape = new Polygon(star, { left: 150, top: 110, fill: '#ffe9a8', stroke: '#2b2a33', strokeWidth: 1, strokeDashArray: [4, 3] });
  canvas.add(shape);

  const limits = { perfLimitSizeTotal: 2097152, maxCacheSideLimit: 4096, minCacheSideLimit: 256 };
  const view = pb.el.getContext('2d')!;

  const draw = (): void => {
    const saved = {
      perfLimitSizeTotal: config.perfLimitSizeTotal,
      maxCacheSideLimit: config.maxCacheSideLimit,
      minCacheSideLimit: config.minCacheSideLimit,
    };
    config.configure(limits);
    try {
      shape.dirty = true;
      canvas.renderAll(); // the cache is sized while rendering, under the limits above
    } finally {
      config.configure(saved);
    }
    view.clearRect(0, 0, pb.width, pb.height);
    const cache = shape._cacheCanvas;
    if (!cache) return;
    const k = Math.min(1, pb.width / cache.width, pb.height / cache.height);
    const ox = (pb.width - cache.width * k) / 2;
    const oy = (pb.height - cache.height * k) / 2;
    view.fillStyle = '#fffdf7';
    view.fillRect(ox, oy, cache.width * k, cache.height * k);
    view.drawImage(cache, ox, oy, cache.width * k, cache.height * k);
    view.strokeStyle = '#999';
    view.strokeRect(ox + 0.5, oy + 0.5, cache.width * k - 1, cache.height * k - 1);
    say(`cache ${cache.width}×${cache.height} · zoom ${(shape.zoomX ?? 1).toFixed(2)}`);
  };
  draw();

  if (stage.bar) {
    slider(stage.bar, 'perfLimitSizeTotal', 2, 2048, 2, 2048, (v) => ((limits.perfLimitSizeTotal = v * 1024), draw()), (v) => `${v}k px`);
    slider(stage.bar, 'maxCacheSideLimit', 32, 4096, 32, 4096, (v) => ((limits.maxCacheSideLimit = v), draw()));
    slider(stage.bar, 'minCacheSideLimit', 16, 512, 16, 256, (v) => ((limits.minCacheSideLimit = v), draw()));
  } else {
    const steps = [
      { perfLimitSizeTotal: 2097152, maxCacheSideLimit: 4096, minCacheSideLimit: 256 },
      { perfLimitSizeTotal: 20000, maxCacheSideLimit: 4096, minCacheSideLimit: 16 },
      { perfLimitSizeTotal: 2097152, maxCacheSideLimit: 90, minCacheSideLimit: 16 },
      { perfLimitSizeTotal: 2097152, maxCacheSideLimit: 4096, minCacheSideLimit: 400 },
    ];
    let i = 0;
    stage.every(1600, () => {
      Object.assign(limits, steps[++i % steps.length]);
      draw();
    });
  }
  return stage.dispose;
};

export default mount;
