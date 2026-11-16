// A 1000 x 640 world of shapes and grid labels for zoom and pan examples
import { Circle, FabricText, Line, Point, Rect, Triangle, util, type Canvas, type FabricObject, type XY } from 'fabric';
import type { Ghost, GhostKeys } from './ghost.ts';

export const WORLD_W = 1000;
export const WORLD_H = 640;

const PALETTE = ['#e94b3c', '#3b7dd8', '#2e9e5b', '#f2b134', '#8e44ad', '#16a085', '#e67e22'];

/** Fresh objects each call: a frame, a 100 px grid, labels at every 200 px and 16 shapes. Grid and labels ignore the pointer. */
export function buildWorld(): FabricObject[] {
  const quiet = { selectable: false, evented: false } as const;
  const out: FabricObject[] = [];
  out.push(
    new Rect({ left: 0, top: 0, originX: 'left', originY: 'top', width: WORLD_W, height: WORLD_H, fill: 'transparent', stroke: '#c0392b', strokeWidth: 3, strokeUniform: true, objectCaching: false, ...quiet }),
  );
  for (let x = 100; x < WORLD_W; x += 100) {
    out.push(new Line([x, 0, x, WORLD_H], { stroke: '#d8d2c2', strokeWidth: 1, strokeUniform: true, objectCaching: false, ...quiet }));
  }
  for (let y = 100; y < WORLD_H; y += 100) {
    out.push(new Line([0, y, WORLD_W, y], { stroke: '#d8d2c2', strokeWidth: 1, strokeUniform: true, objectCaching: false, ...quiet }));
  }
  for (let x = 0; x <= WORLD_W; x += 200) {
    for (let y = 0; y <= 600; y += 200) {
      out.push(new FabricText(`${x},${y}`, { left: x + 4, top: y + 4, originX: 'left', originY: 'top', fontSize: 14, fontFamily: 'monospace', fill: '#8a8472', ...quiet }));
    }
  }
  let s = 7;
  const rnd = (): number => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  // One shape per 200 x 160 cell (5 x 4 cells), four cells left empty.
  const skip = new Set([3, 8, 12, 17]);
  let cell = 0;
  for (let gy = 0; gy < 4; gy++) {
    for (let gx = 0; gx < 5; gx++, cell++) {
      if (skip.has(cell)) continue;
      const left = gx * 200 + 100 + (rnd() - 0.5) * 70;
      const top = gy * 160 + 80 + (rnd() - 0.5) * 50;
      const fill = PALETTE[cell % PALETTE.length]!;
      const size = 44 + Math.round(rnd() * 26);
      const kind = cell % 3;
      out.push(
        kind === 0
          ? new Rect({ left, top, width: size, height: size, fill, angle: rnd() * 40 - 20 })
          : kind === 1
            ? new Circle({ left, top, radius: size / 2, fill })
            : new Triangle({ left, top, width: size, height: size, fill }),
      );
    }
  }
  return out;
}

/** The scene point that is under `screen` (canvas pixels) right now: ghost methods take scene points. */
export function sceneAt(canvas: Canvas, screen: XY): Point {
  return new Point(screen).transform(util.invertTransform(canvas.viewportTransform));
}

/** One wheel turn with the pointer held at a fixed screen position, however the viewport has moved. */
export function wheelAt(ghost: Ghost, canvas: Canvas, screen: XY, deltaY: number, keys?: GhostKeys): void {
  ghost.wheel(sceneAt(canvas, screen), deltaY, keys);
}

/**
 * Scene points for `ghost.stroke` that drag the pane's content from screen point `from` to `to` while a
 * handler pans with the pointer's screen delta. The viewport moves under the pointer on every event, so
 * each point is the grabbed scene point plus that step's delta; the zoom must not change during the drag.
 */
export function panPath(canvas: Canvas, from: XY, to: XY, steps = 30): Point[] {
  const z = canvas.getZoom();
  const grab = sceneAt(canvas, from);
  const at = (t: number): Point => new Point(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
  const out = [grab];
  for (let i = 1; i <= steps; i++) {
    const d = at(i / steps).subtract(at((i - 1) / steps));
    out.push(grab.add(d.scalarDivide(z)));
  }
  return out;
}
