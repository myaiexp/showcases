// Button events in order, and hit padding that grows the clickable area
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addButton, addElement, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';

const EVENTS = ['mouseenter', 'hoverstart', 'mousedown', 'pressedstart', 'mouseup', 'pressedend', 'click', 'hoverend', 'mouseleave'];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // The event log: the last eight events the button fired, newest at the bottom.
  addElement(ui.screen, 'log box', { width: 300, height: 220, color: color(COL.panel) }, [-150, 0]);
  const log = addText(ui, ui.screen, '', {
    fontSize: 20,
    autoWidth: false,
    autoHeight: false,
    width: 270,
    height: 190,
    alignment: [0, 0],
    color: color(COL.green),
  }, [-150, 0]);
  const lines: string[] = [];
  const play = addButton(ui, ui.screen, 'Press me', { width: 190, height: 60 }, [140, 50]);
  for (const name of EVENTS) {
    play.button!.on(name, () => {
      lines.push(name);
      if (lines.length > 8) lines.shift();
      log.element!.text = lines.join('\n');
    });
  }

  // A small close button: its hit area grows by hitPadding on each side, left, bottom, right, top.
  const halo = addElement(ui.screen, 'hit area', { width: 40, height: 40, color: color(COL.blue), opacity: 0.35 }, [140, -70]);
  const close = addButton(ui, ui.screen, '', { width: 40, height: 40, tint: COL.red }, [140, -70]);
  addText(ui, close, 'x', { fontSize: 26, color: color('#ffffff') });
  addText(ui, ui.screen, 'hitPadding', { fontSize: 18, color: color(COL.dim) }, [140, -115]);
  close.button!.on('click', () => {
    lines.push('close: click');
    log.element!.text = lines.slice(-8).join('\n');
  });
  const setPadding = (p: number): void => {
    close.button!.hitPadding = new pc.Vec4(p, p, p, p);
    halo.element!.width = halo.element!.height = 40 + p * 2;
  };
  setPadding(14);

  if (ctx.preview) {
    timeline(ui.app, 3.6, clickSteps(play, 0.3));
  } else {
    const panel = createPanel(el);
    panel.slider('hit padding', 0, 40, 1, 14, setPadding);
    panel.readout('The translucent square is the area that reacts to the pointer.');
  }

  return () => ui.dispose();
};

export default mount;
