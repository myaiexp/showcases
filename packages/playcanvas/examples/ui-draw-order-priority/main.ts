// Draw order: hierarchy order in a screen, priority between two screens
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, COL, createUi, every } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // Within one screen a later sibling is drawn over an earlier one: the hierarchy is the draw order.
  const stack = addGroup(ui.screen, 'stack', { width: 10, height: 10 }, [-150, 10]);
  const tints = [COL.red, COL.green, COL.blue];
  const cards = tints.map((tint, i) => {
    const c = addElement(stack, `card ${i + 1}`, { width: 130, height: 130, color: color(tint) }, [(i - 1) * 45, (1 - i) * 20]);
    addText(ui, c, String(i + 1), { fontSize: 44, color: color('#161820') });
    return c;
  });
  addText(ui, ui.screen, 'reparent() to the same parent', { fontSize: 18, color: color(COL.dim) }, [-150, -90]);
  addText(ui, ui.screen, 'moves a card to the front', { fontSize: 18, color: color(COL.dim) }, [-150, -112]);

  // Two screens: the one with the higher priority is drawn on top, whatever the hierarchy says.
  const second = new pc.Entity('second screen');
  second.addComponent('screen', { screenSpace: true, scaleMode: pc.SCALEMODE_BLEND, referenceResolution: [640, 400], scaleBlend: 1, priority: 0 });
  ui.app.root.addChild(second);
  ui.screen.screen!.priority = 0;
  const a = addElement(ui.screen, 'screen A', { width: 130, height: 90, color: color(COL.accent) }, [150, 40]);
  addText(ui, a, 'screen A', { fontSize: 22, color: color('#161820') });
  const b = addElement(second, 'screen B', { width: 130, height: 90, color: color('#a78bfa') }, [190, 0]);
  addText(ui, b, 'screen B', { fontSize: 22, color: color('#161820') });
  const note = addText(ui, ui.screen, '', { fontSize: 18, color: color(COL.dim) }, [170, -90]);

  const bringToFront = (i: number): void => cards[i]!.reparent(stack);
  const swap = (bOnTop: boolean): void => {
    second.screen!.priority = bOnTop ? 10 : 0;
    ui.screen.screen!.priority = bOnTop ? 0 : 10;
    note.element!.text = bOnTop ? 'B priority 10' : 'A priority 10';
  };
  swap(true);

  every(ui.app, 1.6, (n) => {
    bringToFront(n % 3);
    swap(n % 4 < 2);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    cards.forEach((_, i) => panel.button(`Bring card ${i + 1} to front`, () => bringToFront(i)));
    panel.row();
    panel.button('Screen A on top', () => swap(false));
    panel.button('Screen B on top', () => swap(true));
  }

  return () => ui.dispose();
};

export default mount;
