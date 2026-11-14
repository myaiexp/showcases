// Canvas font: browser-drawn text and emoji with no font file
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const MESSAGES = ['Well done! 🎉', 'Rocket launch 🚀', 'Lucky star ⭐', 'Fresh pizza 🍕', 'Good boy 🐶'];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const font = ui.font!;

  // A CanvasFont is a bitmap font made from the browser's own fonts. It holds only the characters
  // it was given, so add the emoji with updateTextures before setting text that uses them.
  font.updateTextures(MESSAGES.join(''));

  addElement(ui.screen, 'card', { width: 440, height: 160, color: color(COL.panel) });
  const message = addText(ui, ui.screen, MESSAGES[0]!, { fontSize: 50, color: color('#ffffff') }, [0, 10]);
  addText(ui, ui.screen, 'pc.CanvasFont', { fontSize: 20, color: color(COL.dim) }, [0, -50]);

  let index = 0;
  const show = (i: number): void => {
    index = i % MESSAGES.length;
    message.element!.text = MESSAGES[index]!;
  };
  let t = 0;
  ui.app.on('update', (dt: number) => {
    t += dt;
    if (t > 1.8) {
      t = 0;
      show(index + 1);
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.button('Next message', () => show(index + 1));
    panel.slider('font size', 20, 80, 1, 50, (v) => (message.element!.fontSize = v));
    panel.readout('The text colour is white, so the emoji keep the colours the browser draws them in.');
  }

  return () => ui.dispose();
};

export default mount;
