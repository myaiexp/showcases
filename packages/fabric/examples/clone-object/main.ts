// clone() returns a promise of an independent copy with the same properties
import { Canvas, Circle, Rect, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Click an object to select it, then clone it. The copy is a separate object: changing one leaves the other alone.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const original = new Rect({ left: 80, top: 80, width: 70, height: 50, rx: 10, ry: 10, angle: 12, fill: '#3b7dd8', stroke: '#1d4a8c', strokeWidth: 3 });
  const dot = new Circle({ left: 190, top: 80, radius: 26, fill: '#f2b134', stroke: '#a8700a', strokeWidth: 3 });
  canvas.add(original, dot);
  canvas.setActiveObject(original);

  const clones: FabricObject[] = [];
  const cloneIt = async (source: FabricObject): Promise<void> => {
    const copy = await source.clone();
    if (stage.disposed) return;
    copy.set({ left: source.left + 24, top: source.top + 24 });
    copy.set('fill', ['#e94b3c', '#2e9e5b', '#8e5bd6'][clones.length % 3]!);
    copy.setCoords();
    canvas.add(copy);
    clones.push(copy);
    say(`${canvas.getObjects().length} objects, ${clones.length} cloned`);
  };
  say('1 object');

  if (stage.bar) {
    button(stage.bar, 'clone the selection', () => void cloneIt(canvas.getActiveObject() ?? original));
    button(stage.bar, 'remove clones', () => {
      canvas.remove(...clones.splice(0));
      say(`${canvas.getObjects().length} objects`);
    });
  } else {
    stage.every(900, () => {
      if (clones.length >= 5) {
        canvas.remove(...clones.splice(0));
        say(`${canvas.getObjects().length} objects`);
      } else void cloneIt(clones.at(-1) ?? (clones.length % 2 ? dot : original));
    });
  }

  return stage.dispose;
};

export default mount;
