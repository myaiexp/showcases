// Anchors, pivots and margins: elements that follow, stretch and rotate
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const { app } = ui;

  // The parent resizes; each child is attached to it in a different way.
  const parent = addElement(ui.screen, 'parent', { width: 440, height: 280, color: color(COL.panel) });
  const sq = 44;
  const corner = (name: string, a: number[], tint: string): pc.Entity =>
    addElement(parent, name, { anchor: [...a, ...a], pivot: a, width: sq, height: sq, color: color(tint) });
  // A single-point anchor keeps the element's size and sticks to that point of the parent.
  corner('top-left', [0, 1], COL.red);
  corner('top-right', [1, 1], COL.green);
  corner('bottom-left', [0, 0], COL.blue);
  corner('bottom-right', [1, 0], COL.accent);

  // A split anchor stretches the element; the margins say how far in each edge sits.
  const bar = addElement(parent, 'bar', { anchor: [0, 0.5, 1, 0.5], pivot: [0.5, 0.5], margin: [60, 0, 60, 0], color: color(COL.panelLight) });
  bar.element!.height = 28;
  addText(ui, bar, 'split anchor: 0, 0.5, 1, 0.5', { fontSize: 20, color: color(COL.dim) });

  // The pivot is also the point an element rotates and scales about.
  const spinner = addElement(parent, 'spinner', { anchor: [0.5, 0.5, 0.5, 0.5], pivot: [0, 0], width: 60, height: 60, color: color('#a78bfa') }, [0, 50]);
  addElement(parent, 'pin', { width: 8, height: 8, color: color('#ffffff') }, [0, 50]);

  const state = { w: 440, h: 280, auto: true };
  let t = 0;
  app.on('update', (dt: number) => {
    t += dt;
    if (state.auto) {
      state.w = 340 + 120 * Math.sin(t * 0.8);
      state.h = 220 + 60 * Math.sin(t * 0.6 + 1);
    }
    parent.element!.width = state.w;
    parent.element!.height = state.h;
    spinner.setLocalEulerAngles(0, 0, t * 60);
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('parent width', 200, 600, 5, 440, (v) => ((state.auto = false), (state.w = v)));
    panel.slider('parent height', 160, 360, 5, 280, (v) => ((state.auto = false), (state.h = v)));
    panel.slider('bar margin', 0, 150, 1, 60, (v) => {
      // `margin` copies from a Vec4, so assign a new one.
      bar.element!.margin = new pc.Vec4(v, 0, v, 0);
    });
    panel.button('Animate', () => (state.auto = true));
  }

  return () => ui.dispose();
};

export default mount;
