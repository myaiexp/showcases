// Events: before:render and after:render, with an overlay drawn in after:render
import { Canvas, Circle, Rect, Triangle } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { BLUE, GREEN, RED } from '../../shared/interaction.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The shapes spin, so the canvas repaints every frame. Counters and a bounding-box overlay come from the two render events; renderOnAddRemove off stops add() from repainting.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const spinners = [
    new Rect({ left: 80, top: 120, width: 70, height: 70, fill: RED }),
    new Circle({ left: 180, top: 120, radius: 36, fill: BLUE }),
    new Triangle({ left: 280, top: 120, width: 76, height: 70, fill: GREEN }),
  ];
  canvas.add(...spinners);
  const say = status(stage);

  let before = 0;
  let after = 0;
  let started = 0;
  let took = 0;
  let boxes = true;
  canvas.on('before:render', () => {
    before++;
    started = performance.now();
  });
  // The context handed to after:render is untransformed: apply the viewportTransform first,
  // then each object's own matrix, and draw in the object's local coordinates.
  canvas.on('after:render', ({ ctx }) => {
    after++;
    took = performance.now() - started;
    if (!boxes) return;
    ctx.save();
    ctx.strokeStyle = '#2b2a33';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    for (const o of canvas.getObjects()) {
      ctx.save();
      ctx.transform(...canvas.viewportTransform);
      ctx.transform(...o.calcTransformMatrix());
      ctx.strokeRect(-o.width / 2, -o.height / 2, o.width, o.height);
      ctx.restore();
    }
    ctx.restore();
  });
  const report = (): void =>
    say(
      stage.preview
        ? `before ${before} · after ${after} · ${took.toFixed(1)} ms`
        : `before:render ${before} · after:render ${after} · last paint ${took.toFixed(1)} ms · ${canvas.getObjects().length} objects`,
    );

  stage.loop((_dt, t) => {
    spinners.forEach((o, i) => o.set('angle', t * (30 + i * 25)));
    canvas.requestRenderAll();
    report();
  });

  if (stage.bar) {
    checkbox(stage.bar, 'draw boxes in after:render', true, (v) => (boxes = v));
    checkbox(stage.bar, 'renderOnAddRemove', true, (v) => (canvas.renderOnAddRemove = v));
    button(stage.bar, 'add a circle', () => canvas.add(new Circle({ left: 40 + Math.random() * 280, top: 40 + Math.random() * 160, radius: 14, fill: RED })));
    button(stage.bar, 'remove last', () => void canvas.remove(...canvas.getObjects().slice(-1)));
  }

  return stage.dispose;
};

export default mount;
