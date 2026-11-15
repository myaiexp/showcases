// A UI Button with a click listener: addClicked counts clicks
import { Color } from '@galacean/engine';
import { ColorTransition } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { button, ghost, label, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { hint: 'Click the button.' });
  const { stage, canvasEntity } = ui;
  const count = label(canvasEntity, 0, 90, 'clicks: 0', 40).text;
  const b = button(canvasEntity, stage.engine, 0, -10, 260, 90, 'Click me');
  const tint = new ColorTransition();
  tint.target = b.image;
  tint.normal = new Color(0.1, 0.25, 0.7, 1);
  tint.hover = new Color(0.2, 0.4, 0.95, 1);
  tint.pressed = new Color(0.05, 0.12, 0.4, 1);
  tint.disabled = new Color(0.2, 0.2, 0.2, 1);
  tint.duration = 0.1;
  b.button.addTransition(tint);
  let clicks = 0;
  const clicked = (): void => {
    clicks += 1;
    count.text = `clicks: ${clicks}`;
  };
  b.button.addClicked(clicked);
  if (stage.preview) {
    // No user pointer in a card: a scripted pointer sends real pointer events to the canvas.
    const g = ghost(stage);
    timeline(canvasEntity, 3, [[0.3, () => g.move(120, -90)], [0.8, () => g.move(0, -10)], [1.2, () => g.down()], [1.5, () => g.up()], [2.4, () => g.move(120, -90)]]);
  }
  return stage.dispose;
};

export default mount;
