// util.findScaleToFit and findScaleToCover size a picture into a frame
import { Canvas, FabricImage, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { select, slider } from '../../shared/controls.ts';
import { picture } from '../../shared/images.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [320, 220],
    hint: 'The frame (dashed) is the destination {width, height}. findScaleToFit is the largest scale that still fits inside it (letterbox); findScaleToCover is the smallest that fills it (the overflow is clipped here).',
  });
  const canvas = stage.own(new Canvas(stage.el, { selection: false, skipTargetFind: true }));
  const say = briefStatus(stage);
  const img = new FabricImage(picture('landscape', 320, 220), { left: 160, top: 110 });
  const frame = new Rect({ left: 160, top: 110, fill: 'rgba(59,125,216,0.1)', stroke: '#3b7dd8', strokeWidth: 1.5, strokeDashArray: [5, 4], objectCaching: false });
  const clip = new Rect({ originX: 'center', originY: 'center', absolutePositioned: true });
  img.clipPath = clip;
  canvas.add(img, frame);

  const o = { mode: 'fit' as 'fit' | 'cover', w: 200, h: 90 };
  const apply = (): void => {
    const dest = { width: o.w, height: o.h };
    const s = o.mode === 'fit' ? util.findScaleToFit(img, dest) : util.findScaleToCover(img, dest);
    img.set({ scaleX: s, scaleY: s });
    frame.set({ width: o.w, height: o.h });
    clip.set({ left: 160, top: 110, width: o.w, height: o.h });
    // fit never overflows the frame, so the clip only matters for cover
    img.set('clipPath', o.mode === 'cover' ? clip : undefined);
    say(`${o.mode === 'fit' ? 'findScaleToFit' : 'findScaleToCover'} = ${s.toFixed(3)}\nimage ${img.width}×${img.height} → ${Math.round(img.width * s)}×${Math.round(img.height * s)}`);
    canvas.requestRenderAll();
  };
  apply();

  if (stage.bar) {
    select(stage.bar, 'mode', ['fit', 'cover'] as const, (v) => ((o.mode = v), apply()));
    slider(stage.bar, 'frame width', 60, 300, 10, o.w, (v) => ((o.w = v), apply()));
    slider(stage.bar, 'frame height', 40, 200, 10, o.h, (v) => ((o.h = v), apply()));
  } else {
    stage.loop((_dt, t) => {
      o.w = 150 + 90 * Math.sin(t * 0.8);
      o.h = 100 + 60 * Math.sin(t * 1.1 + 1);
      o.mode = Math.sin(t * 0.5) > 0 ? 'fit' : 'cover';
      apply();
    });
  }
  return stage.dispose;
};

export default mount;
