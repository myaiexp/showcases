// First interface: a screen, a panel, a label and a counting button
import type { Mount } from '@/types.ts';
import { addButton, addElement, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // The tree is screen > panel > (label, button > text); the hierarchy is the draw order.
  const panel = addElement(ui.screen, 'panel', { width: 420, height: 240, color: color(COL.panel), opacity: 0.95 });
  const label = addText(ui, panel, 'Hello, PlayCanvas!', { fontSize: 36, anchor: [0.5, 1, 0.5, 1], pivot: [0.5, 1] }, [0, -40]);
  const button = addButton(ui, panel, 'Click me', {
    anchor: [0.5, 0, 0.5, 0],
    pivot: [0.5, 0],
    width: 200,
    height: 60,
    button: { hoverTint: color('#ffb273'), pressedTint: color('#cc6614') },
  }, [0, 40]);

  let clicks = 0;
  button.button!.on('click', () => {
    clicks++;
    label.element!.text = `Clicked ${clicks} time${clicks === 1 ? '' : 's'}`;
  });

  // A card has no pointer, so it plays the same hover, press and click on a timer.
  if (ctx.preview) timeline(ui.app, 3, clickSteps(button, 0.3));

  return () => ui.dispose();
};

export default mount;
