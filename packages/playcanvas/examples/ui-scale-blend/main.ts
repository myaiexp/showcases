// Screen scaling: Blend and a reference resolution on a canvas that changes
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx, { ref: [640, 360], blend: 0.5 });
  const { app, screen } = ui;
  const canvas = ui.stage.canvas;
  canvas.style.margin = '0 auto';
  const sc = screen.screen!;

  // Anchored to the screen's edges, so the frame follows the canvas; the square is a fixed 160 units.
  addElement(screen, 'frame', { anchor: [0, 0, 1, 1], margin: [10, 10, 10, 10], color: color(COL.panel) });
  addElement(screen, 'square', { width: 160, height: 160, color: color(COL.accent) });
  const info = addText(ui, screen, '', { fontSize: 26, color: color('#161820') });
  addText(ui, screen, 'top-left', { fontSize: 22, anchor: [0, 1, 0, 1], pivot: [0, 1], color: color(COL.dim) }, [24, -20]);

  const state = { width: 100, mode: 'blend' as 'blend' | 'none', blend: 0.5, auto: true };
  let t = 0;
  app.on('update', (dt: number) => {
    if (state.auto) {
      t += dt;
      state.width = 72 + 28 * Math.sin(t * 0.7);
    }
    // The canvas element gets narrower and wider; the screen resolution follows it.
    canvas.style.width = `${state.width}%`;
    sc.scaleMode = state.mode === 'blend' ? pc.SCALEMODE_BLEND : pc.SCALEMODE_NONE;
    sc.scaleBlend = state.blend;
    info.element!.text = `scale ${sc.scale.toFixed(2)}`;
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.select('scale mode', ['blend', 'none'] as const, 'blend', (v) => (state.mode = v));
    panel.slider('scale blend', 0, 1, 0.05, 0.5, (v) => (state.blend = v));
    panel.slider('canvas width %', 30, 100, 1, 100, (v) => ((state.auto = false), (state.width = v)));
    panel.button('Animate width', () => (state.auto = true));
    panel.readout('Blend: reference resolution 640 x 360. 0 follows the canvas width, 1 its height.');
  }

  return () => ui.dispose();
};

export default mount;
