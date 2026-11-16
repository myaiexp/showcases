// Transformations: saveObjectTransform keeps the values, resetObjectTransform clears them, set() restores them
import { Canvas, Point, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [340, 240], hint: 'Transform the rectangle by hand, press save, transform it more, then reset or restore.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 170, top: 120, width: 110, height: 70, fill: '#2e9e5b', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  let saved: ReturnType<typeof util.saveObjectTransform> | undefined;
  const t = (o: { scaleX: number; scaleY: number; angle: number; skewX: number; skewY: number }): string =>
    `scale ${o.scaleX.toFixed(2)} x ${o.scaleY.toFixed(2)}  angle ${o.angle.toFixed(0)}  skew ${o.skewX.toFixed(0)}, ${o.skewY.toFixed(0)}`;
  const show = (what = ''): void => {
    const short = (o: { scaleX: number; angle: number }): string => `x${o.scaleX.toFixed(2)} ${o.angle.toFixed(0)}°`;
    say(stage.preview ? `now ${short(rect)}   saved ${saved ? short(saved) : '-'}` : `${what}\nnow:   ${t(rect)}\nsaved: ${saved ? t(saved) : 'nothing yet'}`);
    canvas.requestRenderAll();
  };
  show('drag a handle');
  canvas.on('object:modified', () => show());

  const save = (): void => { saved = util.saveObjectTransform(rect); show('saveObjectTransform(rect)'); };
  const reset = (): void => { util.resetObjectTransform(rect); rect.setCoords(); show('resetObjectTransform(rect)'); };
  const restore = (): void => { if (saved) { rect.set(saved); rect.setCoords(); } show('rect.set(saved)'); };

  if (stage.bar) {
    button(stage.bar, 'save', save);
    button(stage.bar, 'reset', reset);
    button(stage.bar, 'restore', restore);
  } else {
    const ghost = stage.ghost(canvas);
    stage.repeat(async () => {
      saved = undefined;
      reset();
      let br = controlPoint(rect, 'br');
      await ghost.drag(br, br.add(new Point(25, 18)), 700);
      const h = controlPoint(rect, 'mtr');
      await ghost.drag(h, h.add(new Point(40, 10)), 700);
      save();
      br = controlPoint(rect, 'br');
      await ghost.drag(br, br.add(new Point(-35, 20)), 700);
      await stage.wait(500);
      reset();
      await stage.wait(900);
      restore();
      await stage.wait(1200);
    }, 200);
  }
  return stage.dispose;
};

export default mount;
