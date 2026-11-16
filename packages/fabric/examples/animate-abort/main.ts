// Animation: stop an animation with context.abort() or an abort callback
import { Canvas, Circle, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'The red square is stopped by calling abort() on its context. The blue circle carries an abort callback that stops it past x = 220.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const square = new Rect({ left: 40, top: 70, width: 40, height: 40, fill: '#e94b3c' });
  const circle = new Circle({ left: 40, top: 160, radius: 20, fill: '#3b7dd8' });
  canvas.add(square, circle);

  const run = (): void => {
    square.set('left', 40);
    circle.set('left', 40);
    // 1. the returned context has abort() and a state: 'pending' | 'running' | 'completed' | 'aborted'
    const { left: byHand } = square.animate({ left: 320 }, { duration: 2000, onChange: () => canvas.requestRenderAll() });
    // 2. abort(value, valueProgress, durationProgress) is asked on every frame; truthy stops the animation
    const { left: byRule } = circle.animate(
      { left: 320 },
      { duration: 2000, onChange: () => canvas.requestRenderAll(), abort: (value) => value > 220 },
    );
    stage.after(stage.preview ? 900 : 1200, () => byHand?.abort());
    stage.after(2200, () => say(stage.preview ? `${byHand?.state} / ${byRule?.state}` : `square: ${byHand?.state} at ${square.left.toFixed(0)}   circle: ${byRule?.state} at ${circle.left.toFixed(0)}`));
  };

  run();
  if (stage.preview) stage.every(3200, run);
  else button(stage.bar!, 'Run again', run);

  return stage.dispose;
};

export default mount;
