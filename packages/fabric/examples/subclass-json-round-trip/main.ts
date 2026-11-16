// Subclassing: a subclass saved to JSON and restored through classRegistry
import { Canvas, classRegistry, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

class NoteBox extends Rect {
  declare note: string;
  static override type = 'ShowcaseNoteBox';
  static override cacheProperties = [...Rect.cacheProperties, 'note'];

  constructor(options?: Partial<{ note: string }> & Record<string, any>) {
    super({ note: '', ...options } as ConstructorParameters<typeof Rect>[0]); // the cast lets the new property through
  }

  override _render(ctx: CanvasRenderingContext2D): void {
    super._render(ctx);
    ctx.fillStyle = '#2b2a33';
    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.note, 0, 0, this.width - 6);
  }

  // toObject is what JSON.stringify(canvas) uses for this object: add the new property.
  override toObject(propertiesToInclude: any[] = []): any {
    return { ...super.toObject(propertiesToInclude), note: this.note };
  }
}
// Without this line loadFromJSON rejects: "No class registered for ShowcaseNoteBox".
// fromObject is inherited: it calls new NoteBox(options) with the saved properties.
classRegistry.setClass(NoteBox);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'saved JSON'],
    scene: [160, 200],
    hint: 'Save, clear and restore. The last button loads JSON whose type nobody registered: the promise rejects and the canvas is left as it was.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.add(
    new NoteBox({ left: 80, top: 60, width: 110, height: 44, note: 'buy milk', fill: '#fff2a8', stroke: '#b59a1c', strokeWidth: 2 }),
    new NoteBox({ left: 80, top: 130, width: 110, height: 44, note: 'call back', fill: '#c9e8ff', stroke: '#3b7dd8', strokeWidth: 2, angle: -8 }),
  );
  canvas.includeDefaultValues = false;

  let saved: object = canvas.toJSON();
  const save = (): void => {
    saved = canvas.toJSON();
    show(pretty(saved, stage.preview));
    say(`saved, ${canvas.getObjects().length} objects`);
  };
  const restore = async (json: object = saved): Promise<void> => {
    try {
      await canvas.loadFromJSON(json);
      canvas.requestRenderAll();
      if (!stage.disposed) say(`restored ${canvas.getObjects().length} NoteBoxes`);
    } catch (err) {
      if (!stage.disposed) say(err instanceof Error ? err.message : String(err));
    }
  };
  save();

  if (stage.bar) {
    button(stage.bar, 'save', save);
    button(stage.bar, 'clear', () => canvas.clear());
    button(stage.bar, 'restore', () => void restore());
    button(stage.bar, 'load an unregistered type', () => void restore({ objects: [{ type: 'ShowcaseNobody', left: 10, top: 10 }] }));
  } else {
    stage.repeat(async () => {
      await stage.wait(900);
      canvas.clear();
      await stage.wait(700);
      await restore();
      await stage.wait(1000);
    });
  }

  return stage.dispose;
};

export default mount;
