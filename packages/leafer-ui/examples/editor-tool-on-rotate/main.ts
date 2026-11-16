// EditTool: overriding onRotate to turn in fixed steps
import { App, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool, EditorRotateEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pull, r1, watch } from '../../shared/editor-kit.ts';


const ROTATE_STEP = 30; // degrees

class ShowcaseStepRotateTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseStepRotateTool';
  }
  carry = 0; // rotation not yet applied
  override onRotate(e: EditorRotateEvent): void {
    this.carry += e.rotation;
    const rotation = Math.trunc(this.carry / ROTATE_STEP) * ROTATE_STEP;
    if (!rotation) return;
    this.carry -= rotation;
    super.onRotate({ ...e, rotation, transform: undefined } as never);
  }
}
ShowcaseStepRotateTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class StepRotateRectData extends RectData {}
class StepRotateRect extends Rect {
  override get __tag(): string {
    return 'StepRotateRect';
  }
}
StepRotateRect.registerUI();
StepRotateRect.registerData(StepRotateRectData as never);
StepRotateRect.setEditOuter('ShowcaseStepRotateTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Ctrl-drag a corner handle: the rect turns in 30 degree steps." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new StepRotateRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x + 40, y: g.a.y, width: g.size, height: g.size });
  app.tree.add(a);
  app.editor.select(a);
  watch(stage, () => 'rotation ' + r1(a.rotation));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      a.set({ rotation: 0 });
      app.editor.select(a);
      await stage.wait(600);
      await pull(app, ghost, a, [1, 1], [-30, 40], { ctrlKey: true }, 1800);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
