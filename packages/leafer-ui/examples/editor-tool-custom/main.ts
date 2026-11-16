// EditTool: a custom edit tool with its own control point
import { App, Box, DragEvent, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, watch } from '../../shared/editor-kit.ts';



// The docs' custom edit tool: one control point that follows the element
let onPointDrag: (() => void) | undefined; // the running example's callback (the tool class is page-wide)

class ShowcasePointTool extends EditTool {
  override get tag(): string {
    return 'ShowcasePointTool'; // a globally unique name
  }
  declare point: Box; // declare: a plain field would be reset after the base constructor calls onCreate()
  override onCreate(): void {
    this.view.add((this.point = new Box())); // 1. create control points
    this.eventIds = [this.point.on_(DragEvent.DRAG, () => onPointDrag?.())];
  }
  override onLoad(): void {
    // 2. load them
    this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 });
    this.editBox.add(this.view);
  }
  override onUpdate(): void {
    // 3. update them
    const { boxBounds, worldTransform } = this.editor.element!;
    const { x, y } = boxBounds;
    const { scaleX, scaleY } = worldTransform;
    this.point.set({ x: (x + 15) * Math.abs(scaleX), y: (y + 15) * Math.abs(scaleY) });
  }
  override onUnload(): void {
    this.editBox.remove(this.view); // 4. unload them
  }
  override onDestroy(): void {
    this.point = null as never;
  }
}
ShowcasePointTool.registerEditTool(); // register under the tag

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class ToolRectData extends RectData {}
class ToolRect extends Rect {
  override get __tag(): string {
    return 'ToolRect';
  }
}
ToolRect.registerUI();
ToolRect.registerData(ToolRectData as never);
ToolRect.setEditOuter('ShowcasePointTool'); // elements of this class use the tool

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select a rect and drag the extra white handle near its top-left corner." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new ToolRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  const b = new ToolRect({ editable: true, fill: '#FFE04B', cornerRadius: 20, x: g.b.x, y: g.b.y, width: g.size, height: g.size });
  app.tree.addMany(a, b);
  let drags = 0;
  onPointDrag = () => drags++;
  stage.onDispose(() => (onPointDrag = undefined));
  watch(stage, () => 'editTool: ' + (app.editor.editTool?.tag ?? 'none') + '\ncustom point drag events: ' + drags);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      a.set({ x: g.a.x, y: g.a.y });
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(900);
      const p = spot(a, 0, 0);
      await ghost.drag({ x: p.x + 15, y: p.y + 15 }, { x: p.x + 34, y: p.y + 26 }, 900);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
