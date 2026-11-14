// Text elements: fontSize, spacing, lineHeight and alignment in a box
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  const cell = (title: string, text: string, x: number, y: number): pc.Entity => {
    addElement(ui.screen, `${title} box`, { width: 250, height: 150, color: color(COL.panel) }, [x, y]);
    addText(ui, ui.screen, title, { fontSize: 18, color: color(COL.dim), anchor: [0.5, 0.5, 0.5, 0.5] }, [x, y + 65]);
    // Auto Width and Auto Height off: the element keeps its own size and the text sits inside it.
    return addText(ui, ui.screen, text, { fontSize: 30, autoWidth: false, autoHeight: false, width: 230, height: 100, wrapLines: true }, [x, y - 8]);
  };
  const size = cell('fontSize', 'Size', -135, 90);
  const spacing = cell('spacing', 'Spacing', 135, 90);
  const lines = cell('lineHeight', 'Two\nlines', -135, -90);
  const align = cell('alignment', 'Aligned', 135, -90);

  const state = { size: 30, spacing: 1, lineHeight: 30, ax: 0.5, ay: 0.5, auto: true };
  const apply = (): void => {
    size.element!.fontSize = state.size;
    spacing.element!.spacing = state.spacing;
    lines.element!.lineHeight = state.lineHeight;
    align.element!.alignment = new pc.Vec2(state.ax, state.ay);
  };
  apply();

  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (!state.auto) return;
    t += dt;
    state.size = 34 + 16 * Math.sin(t * 1.5);
    state.spacing = 1.3 + 0.7 * Math.sin(t * 1.5);
    state.lineHeight = 32 + 12 * Math.sin(t * 1.5);
    // The alignment walks the corners and the centre of its box.
    const step = Math.floor(t / 1.2) % 5;
    const [ax, ay] = ([[0, 1], [1, 1], [1, 0], [0, 0], [0.5, 0.5]] as const)[step]!;
    state.ax = ax;
    state.ay = ay;
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const manual = (): void => {
      state.auto = false;
      apply();
    };
    panel.slider('fontSize', 12, 52, 1, 30, (v) => ((state.size = v), manual()));
    panel.slider('spacing', 0.5, 2.5, 0.05, 1, (v) => ((state.spacing = v), manual()));
    panel.slider('lineHeight', 20, 60, 1, 30, (v) => ((state.lineHeight = v), manual()));
    panel.slider('alignment x', 0, 1, 0.5, 0.5, (v) => ((state.ax = v), manual()));
    panel.slider('alignment y', 0, 1, 0.5, 0.5, (v) => ((state.ay = v), manual()));
    panel.button('Animate', () => (state.auto = true));
  }

  return () => ui.dispose();
};

export default mount;
