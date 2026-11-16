// Drawing outside width and height is cut off by the object cache
import { Canvas, Rect, config } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/custom.ts';

// A Rect whose own drawing sticks out of its width x height box.
class Spiky extends Rect {
  static override type = 'ShowcaseSpiky';
  declare reach: number;
  static override cacheProperties = [...Rect.cacheProperties, 'reach'];
  override _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);
    ctx.strokeStyle = '#e94b3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (const [x, y] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as const) {
      ctx.moveTo((x * this.width) / 2, (y * this.height) / 2);
      ctx.lineTo((x * this.width) / 2 + x * this.reach, (y * this.height) / 2 + y * this.reach);
    }
    ctx.stroke();
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Both bars draw four spikes beyond their 230×30 box. The cache canvas is only as big as the box plus a little padding (256 px is the smallest side; the canvas is not scaled here, a zoomed one would get a bigger cache), so the cached bar loses the tips at its ends; with objectCaching off they are drawn in full. Drag the reach slider.',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));

  const look = { width: stage.preview ? 110 : 230, height: 30, fill: '#cfe3ff', stroke: '#3b7dd8', strokeWidth: 2 };
  const cached = new Spiky({ ...look, left: stage.width / 2, top: stage.height * 0.27, objectCaching: true });
  const plain = new Spiky({ ...look, left: stage.width / 2, top: stage.height * 0.73, objectCaching: false });
  for (const s of [cached, plain]) s.reach = 28;
  canvas.add(cached, plain, caption(stage.preview ? 'cached' : 'objectCaching: true', stage.width / 2, stage.height * 0.27, 12), caption(stage.preview ? 'not cached' : 'objectCaching: false', stage.width / 2, stage.height * 0.73, 12));

  const reach = (v: number): void => {
    for (const s of [cached, plain]) s.set('reach', v); // in cacheProperties: the cache repaints
    canvas.requestRenderAll();
  };
  if (stage.bar) {
    slider(stage.bar, 'reach', 0, 40, 2, 28, reach);
  }
  if (!stage.preview) return stage.dispose;

  // A card is narrower than the 256 px smallest cache side, so the cut would fall outside it.
  // config is page-wide: lower minCacheSideLimit only around this canvas's own synchronous
  // render, and put it back in the same tick, so no other canvas ever sees the change.
  canvas.renderOnAddRemove = false;
  stage.loop((_dt, t) => {
    for (const s of [cached, plain]) s.set('reach', 30 + 12 * Math.sin(t * 1.5));
    const { minCacheSideLimit } = config;
    config.configure({ minCacheSideLimit: 64 });
    try {
      canvas.renderAll();
    } finally {
      config.configure({ minCacheSideLimit });
    }
  });
  return stage.dispose;
};

export default mount;
