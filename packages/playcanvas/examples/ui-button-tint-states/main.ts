// Button tint transition: hover, pressed and inactive tints and fades
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addButton, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';

const FADES = [0, 300, 900];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // Same button three times; only fadeDuration (milliseconds) differs. The tints replace the colour.
  const buttons = FADES.map((fade, i) => {
    const x = (i - 1) * 190;
    const b = addButton(ui, ui.screen, 'Button', {
      width: 160,
      height: 70,
      tint: COL.accent,
      button: { fadeDuration: fade, inactiveTint: color('#5a5f6b') },
    }, [x, 40]);
    addText(ui, ui.screen, `fadeDuration ${fade}`, { fontSize: 20, color: color(COL.dim) }, [x, -10]);
    return b;
  });
  const inactive = addButton(ui, ui.screen, 'Inactive', { width: 160, height: 56, tint: COL.accent, button: { active: false, inactiveTint: color('#5a5f6b') } }, [0, -85]);
  addText(ui, ui.screen, 'active = false', { fontSize: 18, color: color(COL.dim) }, [160, -85]);

  if (ctx.preview) {
    // No pointer in a card: fire the element events the button listens to, as ElementInput would.
    const steps = buttons.flatMap((b) => clickSteps(b, 0.2)).sort((a, b) => a[0] - b[0]);
    timeline(ui.app, 3.2, steps);
  } else {
    const panel = createPanel(el);
    panel.check('active (bottom button)', false, (on) => (inactive.button!.active = on));
    panel.slider('hover tint brightness', 0.8, 1.6, 0.05, 1.25, (v) => {
      for (const b of buttons) b.button!.hoverTint = new pc.Color(Math.min(1, 1 * v), Math.min(1, 0.55 * v), Math.min(1, 0.2 * v));
    });
    panel.readout('Hover and press the buttons with the pointer: the tint blends over the fade duration.');
  }

  return () => ui.dispose();
};

export default mount;
