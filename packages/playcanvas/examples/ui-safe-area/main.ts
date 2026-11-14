// Safe area: a screen-filling group inset by the page's safe-area margins
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** The browser's safe-area insets in CSS pixels, read through an element padded with env(). */
function readSafeAreaInsets(): Insets {
  const probe = document.createElement('div');
  probe.style.cssText =
    'position: fixed; visibility: hidden; pointer-events: none; ' +
    'padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);';
  document.body.appendChild(probe);
  const style = getComputedStyle(probe);
  const insets = { top: parseFloat(style.paddingTop), right: parseFloat(style.paddingRight), bottom: parseFloat(style.paddingBottom), left: parseFloat(style.paddingLeft) };
  probe.remove();
  return insets;
}

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const { screen } = ui;
  const canvas = ui.stage.canvas;

  // The unsafe strips (a notch, rounded corners, a home indicator), drawn from the screen's edges.
  const strip = (name: string, anchor: number[], pivot: number[]): pc.Entity =>
    addElement(screen, name, { anchor, pivot, margin: [0, 0, 0, 0], color: color(COL.red), opacity: 0.45 });
  const strips = {
    top: strip('top', [0, 1, 1, 1], [0.5, 1]),
    bottom: strip('bottom', [0, 0, 1, 0], [0.5, 0]),
    left: strip('left', [0, 0, 0, 1], [0, 0.5]),
    right: strip('right', [1, 0, 1, 1], [1, 0.5]),
  };

  // Everything that must stay in the safe area hangs below one group that fills the screen.
  const safe = addElement(screen, 'safe area', { type: pc.ELEMENTTYPE_GROUP, anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0] });
  const pause = addElement(safe, 'pause', { anchor: [1, 1, 1, 1], pivot: [1, 1], width: 70, height: 70, color: color(COL.accent) }, [-14, -14]);
  addText(ui, pause, 'II', { fontSize: 30, color: color('#161820') });
  addText(ui, safe, 'Score 1250', { fontSize: 28, anchor: [0, 1, 0, 1], pivot: [0, 1] }, [14, -14]);
  addText(ui, safe, 'inside the safe area', { fontSize: 24, color: color(COL.dim), anchor: [0.5, 0, 0.5, 0], pivot: [0.5, 0] }, [0, 14]);

  const test: Insets = { top: 0, right: 47, bottom: 21, left: 47 };
  let simulate = true;
  let auto = true;
  const apply = (): void => {
    // A card is half the size, so its test insets are too.
    const k = ctx.preview ? 0.5 : 1;
    const insets = simulate ? { top: test.top * k, right: test.right * k, bottom: test.bottom * k, left: test.left * k } : readSafeAreaInsets();
    // Insets are CSS pixels; margins are screen units (one unit = screen.scale drawing-buffer pixels).
    const units = canvas.width / canvas.clientWidth / screen.screen!.scale;
    safe.element!.margin = new pc.Vec4(insets.left * units, insets.bottom * units, insets.right * units, insets.top * units);
    strips.top.element!.height = insets.top * units;
    strips.bottom.element!.height = insets.bottom * units;
    strips.left.element!.width = insets.left * units;
    strips.right.element!.width = insets.right * units;
  };
  apply();
  // The insets change when a phone turns, so read them again whenever the canvas resizes.
  ui.app.graphicsDevice.on('resizecanvas', apply);

  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    const turn = 0.5 + 0.5 * Math.sin(t * 0.8);
    Object.assign(test, { top: 30 * (1 - turn), left: 47 * turn, right: 47 * turn, bottom: 21 + 13 * (1 - turn) });
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    const manual = (key: keyof Insets, v: number): void => {
      auto = false;
      test[key] = v;
      apply();
    };
    for (const key of ['top', 'right', 'bottom', 'left'] as const) panel.slider(key, 0, 80, 1, test[key], (v) => manual(key, v));
    panel.check('simulate insets (off: real browser values)', true, (on) => ((simulate = on), apply()));
    panel.button('Animate', () => (auto = true));
  }

  return () => {
    ui.app.graphicsDevice.off('resizecanvas', apply);
    ui.dispose();
  };
};

export default mount;
