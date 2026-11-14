// Text wrapping, line limits, justify and shrink-to-fit in a resizable box
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const PARAGRAPH = 'A text element wraps at the width of its box when Wrap Lines is on and Auto Width is off. The last line keeps its alignment.';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  addElement(ui.screen, 'box', { width: 380, height: 220, color: color(COL.panel) }, [-80, 30]);
  const para = addText(ui, ui.screen, PARAGRAPH, {
    fontSize: 22,
    autoWidth: false,
    width: 340,
    wrapLines: true,
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 1],
    alignment: [0, 1],
  }, [-80, 120]);

  // The badge shrinks its font, between maxFontSize and minFontSize, to fit its 150 x 40 rectangle.
  addElement(ui.screen, 'badge', { width: 170, height: 46, color: color(COL.blue) }, [220, 90]);
  const badge = addText(ui, ui.screen, 'Short', {
    autoWidth: false,
    autoHeight: false,
    width: 150,
    height: 40,
    autoFitWidth: true,
    autoFitHeight: true,
    maxFontSize: 32,
    minFontSize: 10,
  }, [220, 90]);
  addText(ui, ui.screen, 'autoFitWidth', { fontSize: 18, color: color(COL.dim) }, [220, 55]);

  const names = ['Short', 'A longer name', 'An extremely long player name'];
  const state = { width: 340, justify: false, maxLines: 0, name: 0, auto: true };
  const apply = (): void => {
    const p = para.element!;
    p.width = state.width;
    p.justify = state.justify;
    // null means no limit; text past a limit is not cut off, it runs on along the last line.
    p.maxLines = state.maxLines || null;
    badge.element!.text = names[state.name]!;
  };
  apply();

  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (!state.auto) return;
    t += dt;
    state.width = 280 + 60 * Math.sin(t * 0.8);
    state.justify = Math.floor(t / 3) % 2 === 1;
    state.name = Math.floor(t / 1.5) % names.length;
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const manual = (): void => {
      state.auto = false;
      apply();
    };
    panel.slider('width', 120, 360, 5, 340, (v) => ((state.width = v), manual()));
    panel.check('justify', false, (on) => ((state.justify = on), manual()));
    panel.slider('max lines (0 = none)', 0, 6, 1, 0, (v) => ((state.maxLines = v), manual()));
    panel.select('badge text', names, names[0]!, (v) => ((state.name = names.indexOf(v)), manual()));
    panel.button('Animate', () => (state.auto = true));
  }

  return () => ui.dispose();
};

export default mount;
