// Element input: enter, leave and click events, with clicks bubbling up
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi, every } from '../../shared/ui.ts';

const ITEMS = ['New game', 'Continue', 'Options', 'Quit'];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // The menu has no input of its own. Events fired on an item bubble up to it anyway.
  const menu = addElement(ui.screen, 'menu', { width: 260, height: 300, color: color(COL.panel) }, [-150, 0]);
  const items = ITEMS.map((name, i) => {
    const item = addElement(menu, name, { width: 220, height: 56, color: color(COL.blue), opacity: 0.6, useInput: true }, [0, 100 - i * 66]);
    addText(ui, item, name, { fontSize: 26 });
    // The pointer events fire on the element component.
    item.element!.on('mouseenter', () => (item.element!.opacity = 1));
    item.element!.on('mouseleave', () => (item.element!.opacity = 0.6));
    return item;
  });

  const status = addText(ui, ui.screen, 'waiting...', {
    fontSize: 24,
    autoWidth: false,
    autoHeight: false,
    width: 270,
    height: 120,
    alignment: [0, 1],
    wrapLines: true,
    color: color(COL.green),
  }, [150, 40]);
  addText(ui, ui.screen, 'menu.element.on("click")', { fontSize: 20, color: color(COL.dim) }, [150, -70]);
  // One listener on the menu hears the clicks of every item; event.element is the one that was hit.
  menu.element!.on('click', (event: pc.ElementMouseEvent | pc.ElementTouchEvent | pc.ElementSelectEvent) => {
    status.element!.text = `clicked: ${event.element.entity.name}`;
  });

  if (ctx.preview) {
    // No pointer in a card: fire the same enter and leave events on one item after another.
    let last: pc.Entity | null = null;
    every(ui.app, 0.9, (n) => {
      last?.element!.fire('mouseleave', {});
      last = items[n % items.length]!;
      last.element!.fire('mouseenter', {});
      status.element!.text = `hover: ${last.name}`;
    });
  } else {
    createPanel(el).readout('Hover and click the items; the menu itself has input off.');
  }

  return () => ui.dispose();
};

export default mount;
