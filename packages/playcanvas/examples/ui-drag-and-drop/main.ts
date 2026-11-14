// Drag and drop: ElementDragHelper moves a card to a slot or home
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

/** Bounds of an element in CSS pixels from the top-left of the canvas. */
function bounds(entity: pc.Entity): { left: number; right: number; top: number; bottom: number } {
  const [bottomLeft, , topRight] = entity.element!.canvasCorners;
  return { left: bottomLeft!.x, right: topRight!.x, top: topRight!.y, bottom: bottomLeft!.y };
}

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  const slot = addElement(ui.screen, 'slot', { width: 150, height: 150, color: color(COL.panel) }, [150, 10]);
  addText(ui, ui.screen, 'drop here', { fontSize: 22, color: color(COL.dim) }, [150, -80]);
  const card = addElement(ui.screen, 'card', { width: 130, height: 130, color: color(COL.accent), useInput: true }, [-150, 10]);
  addText(ui, card, 'drag me', { fontSize: 26, color: color('#161820') });
  const home = card.getLocalPosition().clone();

  let drag: pc.ElementDragHelper | null = null;
  if (ctx.preview) {
    // A card has no pointer, so the card slides to the slot and back by itself.
    let t = 0;
    const target = slot.getLocalPosition();
    ui.app.on('update', (dt: number) => {
      t += dt;
      const ease = (x: number): number => 0.5 - 0.5 * Math.cos(Math.min(1, x) * Math.PI);
      const phase = t % 4;
      const k = phase < 2 ? ease(phase / 1.2) : 1 - ease((phase - 2) / 1.2);
      card.setLocalPosition(pc.math.lerp(home.x, target.x, k), home.y, 0);
    });
  } else {
    drag = new pc.ElementDragHelper(card.element!);
    drag.on('drag:start', () => (slot.element!.color = color(COL.panelLight)));
    drag.on('drag:end', () => {
      slot.element!.color = color(COL.panel);
      const a = bounds(card);
      const b = bounds(slot);
      const overSlot = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
      // Snap into the slot, or back to where the card came from.
      if (overSlot) card.setPosition(slot.getPosition());
      else card.setLocalPosition(home);
    });
  }

  return () => {
    drag?.destroy();
    ui.dispose();
  };
};

export default mount;
