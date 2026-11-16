// EditTool: overriding onMove to snap moves to a grid
import { App, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool, EditorMoveEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pull, r1, watch } from '../../shared/editor-kit.ts';


const STEP = 20; // grid size in px

class ShowcaseGridTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseGridTool';
  }
  carry = { x: 0, y: 0 }; // movement not yet applied
  override onMove(e: EditorMoveEvent): void {
    this.carry.x += e.moveX;
    this.carry.y += e.moveY;
    const moveX = Math.trunc(this.carry.x / STEP) * STEP;
    const moveY = Math.trunc(this.carry.y / STEP) * STEP;
    if (!moveX && !moveY) return;
    this.carry.x -= moveX;
    this.carry.y -= moveY;
    super.onMove({ ...e, moveX, moveY } as EditorMoveEvent); // the default tool moves the elements
  }
}
ShowcaseGridTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class GridRectData extends RectData {}
class GridRect extends Rect {
  override get __tag(): string {
    return 'GridRect';
  }
}
GridRect.registerUI();
GridRect.registerData(GridRectData as never);
GridRect.setEditOuter('ShowcaseGridTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect: it moves in 20 px steps." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new GridRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  app.tree.add(a);
  app.editor.select(a);
  watch(stage, () => 'x ' + r1(a.x) + '  y ' + r1(a.y));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      a.set({ x: g.a.x, y: g.a.y });
      app.editor.select(a);
      await stage.wait(600);
      await pull(app, ghost, a, [0.5, 0.5], [90, 50], undefined, 1800);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
