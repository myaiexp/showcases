// Text typewriter: reveal a line with rangeStart and rangeEnd
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const LINES = ['It is dangerous to go alone.', 'Take this lantern with you!', 'The cave to the north is unlit.'];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  addElement(ui.screen, 'dialog', { width: 520, height: 150, color: color(COL.panel) }, [0, -10]);
  const dialog = addText(ui, ui.screen, LINES[0]!, {
    fontSize: 30,
    autoWidth: false,
    width: 470,
    wrapLines: true,
    pivot: [0.5, 1],
    alignment: [0, 1],
  }, [0, 45]);

  const state = { index: 0, shown: 0, length: 0, speed: 20, hold: 0 };
  const next = (): void => {
    // Changing the text resets the range to all of it, so rangeEnd now reads the length.
    dialog.element!.text = LINES[state.index % LINES.length]!;
    state.length = dialog.element!.rangeEnd;
    state.shown = 0;
    dialog.element!.rangeEnd = 0;
  };
  next();

  ui.app.on('update', (dt: number) => {
    if (state.shown < state.length) {
      state.shown = Math.min(state.shown + dt * state.speed, state.length);
      // The range changes without laying the text out again.
      dialog.element!.rangeEnd = Math.floor(state.shown);
      state.hold = 1.4;
    } else if ((state.hold -= dt) < 0) {
      state.index++;
      next();
    }
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('characters per second', 5, 80, 1, 20, (v) => (state.speed = v));
    panel.button('Next line', () => {
      state.index++;
      next();
    });
  }

  return () => ui.dispose();
};

export default mount;
