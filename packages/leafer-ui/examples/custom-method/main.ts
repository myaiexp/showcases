// Custom: add methods such as start and stop
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';

class MethodDemoRect extends Rect {
  override get __tag(): string {
    return 'MethodDemoRect';
  }
  rotating = false; // a plain property: helps the logic, never in JSON
  startAnimate(): void {
    this.rotating = true;
    this.rotateAnimate();
  }
  stopAnimate(): void {
    this.rotating = false;
  }
  rotateAnimate(): void {
    this.nextRender(() => {
      this.rotation = (this.rotation as number) + 1;
      if (this.rotating) this.rotateAnimate();
    });
  }
}
MethodDemoRect.registerUI();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the rect to start and stop the rotation.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.7;
  const custom = new MethodDemoRect({ x: stage.width / 2, y: stage.height / 2 - 12, width: S * 0.5, height: S, around: 'center', fill: '#4B8BFF', draggable: true });
  leafer.add(custom);
  const note = caption(stage, leafer);
  custom.on(PointerEvent.DOWN, () => {
    custom.rotating ? custom.stopAnimate() : custom.startAnimate();
    note.text = `rotating: ${custom.rotating}`;
  });
  note.text = 'press the rect';
  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await ghost.tap(stage.width / 2, stage.height / 2 - 12);
      await stage.wait(2200);
      await ghost.tap(stage.width / 2, stage.height / 2 - 12);
      await stage.wait(1000);
    });
  }
  stage.onDispose(() => custom.stopAnimate());

  return stage.dispose;
};

export default mount;
