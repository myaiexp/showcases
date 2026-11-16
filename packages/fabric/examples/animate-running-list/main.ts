// runningAnimations lists live animations; cancel them by target or canvas
import { Canvas, Circle, runningAnimations } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'runningAnimations is page-wide: it also holds animations of other canvases. Filter by canvas before you count.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const dots = ['#e94b3c', '#3b7dd8', '#2e9e5b'].map((fill, i) => {
    const dot = new Circle({ left: 40, top: 55 + i * 65, radius: 18, fill });
    canvas.add(dot);
    return dot;
  });

  // each dot bounces forever: the onComplete starts the way back
  const bounce = (dot: Circle, i: number): void => {
    const to = dot.left < 180 ? 320 : 40;
    dot.animate({ left: to }, { duration: 1000 + i * 500, onChange: () => canvas.requestRenderAll(), onComplete: () => bounce(dot, i) });
  };
  const start = (): void => dots.forEach((d, i) => bounce(d, i));

  const mine = (): number => runningAnimations.filter((a) => (a.target as Circle | undefined)?.canvas === canvas).length;
  const report = (): void => say(stage.preview ? `running: ${mine()}` : `running on this canvas: ${mine()}   page-wide: ${runningAnimations.length}`);

  start();
  stage.every(200, report);
  if (stage.preview) {
    stage.every(3500, () => {
      runningAnimations.cancelByTarget(dots[1]);
      stage.after(1200, () => runningAnimations.cancelByCanvas(canvas));
      stage.after(2200, start);
    });
  } else {
    button(stage.bar!, 'cancelByTarget(red dot)', () => runningAnimations.cancelByTarget(dots[0]));
    button(stage.bar!, 'cancelByCanvas(canvas)', () => runningAnimations.cancelByCanvas(canvas));
    button(stage.bar!, 'Restart all', () => {
      runningAnimations.cancelByCanvas(canvas);
      start();
    });
  }

  return stage.dispose;
};

export default mount;
