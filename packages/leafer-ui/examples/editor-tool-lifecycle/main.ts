// EditTool: onCreate, onLoad, onUpdate and onUnload in order
import { App, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pull, spot, watch } from '../../shared/editor-kit.ts';


const counts = { onCreate: 0, onLoad: 0, onUpdate: 0, onUnload: 0 }; // the tool class is page-wide: the running example reads these

class ShowcaseLifecycleTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseLifecycleTool';
  }
  override onCreate(): void {
    counts.onCreate++;
  }
  override onLoad(): void {
    counts.onLoad++;
  }
  override onUpdate(): void {
    counts.onUpdate++;
  }
  override onUnload(): void {
    counts.onUnload++;
  }
}
ShowcaseLifecycleTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class LifecycleRectData extends RectData {}
class LifecycleRect extends Rect {
  override get __tag(): string {
    return 'LifecycleRect';
  }
}
LifecycleRect.registerUI();
LifecycleRect.registerData(LifecycleRectData as never);
LifecycleRect.setEditOuter('ShowcaseLifecycleTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select, drag and deselect the rects and watch the counters." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  Object.assign(counts, { onCreate: 0, onLoad: 0, onUpdate: 0, onUnload: 0 });
  const a = new LifecycleRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  const b = new LifecycleRect({ editable: true, fill: '#FFE04B', cornerRadius: 20, x: g.b.x, y: g.b.y, width: g.size, height: g.size });
  app.tree.addMany(a, b);
  watch(stage, () => 'onCreate ' + counts.onCreate + '  onLoad ' + counts.onLoad + '\nonUpdate ' + counts.onUpdate + '  onUnload ' + counts.onUnload);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(900);
      await pull(app, ghost, a, [0.5, 0.5], [16, 10], undefined, 700);
      await stage.wait(700);
      await ghost.tap(spot(b).x, spot(b).y);
      await stage.wait(900);
      await ghost.tap(130, 185);
      await stage.wait(900);
      a.set({ x: g.a.x, y: g.a.y });
    });
  }
  return stage.dispose;
};

export default mount;
