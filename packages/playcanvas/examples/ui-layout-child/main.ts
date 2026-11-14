// Layout children: min and max sizes, proportions and exclusion
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // A toolbar whose buttons stretch to fill it; layout children change how each one takes part.
  const bar = addElement(ui.screen, 'toolbar', { width: 520, height: 90, color: color(COL.panel) }, [0, 40]);
  const row = addGroup(bar, 'row', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0] });
  row.addComponent('layoutgroup', {
    orientation: pc.ORIENTATION_HORIZONTAL,
    spacing: [8, 0],
    padding: [8, 8, 8, 8],
    widthFitting: pc.FITTING_STRETCH,
    heightFitting: pc.FITTING_STRETCH,
    alignment: [0, 0.5],
  });

  const defs: [string, string, Record<string, unknown> | null][] = [
    ['plain', COL.blue, null],
    ['max 70', COL.green, { maxWidth: 70 }],
    ['x2 share', COL.accent, { fitWidthProportion: 2 }],
    ['min 110', COL.red, { minWidth: 110 }],
  ];
  const items = defs.map(([label, tint, child]) => {
    const item = addElement(row, label, { width: 80, height: 60, color: color(tint) });
    if (child) item.addComponent('layoutchild', child);
    addText(ui, item, label, { fontSize: 18, color: color('#161820') });
    return item;
  });
  // Excluded from the layout: keeps its own anchor and position, so it can float above the row.
  const floater = addElement(bar, 'excluded', { width: 90, height: 26, color: color('#a78bfa'), anchor: [1, 1, 1, 1], pivot: [1, 0] }, [-6, 6]);
  floater.addComponent('layoutchild', { excludeFromLayout: true });
  addText(ui, floater, 'excluded', { fontSize: 16, color: color('#161820') });

  addText(ui, ui.screen, 'Layout children of one group:', { fontSize: 22 }, [0, -50]);
  addText(ui, ui.screen, 'maxWidth, fitWidthProportion, minWidth, excludeFromLayout', { fontSize: 18, color: color(COL.dim) }, [0, -80]);

  const state = { w: 520, auto: true };
  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (state.auto) {
      t += dt;
      state.w = 420 + 100 * Math.sin(t * 0.8);
    }
    bar.element!.width = state.w;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('toolbar width', 260, 600, 5, 520, (v) => ((state.auto = false), (state.w = v)));
    panel.slider('x2 share proportion', 0.5, 4, 0.1, 2, (v) => (items[2]!.layoutchild!.fitWidthProportion = v));
    panel.slider('max width of "max 70"', 40, 200, 1, 70, (v) => (items[1]!.layoutchild!.maxWidth = v));
    panel.button('Animate', () => (state.auto = true));
  }

  return () => ui.dispose();
};

export default mount;
