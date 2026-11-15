// Button transitions: ColorTransition, ScaleTransition, SpriteTransition
import { Color } from '@galacean/engine';
import { ColorTransition, ScaleTransition, SpriteTransition } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { button, ghost, label, panelSprite, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { hint: 'Hover and press each button.' });
  const { stage, canvasEntity } = ui;
  const e = stage.engine;
  caption(stage, 'color | scale | sprite transitions, on hover and press');
  const color = button(canvasEntity, e, -230, 0, 190, 90, 'Color', '#ffffff');
  const t1 = new ColorTransition();
  t1.target = color.image;
  t1.normal = new Color(0.1, 0.25, 0.6, 1);
  t1.hover = new Color(0.2, 0.55, 0.9, 1);
  t1.pressed = new Color(0.9, 0.5, 0.1, 1);
  t1.duration = 0.12;
  color.button.addTransition(t1);

  const scale = button(canvasEntity, e, 0, 0, 190, 90, 'Scale', '#3b9d6a');
  const t2 = new ScaleTransition();
  t2.target = scale.image;
  t2.normal = 1;
  t2.hover = 1.15;
  t2.pressed = 0.85;
  t2.duration = 0.12;
  scale.button.addTransition(t2);

  const sprite = button(canvasEntity, e, 230, 0, 190, 90, 'Sprite', '#ffffff');
  const t3 = new SpriteTransition();
  t3.target = sprite.image;
  t3.normal = panelSprite(e, '#6b4fb8');
  t3.hover = panelSprite(e, '#9a7be8');
  t3.pressed = panelSprite(e, '#3d2a7a');
  t3.duration = 0.1;
  sprite.button.addTransition(t3);
  label(canvasEntity, 0, -110, 'normal / hover / pressed', 22);
  for (const b of [color, scale, sprite]) b.image.color = new Color(1, 1, 1, 1);
  if (stage.preview) {
    const g = ghost(stage);
    const xs = [-230, 0, 230];
    const ev: [number, () => void][] = [];
    xs.forEach((x, i) => ev.push([i * 2 + 0.2, () => g.move(x, 0)], [i * 2 + 0.9, () => g.down()], [i * 2 + 1.4, () => g.up()]));
    ev.push([6.4, () => g.move(0, -140)]);
    timeline(canvasEntity, 7, ev);
  }
  return stage.dispose;
};

export default mount;
