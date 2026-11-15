// Script pointer callbacks on a cube with a collider (needs physics)
import { PrimitiveMesh, Script, StaticCollider } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { boxShape, lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { eventLog, ghost, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

let sink: (m: string) => void = () => {};

class Reactive extends Script {
  hover = false;
  down = false;
  clicks = 0;
  dragFrames = 0;
  enter(): void {
    this.hover = true;
    sink('onPointerEnter');
  }
  exit(): void {
    this.hover = false;
    sink('onPointerExit');
  }
  press(): void {
    this.down = true;
    this.dragFrames = 0;
    sink('onPointerDown');
  }
  release(): void {
    this.down = false;
    sink(`onPointerUp${this.dragFrames ? `  (dragged ${this.dragFrames} frames)` : ''}`);
  }
  click(): void {
    this.clicks++;
    sink('onPointerClick');
  }
  // The real callbacks call the same methods the card's scripted cursor does.
  override onPointerEnter(): void {
    this.enter();
  }
  override onPointerExit(): void {
    this.exit();
  }
  override onPointerDown(): void {
    this.press();
  }
  override onPointerUp(): void {
    this.release();
  }
  override onPointerClick(): void {
    this.click();
  }
  override onPointerDrag(): void {
    this.dragFrames++;
  }
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { physics: true, hint: 'Hover, press, click and drag on the cube. The pointer callbacks need a collider on the entity.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6]);
  const material = phong(engine, PALETTE.cyan);
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.6, 1.6, 1.6), material, [0, 0, 0], 'cube');
  cube.addComponent(StaticCollider).addShape(boxShape(1.6, 1.6, 1.6));
  const script = cube.addComponent(Reactive);
  const log = eventLog(stage, 7, 'tr');
  sink = (m) => log.log(m);
  stage.own(() => (sink = () => {}));
  const info = panel(stage, 'bl');
  const cursor = stage.preview ? ghost(stage) : undefined;
  const prev = { hover: false, down: false, drag: false };
  tick(root, (_dt, t) => {
    if (cursor) {
      const k = t % 8;
      const inside = k > 0.8 && k < 6.4;
      const down = (k > 1.8 && k < 2.3) || (k > 3.4 && k < 5.4);
      const dragging = k > 3.9 && k < 5.4;
      const cx = 0.5 + (dragging ? Math.sin((k - 3.9) * 3) * 0.06 : 0);
      cursor.move(k < 0.8 ? 0.15 + k * 0.4 : k > 6.4 ? 0.5 + (k - 6.4) * 0.3 : cx, inside ? 0.5 : 0.2);
      cursor.press(down);
      if (inside && !prev.hover) script.enter();
      if (!inside && prev.hover) script.exit();
      if (down && !prev.down) script.press();
      if (!down && prev.down) {
        script.release();
        if (!prev.drag) script.click();
      }
      if (dragging && down) script.dragFrames++;
      Object.assign(prev, { hover: inside, down, drag: dragging });
    }
    material.baseColor.set(script.down ? 1 : script.hover ? 0.9 : 0.3, script.down ? 0.6 : script.hover ? 0.8 : 0.75, script.down ? 0.2 : script.hover ? 0.3 : 0.9, 1);
    cube.transform.rotate(0, script.hover ? 1.2 : 0.2, 0);
    cube.transform.setScale(script.down ? 0.88 : 1, script.down ? 0.88 : 1, script.down ? 0.88 : 1);
    info.text(`hover ${script.hover}  down ${script.down}\nclicks ${script.clicks}  drag frames ${script.dragFrames}`);
  });
  return stage.dispose;
};

export default mount;
