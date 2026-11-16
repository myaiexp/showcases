// Geometry sandbox: draggable handles and an overlay for vectors and labels
import { Circle, Point, util, type Canvas, type FabricObject } from 'fabric';

export const INK = '#2b2a33';
export const RED = '#e94b3c';
export const BLUE = '#3b7dd8';
export const GREEN = '#2e9e5b';
export const GOLD = '#d99a1c';

/** A small draggable dot that cannot be resized or rotated; `left`/`top` is its centre. */
export function handle(x: number, y: number, fill = BLUE, radius = 7): Circle {
  return new Circle({
    left: x,
    top: y,
    radius,
    fill,
    stroke: '#fff',
    strokeWidth: 2,
    hasControls: false,
    hasBorders: false,
    hoverCursor: 'grab',
    moveCursor: 'grabbing',
    objectCaching: false,
  });
}

export const at = (o: FabricObject): Point => new Point(o.left, o.top);

/** Moves a handle (and its hit area) without the canvas repainting yet. */
export function put(o: FabricObject, p: { x: number; y: number }): void {
  o.set({ left: p.x, top: p.y });
  o.setCoords();
}

/** A point drifting on a loop around (cx, cy): cards use it to move handles without a pointer. */
export function drift(t: number, cx: number, cy: number, ax: number, ay: number, speed = 1, phase = 0): Point {
  return new Point(cx + ax * Math.cos(t * speed + phase), cy + ay * Math.sin(t * speed * 1.3 + phase));
}

/** Draws in scene units after each render: the context gets the viewportTransform first. */
export function overlay(canvas: Canvas, draw: (ctx: CanvasRenderingContext2D) => void): void {
  canvas.on('after:render', ({ ctx }) => {
    ctx.save();
    ctx.transform(...canvas.viewportTransform);
    ctx.lineJoin = 'round';
    draw(ctx);
    ctx.restore();
  });
}

export function seg(ctx: CanvasRenderingContext2D, a: Point, b: Point, color = INK, width = 2, dash: number[] = []): void {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
  ctx.restore();
}

export function arrow(ctx: CanvasRenderingContext2D, from: Point, to: Point, color = INK, width = 2.5): void {
  seg(ctx, from, to, color, width);
  const v = util.createVector(from, to);
  if (util.magnitude(v) < 4) return;
  const u = util.getUnitVector(v);
  const n = util.getOrthonormalVector(v);
  const back = to.subtract(u.scalarMultiply(10));
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(to.x, to.y);
  ctx.lineTo(back.x + n.x * 4.5, back.y + n.y * 4.5);
  ctx.lineTo(back.x - n.x * 4.5, back.y - n.y * 4.5);
  ctx.closePath();
  ctx.fill();
}

export function dot(ctx: CanvasRenderingContext2D, p: Point, color = INK, r = 4): void {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  ctx.fill();
}

export function label(ctx: CanvasRenderingContext2D, text: string, p: Point, color = INK, size = 12): void {
  ctx.font = `${size}px ui-monospace, monospace`;
  ctx.fillStyle = color;
  ctx.fillText(text, p.x + 8, p.y - 8);
}

export function poly(ctx: CanvasRenderingContext2D, pts: readonly Point[], stroke = INK, fill?: string, width = 2): void {
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.strokeStyle = stroke;
  ctx.lineWidth = width;
  ctx.stroke();
}

/** Plain readable number for readouts. */
export const n1 = (v: number): string => (Math.round(v * 10) / 10).toString();
export const pt = (p: { x: number; y: number }): string => `(${n1(p.x)}, ${n1(p.y)})`;
