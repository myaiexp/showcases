// Customization helpers: a caption under a shape, a reset for card drags
import { FabricText, type FabricObject } from 'fabric';

/** A grey monospace caption centred at x, y that the pointer ignores. */
export function caption(text: string, x: number, y: number, size = 11): FabricText {
  return new FabricText(text, {
    left: x,
    top: y,
    fontSize: size,
    fontFamily: 'monospace',
    fill: '#555',
    selectable: false,
    evented: false,
  });
}

/** Remembers where objects are now; the returned function puts them (and their scale, angle and skew) back. */
export function rememberPose(objects: readonly FabricObject[]): () => void {
  const poses = objects.map((o) => ({
    o,
    pose: { left: o.left, top: o.top, scaleX: o.scaleX, scaleY: o.scaleY, angle: o.angle, skewX: o.skewX, skewY: o.skewY, flipX: o.flipX, flipY: o.flipY },
  }));
  return () => {
    for (const { o, pose } of poses) {
      o.set(pose);
      o.setCoords();
    }
    objects[0]?.canvas?.requestRenderAll();
  };
}
