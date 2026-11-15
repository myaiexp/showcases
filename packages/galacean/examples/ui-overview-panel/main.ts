// UI overview: Canvas, UITransform, Image, Text, Button, UIGroup
import { Color, SpriteDrawMode } from '@galacean/engine';
import { ColorTransition, HorizontalAlignmentMode, UIGroup, VerticalAlignmentMode } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { button, ghost, image, label, panelSprite, rect, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx, { hint: 'Use the - and + buttons and the switch.' });
  const { stage, canvasEntity } = ui;
  const e = stage.engine;
  caption(stage, 'Canvas > UITransform > Image + Text + Button, one UIGroup');
  const panel = image(canvasEntity, 0, 0, 420, 270, { sprite: panelSprite(e, '#ffffff'), color: [0.2, 0.26, 0.4, 1] }, 'panel');
  panel.image.drawMode = SpriteDrawMode.Sliced;
  label(panel.entity, 0, 100, 'Settings', 32);
  const volumeText = label(panel.entity, 0, 40, 'volume 5', 30).text;
  let volume = 5;
  const minus = button(panel.entity, e, -110, 40, 70, 56, '-', '#c9582d');
  const plus = button(panel.entity, e, 110, 40, 70, 56, '+', '#3b9d6a');
  const set = (v: number): void => {
    volume = Math.max(0, Math.min(10, v));
    volumeText.text = `volume ${volume}`;
    bar.size.set(10 + volume * 30, 14);
  };
  // A bar anchored to the left edge by UITransform alignment; its width tracks the volume.
  const track = image(panel.entity, 0, -30, 320, 14, { color: [0.12, 0.15, 0.25, 1] }, 'track');
  const fill = image(track.entity, 0, 0, 160, 14, { color: [0.4, 0.8, 0.95, 1] }, 'fill');
  const bar = rect(fill.entity);
  bar.horizontalAlignment = HorizontalAlignmentMode.Left;
  bar.verticalAlignment = VerticalAlignmentMode.Middle;
  bar.alignLeft = 0;
  minus.button.addClicked(() => set(volume - 1));
  plus.button.addClicked(() => set(volume + 1));
  const toggleHolder = panel.entity.createChild('sound');
  const group = toggleHolder.addComponent(UIGroup);
  const sw = button(toggleHolder, e, 0, -90, 190, 54, 'sound on', '#7b5fc4');
  const tint = new ColorTransition();
  tint.target = sw.image;
  tint.normal = new Color(0.22, 0.12, 0.5, 1);
  tint.hover = new Color(0.35, 0.22, 0.7, 1);
  tint.pressed = new Color(0.15, 0.08, 0.35, 1);
  sw.image.color = new Color(1, 1, 1, 1);
  sw.button.addTransition(tint);
  let on = true;
  sw.button.addClicked(() => {
    on = !on;
    sw.text.text = on ? 'sound on' : 'sound off';
    group.alpha = on ? 1 : 0.55;
  });
  set(5);
  if (stage.preview) {
    const g = ghost(stage);
    timeline(canvasEntity, 9, [
      [0.3, () => g.move(110, 40)], [0.8, () => g.down()], [1, () => g.up()], [1.4, () => g.down()], [1.6, () => g.up()],
      [2.4, () => g.move(-110, 40)], [2.9, () => g.down()], [3.1, () => g.up()], [3.5, () => g.down()], [3.7, () => g.up()], [4, () => g.down()], [4.2, () => g.up()],
      [5, () => g.move(0, -90)], [5.5, () => g.down()], [5.7, () => g.up()], [7, () => g.down()], [7.2, () => g.up()], [8, () => g.move(0, -150)],
    ]);
  }
  return stage.dispose;
};

export default mount;
