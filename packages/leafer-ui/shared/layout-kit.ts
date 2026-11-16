// Small drawing and formatting helpers for the Data and Layout examples
import { Ellipse, Rect, Text, type IBoundsData, type IUI } from 'leafer-ui';

export const RED = '#FF4B4B';
export const YELLOW = '#FEB027';
export const BLUE = '#4B8BFF';

/** A parent that takes children: a Leafer, Group, Box or Frame. */
type Parent = { add(child: IUI | IUI[]): unknown };

/** Rounds to one decimal. */
export const r1 = (n: number): number => Math.round(n * 10) / 10;

/** "x, y" with one decimal. */
export const pt = (p: { x: number; y: number }): string => `${r1(p.x)}, ${r1(p.y)}`;

/** "x y w h" with one decimal. */
export const box = (b: IBoundsData): string => `x ${r1(b.x)}  y ${r1(b.y)}  w ${r1(b.width)}  h ${r1(b.height)}`;

/** A dot centred on (x, y) that never takes the pointer. Move it with `set({ x, y })` (its top-left). */
export function marker(parent: Parent, x: number, y: number, color = RED, r = 5): Ellipse {
  const dot = new Ellipse({ x: x - r, y: y - r, width: r * 2, height: r * 2, fill: color, hittable: false });
  parent.add(dot);
  return dot;
}

/** Moves a `marker` so that its centre is at (x, y). */
export function placeMarker(dot: Ellipse, x: number, y: number): void {
  dot.set({ x: x - dot.width! / 2, y: y - dot.height! / 2 });
}

/** A dashed rectangle that outlines a bounds box; `show(b)` moves it, `show(null)` hides it. */
export function outline(parent: Parent, color = RED): { show(b: IBoundsData | null): void } {
  const rect = new Rect({ stroke: color, strokeWidth: 1.5, dashPattern: [5, 4], hittable: false, visible: false });
  parent.add(rect);
  return {
    show(b) {
      if (!b) return void (rect.visible = false);
      rect.set({ x: b.x, y: b.y, width: b.width, height: b.height, visible: true });
    },
  };
}

/** Spaces `items` (already sized) evenly along a row in the middle of the pane, with a small label under each. */
export function lineUp(
  stage: { width: number; height: number; preview: boolean },
  parent: Parent,
  items: IUI[],
  labels: readonly string[] = [],
): void {
  const slot = stage.width / items.length;
  const fontSize = stage.preview ? 10 : 13;
  items.forEach((it, i) => {
    const w = it.width ?? 0, h = it.height ?? 0;
    it.set({ x: slot * i + (slot - w) / 2, y: (stage.height - h) / 2 - 14 });
    parent.add(it);
    if (labels[i] !== undefined) {
      parent.add(
        new Text({ x: slot * i, y: (stage.height + h) / 2 - 8, width: slot, text: labels[i], fill: '#666', fontSize, textAlign: 'center', hittable: false }),
      );
    }
  });
}
