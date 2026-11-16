// Objects: the stacking order is the order of canvas.getObjects(); bringObjectToFront and friends change it
import { Canvas, Rect, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [300, 200],
    hint: 'Click a square to pick it (the first is picked at the start), then use the buttons. The readout lists the stack from back to front.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);

  const colors = { red: '#e94b3c', blue: '#3b7dd8', green: '#2e9e5b', amber: '#f2b134' };
  const names = new Map<FabricObject, string>();
  Object.entries(colors).forEach(([name, fill], i) => {
    const r = new Rect({ left: 95 + i * 36, top: 85 + (i % 2) * 30, width: 90, height: 90, fill, stroke: '#00000055', strokeWidth: 2 });
    names.set(r, name);
    canvas.add(r);
  });
  const [first] = canvas.getObjects();
  canvas.setActiveObject(first!);

  const report = (): void => say(canvas.getObjects().map((o) => names.get(o)).join(' < '));
  const act = (fn: (o: FabricObject) => void): void => {
    const target = canvas.getActiveObject() ?? first!;
    fn(target);
    canvas.requestRenderAll();
    report();
  };
  report();
  canvas.on('selection:created', report);

  if (stage.bar) {
    button(stage.bar, 'sendObjectToBack', () => act((o) => canvas.sendObjectToBack(o)));
    button(stage.bar, 'sendObjectBackwards', () => act((o) => canvas.sendObjectBackwards(o)));
    button(stage.bar, 'bringObjectForward', () => act((o) => canvas.bringObjectForward(o)));
    button(stage.bar, 'bringObjectToFront', () => act((o) => canvas.bringObjectToFront(o)));
    button(stage.bar, 'moveObjectTo(o, 1)', () => act((o) => canvas.moveObjectTo(o, 1)));
  } else {
    const moves: ((o: FabricObject) => void)[] = [
      (o) => canvas.bringObjectToFront(o),
      (o) => canvas.sendObjectBackwards(o),
      (o) => canvas.moveObjectTo(o, 1),
      (o) => canvas.sendObjectToBack(o),
      (o) => canvas.bringObjectForward(o),
    ];
    let i = 0;
    stage.every(1000, () => act(moves[i++ % moves.length]!));
  }

  return stage.dispose;
};

export default mount;
