// Replacing obj.controls on single objects, never on the shared prototype
import { Canvas, FabricText, Rect, controlsUtils } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [380, 220], hint: 'Three rectangles, three control sets. Each rectangle owns its `controls` object.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'click a rectangle');

  const style = { width: 80, height: 70, cornerStyle: 'circle' as const, transparentCorners: false, cornerColor: '#e94b3c' };
  const plain = new Rect({ ...style, left: 70, top: 100, fill: '#3b7dd8' });

  const corners = new Rect({ ...style, left: 190, top: 100, fill: '#2e9e5b' });
  const set = controlsUtils.createObjectDefaultControls();
  corners.controls = { tl: set.tl, br: set.br }; // only two corners

  const sides = new Rect({ ...style, left: 310, top: 100, fill: '#d99a1c' });
  const resize = controlsUtils.createResizeControls();
  sides.controls = { ml: resize.ml, mr: resize.mr, mtr: controlsUtils.createObjectDefaultControls().mtr }; // resize + rotate

  const labels: [Rect, string][] = [[plain, 'default'], [corners, 'tl + br'], [sides, 'resize + rotate']];
  canvas.add(plain, corners, sides);
  for (const [o, text] of labels) {
    canvas.add(new FabricText(text, { left: o.left, top: 175, fontSize: 13, fontFamily: 'monospace', fill: '#555', selectable: false, evented: false }));
  }
  const report = (): void => {
    const o = canvas.getActiveObject();
    say(o ? `controls: ${Object.keys(o.controls).join(', ')}` : 'click a rectangle');
  };
  for (const ev of ['selection:created', 'selection:updated', 'selection:cleared'] as const) canvas.on(ev, report);

  if (stage.preview) {
    const ghost = stage.ghost(canvas);
    let i = 0;
    stage.repeat(async () => {
      await ghost.click([plain, corners, sides][i++ % 3]!.getCenterPoint());
      await stage.wait(1100);
    }, 100);
  }
  return stage.dispose;
};

export default mount;
