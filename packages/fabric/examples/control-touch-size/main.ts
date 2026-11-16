// Controls: cornerSize, touchCornerSize and per-control sizeX/touchSizeX, with the touch areas drawn
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [320, 240], hint: 'Red squares are what is drawn (cornerSize). The dashed squares are the areas a finger can grab (touchCornerSize); a mouse only uses the red ones.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const rect = new Rect({ left: 160, top: 120, width: 170, height: 100, fill: '#3b7dd8', cornerColor: '#e94b3c', cornerSize: 12, touchCornerSize: 36, transparentCorners: false });
  canvas.add(rect);
  canvas.setActiveObject(rect);

  const show = (): void => {
    rect.setCoords(); // oCoords hold each handle's corner and touchCorner polygons
    say(stage.preview ? `cornerSize ${rect.cornerSize.toFixed(0)}  touch ${rect.touchCornerSize.toFixed(0)}` : `cornerSize ${rect.cornerSize}  touchCornerSize ${rect.touchCornerSize}  mr: sizeX ${rect.controls.mr!.sizeX || '-'} touchSizeX ${rect.controls.mr!.touchSizeX || '-'}`);
    canvas.requestRenderAll();
  };
  show();

  const outline = canvas.on('after:render', ({ ctx: c }) => {
    c.save();
    c.strokeStyle = '#2b2a33';
    c.setLineDash([3, 3]);
    for (const key of Object.keys(rect.controls)) {
      const t = rect.oCoords[key]!.touchCorner;
      c.beginPath();
      [t.tl, t.tr, t.br, t.bl].forEach((p, i) => (i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y)));
      c.closePath();
      c.stroke();
    }
    c.restore();
  });
  stage.onDispose(outline);

  if (stage.bar) {
    slider(stage.bar, 'cornerSize', 6, 30, 1, 12, (v) => { rect.cornerSize = v; show(); });
    slider(stage.bar, 'touchCornerSize', 6, 60, 1, 36, (v) => { rect.touchCornerSize = v; show(); });
    checkbox(stage.bar, 'wider mr control', false, (v) => {
      Object.assign(rect.controls.mr!, v ? { sizeX: 10, sizeY: 40, touchSizeX: 30, touchSizeY: 70 } : { sizeX: 0, sizeY: 0, touchSizeX: 0, touchSizeY: 0 });
      show();
    });
  } else {
    Object.assign(rect.controls.mr!, { sizeX: 10, sizeY: 40, touchSizeX: 30, touchSizeY: 70 });
    stage.loop((_dt, t) => {
      rect.cornerSize = 12 + Math.sin(t * 1.5) * 4;
      rect.touchCornerSize = 34 + Math.sin(t * 2.2) * 14;
      rect.rotate(Math.sin(t * 0.7) * 25);
      show();
    });
  }
  return stage.dispose;
};

export default mount;
