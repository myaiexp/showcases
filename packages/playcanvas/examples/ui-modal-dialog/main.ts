// Modal dialog: a backdrop with input blocks the HUD until it closes
import type { Mount } from '@/types.ts';
import { addButton, addElement, addGroup, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // The HUD: buttons that must not react while the dialog is open.
  const open = addButton(ui, ui.screen, 'Open dialog', { width: 200, height: 56 }, [0, 90]);
  const other = addButton(ui, ui.screen, 'HUD button', { width: 200, height: 56, tint: COL.blue }, [0, 20]);
  const status = addText(ui, ui.screen, 'HUD clicks: 0', { fontSize: 24, color: color(COL.dim) }, [0, -45]);
  let hudClicks = 0;
  other.button!.on('click', () => (status.element!.text = `HUD clicks: ${++hudClicks}`));

  // The dialog is the last child of the screen, so it is drawn over the HUD and hit first.
  const dialog = addGroup(ui.screen, 'dialog', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0] });
  const backdrop = addElement(dialog, 'backdrop', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color('#000000'), opacity: 0.6, useInput: true });
  // The panel takes input too, so a click on its empty area does not reach the backdrop.
  addElement(dialog, 'panel', { width: 340, height: 190, color: color(COL.panel), useInput: true });
  addText(ui, dialog, 'Quit to menu?', { fontSize: 32 }, [0, 40]);
  const ok = addButton(ui, dialog, 'OK', { width: 120, height: 50, tint: COL.green }, [-70, -40]);
  const cancel = addButton(ui, dialog, 'Cancel', { width: 120, height: 50, tint: COL.red }, [70, -40]);

  const close = (): void => void (dialog.enabled = false);
  dialog.enabled = false;
  open.button!.on('click', () => (dialog.enabled = true));
  ok.button!.on('click', close);
  cancel.button!.on('click', close);
  // Clicking outside the panel closes it too.
  backdrop.element!.on('click', close);

  if (ctx.preview) {
    const steps = [...clickSteps(open, 0.2), ...clickSteps(ok, 2.4)].sort((a, b) => a[0] - b[0]);
    timeline(ui.app, 5, steps);
  }

  return () => ui.dispose();
};

export default mount;
