// Clip-path example helpers: the docs' four-coloured square and a few clip shapes
import { Circle, Ellipse, Group, Path, Polygon, Rect, Triangle, type FabricObject, type GroupProps } from 'fabric';

/** The clip-path pages' test card: four 100x100 rectangles (red, yellow, blue, green) in one Group centred at (cx, cy). */
export function quad(cx: number, cy: number, options: Partial<GroupProps> = {}): Group {
  const part = (fill: string, left: number, top: number): Rect =>
    new Rect({ width: 100, height: 100, fill, left, top, originX: 'left', originY: 'top' });
  const group = new Group([part('#e94b3c', 0, 0), part('#f2c230', 100, 0), part('#3b7dd8', 0, 100), part('#2e9e5b', 100, 100)], options);
  group.set({ left: cx, top: cy });
  return group;
}

export const CLIP_SHAPES = ['circle', 'rect', 'triangle', 'ellipse', 'polygon', 'path'] as const;
export type ClipShape = (typeof CLIP_SHAPES)[number];

/** A clip shape of about `size` px across, centred on (0, 0) like a default clipPath. */
export function clipShape(kind: ClipShape, size: number, options: Partial<FabricObject> = {}): FabricObject {
  const r = size / 2;
  switch (kind) {
    case 'circle':
      return new Circle({ radius: r, ...options });
    case 'rect':
      return new Rect({ width: size, height: size * 0.7, rx: size * 0.1, ry: size * 0.1, ...options });
    case 'triangle':
      return new Triangle({ width: size, height: size, ...options });
    case 'ellipse':
      return new Ellipse({ rx: r, ry: r * 0.55, ...options });
    case 'polygon':
      return new Polygon(
        Array.from({ length: 5 }, (_, i) => ({ x: r * Math.sin((i * 4 * Math.PI) / 5), y: -r * Math.cos((i * 4 * Math.PI) / 5) })),
        options,
      );
    default:
      return new Path('M 0 -50 C 40 -110 120 -30 0 50 C -120 -30 -40 -110 0 -50 Z', { scaleX: size / 130, scaleY: size / 130, ...options });
  }
}
