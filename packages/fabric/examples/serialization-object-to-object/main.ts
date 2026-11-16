// Serialization: rect.toObject() and Rect.fromObject() rebuild one object
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['the original', 'Rect.fromObject(o)'],
    scene: [160, 200],
    hint: 'Move, scale or rotate the original. Its toObject() output is handed to Rect.fromObject(), and the copy on the right is rebuilt from it alone.',
  });
  const [left, right] = stage.panes as [typeof stage.panes[0], typeof stage.panes[0]];
  const source = stage.own(new Canvas(left.el), left);
  const copyCanvas = stage.own(new Canvas(right.el, { selection: false, skipTargetFind: true }), right);
  const say = briefStatus(stage);

  const rect = new Rect({ left: 80, top: 100, width: 70, height: 46, fill: '#8e5bd6', stroke: '#4b2a85', strokeWidth: 4, rx: 8, ry: 8, angle: 20 });
  rect.includeDefaultValues = false; // shorter object
  source.add(rect);

  let token = 0;
  const rebuild = async (): Promise<void> => {
    const mine = ++token;
    const o = rect.toObject(); // a plain object, no methods
    // fromObject returns a promise (it can load images, filters, clip paths); the cast only widens the generics
    const copy = (await Rect.fromObject(o)) as unknown as Rect;
    if (mine !== token || stage.disposed) return;
    copyCanvas.remove(...copyCanvas.getObjects());
    copyCanvas.add(copy);
    say(stage.preview ? `${Object.keys(o).length} keys in o` : JSON.stringify(o));
  };
  source.on({ 'object:moving': rebuild, 'object:scaling': rebuild, 'object:rotating': rebuild, 'object:modified': rebuild });
  void rebuild();

  if (stage.preview) {
    stage.loop((_dt, t) => {
      rect.set({ angle: 20 + t * 40, left: 80 + Math.sin(t * 2) * 25 });
      rect.setCoords();
      source.requestRenderAll();
      void rebuild();
    });
  }

  return stage.dispose;
};

export default mount;
