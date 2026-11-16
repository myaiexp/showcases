// Selection: perPixelTargetFind and targetFindTolerance
import { Canvas, Circle, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { BLUE, GREEN, nameIt, who } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'Move over the hollow of the ring and the empty corners of the triangle box. Per-pixel finding ignores them; tolerance catches pixels just outside the shape.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const ring = nameIt(new Circle({ left: 110, top: 120, radius: 50, fill: 'transparent', stroke: BLUE, strokeWidth: 16 }), 'ring');
  const tri = nameIt(new Triangle({ left: 265, top: 120, width: 110, height: 110, fill: GREEN }), 'triangle');
  canvas.add(ring, tri);
  const say = status(stage);

  let over = 'none';
  const report = (): void =>
    say(`${stage.preview ? 'perPixel' : 'perPixelTargetFind'} ${canvas.perPixelTargetFind} · ${stage.preview ? 'tolerance' : 'targetFindTolerance'} ${canvas.targetFindTolerance}\npointer over: ${over}`);
  canvas.on('mouse:move', ({ target }) => {
    over = who(target);
    report();
  });
  canvas.on('mouse:out', () => {
    over = 'none';
    report();
  });
  report();

  if (stage.bar) {
    checkbox(stage.bar, 'perPixelTargetFind', false, (v) => ((canvas.perPixelTargetFind = v), report()));
    slider(stage.bar, 'targetFindTolerance', 0, 20, 1, 0, (v) => (canvas.setTargetFindTolerance(v), report()), (v) => `${v}px`);
  } else {
    const ghost = stage.ghost(canvas);
    const steps: [boolean, number, { x: number; y: number }][] = [
      [false, 0, { x: 110, y: 120 }],
      [true, 0, { x: 110, y: 120 }],
      [true, 0, { x: 176, y: 120 }],
      [true, 12, { x: 176, y: 120 }],
    ];
    stage.repeat(async () => {
      for (const [pp, tol, at] of steps) {
        canvas.perPixelTargetFind = pp;
        canvas.setTargetFindTolerance(tol);
        await ghost.move({ x: at.x, y: at.y + 40 }, 200);
        await ghost.move(at, 400);
        await stage.wait(500);
      }
    }, 200);
  }

  return stage.dispose;
};

export default mount;
