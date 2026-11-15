// Image.raycastEnabled and raycastPadding: where the pointer hits
import { Script, Vector4 } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { ghost, image, label, timeline, uiScene } from '../../shared/ui-kit.ts';

class Hover extends Script {
  hovered = false;
  sync: () => void = () => {};
  override onUpdate(): void {
    this.sync();
  }
  override onPointerEnter(): void {
    this.hovered = true;
  }
  override onPointerExit(): void {
    this.hovered = false;
  }
}

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const target = image(canvasEntity, 0, 0, 240, 150, { color: [0.35, 0.55, 0.9, 1] }, 'target');
  const hover = target.entity.addComponent(Hover);
  const state = label(canvasEntity, 0, -110, '', 22).text;
  // raycastPadding is normalised: (left, bottom, right, top) distances in from the edges.
  target.image.raycastPadding = new Vector4(0.25, 0.25, 0.25, 0.25);
  hover.sync = (): void => {
    if (hover.hovered) target.image.color.set(0.1, 0.6, 0.25, 1);
    else target.image.color.set(0.1, 0.25, 0.6, 1);
    state.text = hover.hovered ? 'pointer is over the image' : 'pointer is not over it';
    say(`raycastEnabled = ${target.image.raycastEnabled}, raycastPadding = ${target.image.raycastPadding.x}`);
  };
  if (stage.preview) {
    const g = ghost(stage);
    // Inside the padded middle, then in the padded margin (no hit), then back in.
    timeline(canvasEntity, 6, [[0.3, () => g.move(-170, 0)], [1.2, () => g.move(-40, 0)], [2.6, () => g.move(100, 20)], [3.6, () => g.move(110, 0)], [4.6, () => g.move(0, 0)]]);
    return stage.dispose;
  }
  checkbox(stage.bar, 'raycastEnabled', true, (v) => (target.image.raycastEnabled = v));
  slider(stage.bar, 'raycastPadding (all sides)', 0, 0.45, 0.01, 0.25, (v) => target.image.raycastPadding.set(v, v, v, v));
  stage.bar.append('Move the pointer over the blue box; the middle answers, the padded margin does not.');
  return stage.dispose;
};

export default mount;
