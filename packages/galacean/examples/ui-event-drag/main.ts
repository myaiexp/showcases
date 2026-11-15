// Drag events bubble: dragging a handle moves its parent panel
import { type PointerEventData, Script } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { ghost, image, label, rect, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { hint: 'Drag the orange handle: the whole panel follows.' });
  const { stage, canvasEntity } = ui;
  const panel = image(canvasEntity, 0, 0, 300, 170, { color: [0.3, 0.45, 0.8, 1] }, 'panel');
  label(panel.entity, 0, -20, 'drag the handle', 24);
  const handle = image(panel.entity, 0, 55, 120, 40, { color: [0.9, 0.55, 0.25, 1] }, 'handle');
  label(handle.entity, 0, 0, 'handle', 20);
  class Mover extends Script {
    override onPointerDrag(event: PointerEventData): void {
      // Pointer deltas are in canvas pixels; the canvas scales 400 UI units to the canvas height.
      const k = this.engine.canvas.height / 400;
      const t = rect(this.entity);
      t.position.set(t.position.x + event.pointer.deltaPosition.x / k, t.position.y - event.pointer.deltaPosition.y / k, 0);
    }
  }
  panel.entity.addComponent(Mover); // the drag starts on the handle and bubbles up to this script
  if (stage.preview) {
    const g = ghost(stage);
    const path: [number, number][] = [[-120, 40], [-60, 20], [60, -10], [0, 30], [0, 0]];
    const ev: [number, () => void][] = [[0.3, () => g.move(0, 55)], [0.8, () => g.down()]];
    path.forEach(([x, y], i) => ev.push([1.2 + i * 0.35, () => g.move(x + 0, y + 55)]));
    ev.push([3.3, () => g.up()], [3.8, () => (rect(panel.entity).position.set(0, 0, 0), g.move(0, -140))]);
    timeline(canvasEntity, 4.4, ev);
  }
  return stage.dispose;
};

export default mount;
