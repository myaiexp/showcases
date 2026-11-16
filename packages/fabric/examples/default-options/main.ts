// Objects: new Rect() with no options has defaults: black fill, no stroke, and 0 by 0 size
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'An option-less Rect exists but has no size, so nothing is drawn until it gets a width and a height.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect(); // no options at all
  canvas.add(rect);

  const report = (): void => {
    const keys = ['width', 'height', 'left', 'top', 'fill', 'stroke', 'strokeWidth', 'opacity', 'originX', 'angle'] as const;
    say(keys.slice(0, stage.preview ? 5 : keys.length).map((k) => `${k}: ${String(rect.get(k))}`).join('\n'));
  };
  const sizeIt = (on: boolean): void => {
    if (on) rect.set({ width: 80, height: 60, left: 150, top: 100 });
    else rect.set({ width: 0, height: 0, left: 0, top: 0 });
    rect.setCoords();
    report();
    canvas.requestRenderAll();
  };
  report();
  if (stage.bar) {
    button(stage.bar, 'give it width 80, height 60 and centre it', () => sizeIt(true));
    button(stage.bar, 'back to defaults', () => sizeIt(false));
  } else {
    let on = false;
    stage.every(1600, () => sizeIt((on = !on)));
  }

  return stage.dispose;
};

export default mount;
