// getObjects, item, add, insertAt, remove and clear manage the list of objects
import { Canvas, Circle, Rect, Triangle, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'Each button is one canvas method. The readout is canvas.getObjects(), from the back of the stack to the front.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  let n = 0;
  const make = (): FabricObject => {
    const i = n++;
    const common = { left: 50 + (i % 6) * 40, top: 60 + (i % 3) * 40, fill: ['#e94b3c', '#3b7dd8', '#2e9e5b', '#f2b134'][i % 4]!, stroke: '#00000066', strokeWidth: 2 };
    return [new Rect({ ...common, width: 48, height: 48 }), new Circle({ ...common, radius: 26 }), new Triangle({ ...common, width: 50, height: 50 })][i % 3]!;
  };
  const report = (what: string): void => {
    say(`${what}\ngetObjects(): ${canvas.getObjects().map((o) => o.type).join(', ') || '(empty)'}`);
    canvas.requestRenderAll();
  };
  const actions: [string, () => string][] = [
    ['add(new object)', () => (canvas.add(make()), 'add')],
    ['insertAt(0, …)', () => (canvas.insertAt(0, make()), 'insertAt(0)')],
    ['remove(item(0))', () => {
      const first = canvas.item(0);
      if (first) canvas.remove(first);
      return 'remove(item(0))';
    }],
    ['clear()', () => (canvas.clear(), 'clear')],
  ];
  canvas.add(make(), make());
  report('start');

  if (stage.bar) for (const [label, fn] of actions) button(stage.bar, label, () => report(fn()));
  else {
    const script = [0, 0, 1, 0, 2, 1, 0, 2, 3];
    let i = 0;
    stage.every(800, () => report(actions[script[i++ % script.length]!]![1]()));
  }

  return stage.dispose;
};

export default mount;
