// Zoom and pan: getVpCenter and viewportCenterObject place objects in the middle of what you see
import { Canvas, Circle, Point, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';
import { buildWorld, WORLD_H, WORLD_W } from '../../shared/zoom-world.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Pan (Alt + drag) and zoom (wheel), then add a marker. Blue ones use viewportCenterObject: the middle of the view. Red ones use centerObject: the middle of the canvas, wherever the view is.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  canvas.add(...buildWorld());
  const say = status(stage);

  const home = Math.min(stage.width / WORLD_W, stage.height / WORLD_H);
  canvas.setViewportTransform([home * 1.6, 0, 0, home * 1.6, -60, -20]);
  const show = (): void => {
    const c = canvas.getVpCenter();
    say(`getVpCenter() = (${Math.round(c.x)}, ${Math.round(c.y)})`);
  };
  show();

  const addInView = (): void => {
    const dot = new Circle({ radius: 16, fill: '#3b7dd8', stroke: '#fff', strokeWidth: 3 });
    canvas.add(dot);
    canvas.viewportCenterObject(dot);
    dot.setCoords();
    show();
  };
  const addInCanvas = (): void => {
    const sq = new Rect({ width: 26, height: 26, fill: '#e94b3c', stroke: '#fff', strokeWidth: 3 });
    canvas.add(sq);
    // centerObject uses the canvas centre in scene coordinates as if the view were not moved.
    canvas.centerObject(sq);
    sq.setCoords();
    show();
  };

  let panning = false;
  let last = new Point(0, 0);
  canvas.on('mouse:down:before', (opt) => {
    const e = opt.e as MouseEvent;
    if (!e.altKey) return;
    panning = true;
    canvas.skipTargetFind = true;
    canvas.selection = false;
    last = new Point(e.clientX, e.clientY);
  });
  canvas.on('mouse:move', (opt) => {
    if (!panning) return;
    const e = opt.e as MouseEvent;
    canvas.relativePan(new Point(e.clientX - last.x, e.clientY - last.y));
    last = new Point(e.clientX, e.clientY);
    show();
  });
  canvas.on('mouse:up', () => {
    panning = false;
    canvas.skipTargetFind = false;
    canvas.selection = true;
  });
  canvas.on('mouse:wheel', (opt) => {
    canvas.zoomToPoint(opt.viewportPoint, Math.min(20, Math.max(0.1, canvas.getZoom() * 0.999 ** opt.e.deltaY)));
    opt.e.preventDefault();
    opt.e.stopPropagation();
    show();
  });

  if (stage.bar) {
    button(stage.bar, 'Add at view centre', addInView);
    button(stage.bar, 'Add at canvas centre', addInCanvas);
    button(stage.bar, 'Remove markers', () => canvas.remove(...canvas.getObjects().filter((o) => o.selectable && o.stroke === '#fff')));
  } else {
    // Scripted pans: the viewport moves, then each kind of marker is placed.
    const views: [number, number][] = [[-60, -20], [-260, -80], [-120, -200], [0, 0]];
    let n = 0;
    stage.every(1100, () => {
      const [x, y] = views[Math.floor(n / 2) % views.length]!;
      canvas.setViewportTransform([home * 1.6, 0, 0, home * 1.6, x, y]);
      if (n % 2) addInCanvas();
      else addInView();
      const markers = canvas.getObjects().filter((o) => o.stroke === '#fff');
      if (markers.length > 6) canvas.remove(markers[0]!);
      n++;
    });
  }

  return stage.dispose;
};

export default mount;
