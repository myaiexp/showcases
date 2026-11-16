// InnerEditor: a custom inner editor with a handle and a Done button
import { App, Box, DragEvent, PointerEvent, Star, StarData, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { InnerEditor } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, watch } from '../../shared/editor-kit.ts';



let doneButton: Box | undefined; // the running example reads the button to aim its ghost
let onPointDrag: (() => void) | undefined;

class ShowcaseDoneEditor extends InnerEditor {
  override get tag(): string {
    return 'ShowcaseDoneEditor'; // a globally unique name
  }
  declare point: Box;
  declare closeBtn: Box;
  override onCreate(): void {
    // 1. create control points
    this.point = new Box();
    this.closeBtn = new Box({ fill: '#FF4B4B', cornerRadius: 20, around: 'top', cursor: 'pointer', children: [{ tag: 'Text', text: 'Done', fill: 'white', padding: [8, 16] }] });
    this.view.addMany(this.point, this.closeBtn);
    this.eventIds = [
      this.point.on_(DragEvent.DRAG, () => onPointDrag?.()),
      this.closeBtn.on_(PointerEvent.TAP, () => this.editor.closeInnerEditor()), // leave the inner editor
    ];
    doneButton = this.closeBtn;
  }
  override onLoad(): void {
    // 2. load them
    this.point.set({ ...this.editBox.getPointStyle(), strokeWidth: 1 });
    this.editBox.add(this.view);
  }
  override onUpdate(): void {
    // 3. update them
    const { boxBounds, worldTransform } = this.editor.element!;
    const { x, y, height } = boxBounds;
    const { scaleX, scaleY } = worldTransform;
    this.point.set({ x: (x + 50) * Math.abs(scaleX), y: y * Math.abs(scaleY) });
    this.closeBtn.set({ x: (x + 50) * Math.abs(scaleX), y: (y + height) * Math.abs(scaleY) });
  }
  override onUnload(): void {
    this.editBox.remove(this.view); // 4. unload them
  }
  override onDestroy(): void {
    this.point = this.closeBtn = null as never;
    doneButton = undefined;
  }
}
ShowcaseDoneEditor.registerInnerEditor(); // register under the tag

// A Star subclass with its own data class, so setEditInner changes only this class (it rewrites the shared data class otherwise).
class DoneStarData extends StarData {}
class DoneStar extends Star {
  override get __tag(): string {
    return 'DoneStar';
  }
}
DoneStar.registerUI();
DoneStar.registerData(DoneStarData as never);
DoneStar.setEditInner('ShowcaseDoneEditor'); // elements of this class open this inner editor on double-click


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select a star, double-click it, drag the white handle and press Done." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const a = new DoneStar({ editable: true, fill: '#FEB027', x: g.a.x, y: g.a.y, width: g.size, height: g.size });
  const b = new DoneStar({ editable: true, fill: '#FFE04B', x: g.b.x, y: g.b.y, width: g.size, height: g.size });
  app.tree.addMany(a, b);
  stage.onDispose(() => (app.editor.closeInnerEditor(), (onPointDrag = undefined)));
  watch(stage, () => 'innerEditing: ' + app.editor.innerEditing);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(a).x, spot(a).y);
      await stage.wait(700);
      await ghost.doubleTap(spot(a).x, spot(a).y);
      await stage.wait(1200);
      if (doneButton) await ghost.tap(spot(doneButton).x, spot(doneButton).y);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
