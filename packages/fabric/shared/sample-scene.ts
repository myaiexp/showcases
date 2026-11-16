// A small named scene of shapes for the Serialization examples
import { Circle, Rect, Triangle, type FabricObject } from 'fabric';

export const SCENE: readonly [number, number] = [160, 200];

/** Fresh objects each call; `name` and `zone` are custom properties, not fabric options. */
export function sampleScene(): FabricObject[] {
  const rect = new Rect({ left: 58, top: 62, width: 64, height: 44, fill: '#3b7dd8', angle: 12, rx: 6, ry: 6 });
  const dot = new Circle({ left: 106, top: 120, radius: 24, fill: '#e94b3c', stroke: '#7a1f17', strokeWidth: 3 });
  const tri = new Triangle({ left: 48, top: 148, width: 44, height: 40, fill: '#2e9e5b' });
  return [
    Object.assign(rect, { name: 'banner', zone: 'top' }),
    Object.assign(dot, { name: 'button', zone: 'middle' }),
    Object.assign(tri, { name: 'arrow', zone: 'bottom' }),
  ];
}
