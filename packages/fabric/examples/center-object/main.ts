// Canvas: centerObject, centerObjectH and centerObjectV move an object to the middle of the canvas
import { Canvas, Rect, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The dashed lines mark the canvas centre. Drag the square away, then centre it on one axis or both.' });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage);
  const { width: w, height: h } = stage;

  const guideStyle = { stroke: '#8e5bd6', strokeWidth: 1, strokeDashArray: [4, 4], selectable: false, evented: false };
  canvas.add(
    new Rect({ left: w / 2, top: h / 2, width: 1, height: h, ...guideStyle }),
    new Rect({ left: w / 2, top: h / 2, width: w, height: 1, ...guideStyle }),
  );
  const box = new Rect({ left: w * 0.2, top: h * 0.25, width: 70, height: 70, fill: '#e94b3c', stroke: '#8c2418', strokeWidth: 2 });
  canvas.add(box);

  const done = (label: string): void => {
    box.setCoords();
    say(`${label} → left ${box.left.toFixed(0)}, top ${box.top.toFixed(0)}`);
    canvas.requestRenderAll();
  };
  const scatter = (): void => {
    box.set({ left: w * (0.15 + Math.random() * 0.25), top: h * (0.15 + Math.random() * 0.25) });
    done('moved away');
  };
  const steps: [string, (o: FabricObject) => void][] = [
    ['centerObjectH', (o) => canvas.centerObjectH(o)],
    ['centerObjectV', (o) => canvas.centerObjectV(o)],
    ['centerObject', (o) => canvas.centerObject(o)],
  ];
  done('start');
  if (stage.bar) {
    button(stage.bar, 'move it away', scatter);
    for (const [name, fn] of steps) button(stage.bar, name, () => (fn(box), done(name)));
  } else {
    let i = 0;
    stage.every(900, () => {
      if (i % 2 === 0) scatter();
      else {
        const [name, fn] = steps[(i >> 1) % 3]!;
        fn(box);
        done(name);
      }
      i++;
    });
  }

  return stage.dispose;
};

export default mount;
