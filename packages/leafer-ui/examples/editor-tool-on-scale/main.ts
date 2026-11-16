// EditTool: overriding onScale to keep the aspect ratio
import { App, Rect, RectData } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditTool, EditorScaleEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pull, r1, watch } from '../../shared/editor-kit.ts';



class ShowcaseUniformTool extends EditTool {
  override get tag(): string {
    return 'ShowcaseUniformTool';
  }
  override onScale(e: EditorScaleEvent): void {
    // every resize, even from an edge handle, scales both axes by the same factor
    super.onScale({ ...e, scaleY: e.scaleX, transform: undefined } as EditorScaleEvent);
  }
}
ShowcaseUniformTool.registerEditTool();

// A Rect subclass with its own data class, so setEditOuter changes only this class (it rewrites the shared data class otherwise).
class UniformRectData extends RectData {}
class UniformRect extends Rect {
  override get __tag(): string {
    return 'UniformRect';
  }
}
UniformRect.registerUI();
UniformRect.registerData(UniformRectData as never);
UniformRect.setEditOuter('ShowcaseUniformTool');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the right-edge handle: the height follows the width." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const a = new UniformRect({ editable: true, fill: '#FEB027', cornerRadius: 20, x: g.a.x + 40, y: g.a.y, width: g.size, height: g.size });
  app.tree.add(a);
  app.editor.select(a);
  watch(stage, () => 'width ' + r1(a.width) + '  height ' + r1(a.height));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      a.set({ x: g.a.x + 40, y: g.a.y, width: g.size, height: g.size });
      app.editor.select(a);
      await stage.wait(600);
      await pull(app, ghost, a, [1, 0.5], [24, 0], undefined, 1000);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
