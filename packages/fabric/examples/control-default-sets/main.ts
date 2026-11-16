// Controls: createObjectDefaultControls, createResizeControls and createTextboxDefaultControls as sets
import { Canvas, Point, Rect, Textbox, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { controlPoint } from '../../shared/ghost.ts';
import { loadFonts } from '../../shared/fonts.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const SETS = ['createObjectDefaultControls', 'createResizeControls', 'createTextboxDefaultControls'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [360, 240], hint: 'Each factory returns a fresh set of Controls. A Textbox is born with the textbox set: its side handles change the width instead of scaling.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 85, top: 100, width: 110, height: 80, fill: '#3b7dd8', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const use = (name: (typeof SETS)[number]): void => {
    rect.controls = controlsUtils[name](); // new Control instances: nothing is shared with other objects
    rect.setCoords();
    say(stage.preview ? `${name}()` : `rect.controls = ${name}()\nkeys: ${Object.keys(rect.controls).join(' ')}`);
    canvas.requestRenderAll();
  };
  use('createObjectDefaultControls');

  void loadFonts().then(() => {
    if (stage.disposed) return;
    const box = new Textbox('Textbox: drag my side handles', { left: 280, top: 100, width: 120, fontSize: 18, fontFamily: 'Inter', fill: '#2b2a33', cornerStyle: 'circle', cornerColor: '#e94b3c', transparentCorners: false });
    canvas.add(box);
    canvas.requestRenderAll();
  });

  if (stage.bar) select(stage.bar, 'rect gets', SETS, use);
  else {
    const ghost = stage.ghost(canvas);
    let i = 0;
    stage.repeat(async () => {
      use(SETS[i++ % SETS.length]!);
      rect.set({ scaleX: 1, scaleY: 1 });
      rect.set('width', 110);
      rect.setCoords();
      const p = controlPoint(rect, 'mr');
      await ghost.drag(p, new Point(p.x + 30, p.y), 800);
      await stage.wait(400);
    }, 100);
  }
  return stage.dispose;
};

export default mount;
