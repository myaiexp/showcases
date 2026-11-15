// Button.interactive: off, it ignores the pointer and shows disabled
import { Color } from '@galacean/engine';
import { ColorTransition } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox } from '../../shared/controls.ts';
import { button, ghost, label, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const b = button(canvasEntity, stage.engine, 0, 0, 260, 90, 'Press me', '#ffffff');
  const t = new ColorTransition();
  t.target = b.image;
  t.normal = new Color(0.1, 0.3, 0.7, 1);
  t.hover = new Color(0.2, 0.5, 0.95, 1);
  t.pressed = new Color(0.05, 0.15, 0.4, 1);
  t.disabled = new Color(0.12, 0.12, 0.12, 1);
  t.duration = 0.1;
  b.button.addTransition(t);
  const count = label(canvasEntity, 0, 90, 'clicks: 0', 34).text;
  let clicks = 0;
  b.button.addClicked(() => void (count.text = `clicks: ${++clicks}`));
  const set = (on: boolean): void => {
    b.button.interactive = on;
    say(`interactive = ${on}`);
  };
  set(true);
  if (stage.preview) {
    const g = ghost(stage);
    timeline(canvasEntity, 8, [
      [0.5, () => g.move(0, 0)], [1.2, () => g.down()], [1.5, () => g.up()],
      [2.4, () => set(false)], [3.0, () => g.down()], [3.3, () => g.up()],
      [5.2, () => set(true)], [5.8, () => g.down()], [6.1, () => g.up()], [7, () => g.move(0, -120)],
    ]);
  } else checkbox(stage.bar, 'interactive', true, set);
  return stage.dispose;
};

export default mount;
