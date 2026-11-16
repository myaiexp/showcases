// Controls: setControlsVisibility and setControlVisible hide handlers on one object
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const KEYS = ['tl', 'mt', 'tr', 'ml', 'mr', 'bl', 'mb', 'br', 'mtr'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'Visibility is kept on the object (_controlsVisibility), so other objects are unaffected.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 160, top: 120, width: 150, height: 100, fill: '#3b7dd8', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  const other = new Rect({ left: 60, top: 190, width: 50, height: 40, fill: '#bbb', selectable: false });
  canvas.add(rect, other);
  canvas.setActiveObject(rect);

  const show = (): void => {
    say(`hidden: ${KEYS.filter((k) => !rect.isControlVisible(k)).join(' ') || 'none'}`);
    canvas.requestRenderAll();
  };
  show();

  if (stage.bar) {
    const boxes = KEYS.map((k) => checkbox(stage.bar!, k, true, (v) => { rect.setControlVisible(k, v); show(); }));
    button(stage.bar, 'corners only', () => {
      rect.setControlsVisibility({ tl: true, tr: true, bl: true, br: true, ml: false, mr: false, mt: false, mb: false, mtr: false });
      KEYS.forEach((k, i) => (boxes[i]!.checked = rect.isControlVisible(k)));
      show();
    });
    button(stage.bar, 'show all', () => {
      rect.setControlsVisibility(Object.fromEntries(KEYS.map((k) => [k, true])));
      boxes.forEach((b) => (b.checked = true));
      show();
    });
    checkbox(stage.bar, 'hasControls', true, (v) => { rect.hasControls = v; canvas.requestRenderAll(); });
  } else {
    const steps: Record<string, boolean>[] = [
      { tl: true, tr: true, bl: true, br: true, ml: false, mr: false, mt: false, mb: false, mtr: false },
      { tl: false, tr: false, bl: false, br: false, ml: true, mr: true, mt: true, mb: true, mtr: false },
      { tl: false, tr: false, bl: false, br: false, ml: false, mr: false, mt: false, mb: false, mtr: true },
      Object.fromEntries(KEYS.map((k) => [k, true])),
    ];
    let i = 0;
    stage.every(1300, () => { rect.setControlsVisibility(steps[i++ % steps.length]!); show(); });
  }
  return stage.dispose;
};

export default mount;
