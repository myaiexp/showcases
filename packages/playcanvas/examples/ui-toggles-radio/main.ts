// Toggles and a radio group built from buttons that show or hide a check mark
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addButton, addElement, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // A toggle is a button whose child "check" is shown while it is on.
  const toggle = (label: string, y: number, on: boolean): pc.Entity => {
    const b = addButton(ui, ui.screen, '', { width: 40, height: 40, tint: COL.panelLight }, [-150, y]);
    const check = addElement(b, 'check', { width: 22, height: 22, color: color(COL.green) });
    check.enabled = on;
    addText(ui, ui.screen, label, { fontSize: 26, anchor: [0.5, 0.5, 0.5, 0.5], pivot: [0, 0.5] }, [-120, y]);
    b.button!.on('click', () => (check.enabled = !check.enabled));
    return b;
  };
  const music = toggle('Music', 70, true);
  const sound = toggle('Sound effects', 10, false);

  // A radio group: the same buttons, but a click switches the others off.
  const options = ['Easy', 'Normal', 'Hard'];
  const radios = options.map((name, i) => {
    const b = addButton(ui, ui.screen, '', { width: 40, height: 40, tint: COL.panelLight }, [-150, -60 - i * 50]);
    const check = addElement(b, 'check', { width: 22, height: 22, color: color(COL.accent) });
    check.enabled = i === 1;
    addText(ui, ui.screen, name, { fontSize: 26, anchor: [0.5, 0.5, 0.5, 0.5], pivot: [0, 0.5] }, [-120, -60 - i * 50]);
    return b;
  });
  const choose = (chosen: pc.Entity): void => {
    for (const r of radios) r.findByName('check')!.enabled = r === chosen;
  };
  for (const r of radios) r.button!.on('click', () => choose(r));
  addText(ui, ui.screen, 'toggle: click flips one check', { fontSize: 18, color: color(COL.dim) }, [150, 40]);
  addText(ui, ui.screen, 'radio: one check at a time', { fontSize: 18, color: color(COL.dim) }, [150, -85]);

  // Cards have no pointer: click some of the buttons on a timer.
  if (ctx.preview) {
    // Every toggle and the radio group end the cycle where they started.
    const plan: [pc.Entity, number][] = [[music, 0.2], [radios[2]!, 1.4], [sound, 2.6], [radios[0]!, 3.8], [music, 5], [sound, 6.2], [radios[1]!, 7.4]];
    const steps = plan.flatMap(([b, at]) => clickSteps(b, at)).sort((a, b) => a[0] - b[0]);
    timeline(ui.app, 9, steps);
  }

  return () => ui.dispose();
};

export default mount;
