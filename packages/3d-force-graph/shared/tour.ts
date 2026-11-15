// Helpers for cards that fake input: where to aim the ghost pointer, and a marker that shows where it is
import { endId, type TLink, type TNode } from './data.ts';
import type { Stage } from './stage.ts';

/** The end of a link as a node object (links hold node objects once the first digest has run). */
export function endNode(end: TLink['source']): TNode {
  return typeof end === 'object' ? end : { id: end };
}

/** The middle of a link, in graph coordinates. */
export function midpoint(link: TLink): { x: number; y: number; z: number } {
  const a = endNode(link.source);
  const b = endNode(link.target);
  return { x: ((a.x ?? 0) + (b.x ?? 0)) / 2, y: ((a.y ?? 0) + (b.y ?? 0)) / 2, z: ((a.z ?? 0) + (b.z ?? 0)) / 2 };
}

/** The link's length in graph units. */
export function linkLength(link: TLink): number {
  const a = endNode(link.source);
  const b = endNode(link.target);
  return Math.hypot((a.x ?? 0) - (b.x ?? 0), (a.y ?? 0) - (b.y ?? 0), (a.z ?? 0) - (b.z ?? 0));
}

/** "a>b" for a link, whether its ends are ids or node objects. */
export function linkKey(link: TLink): string {
  return `${endId(link.source)}>${endId(link.target)}`;
}

/** A small ring on the pane at container pixels, for a card whose fake pointer matters. */
export function pointerMarker(stage: Stage): (x: number, y: number) => void {
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:absolute;left:0;top:0;width:12px;height:12px;margin:-6px 0 0 -6px;border:2px solid #fff;border-radius:50%;' +
    'pointer-events:none;box-shadow:0 0 4px #000;transition:transform .3s';
  stage.container.append(dot);
  return (x, y) => {
    dot.style.transform = `translate(${x}px, ${y}px)`;
  };
}
