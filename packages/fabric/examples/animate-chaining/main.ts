// Animation: chain animations by starting the next one from onComplete
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'There is no timeline: a step is an animate() whose onComplete starts the next. A promise wrapper makes the chain read top to bottom.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const rect = new Rect({ left: 60, top: 60, width: 50, height: 50, fill: '#e94b3c' });
  canvas.add(rect);

  // one step = one animation, resolved by onComplete
  const step = (props: Record<string, number>, duration: number, easing = util.ease.easeInOutQuad): Promise<void> =>
    new Promise((resolve) => {
      rect.animate(props, {
        duration,
        easing,
        onChange: () => canvas.requestRenderAll(),
        onComplete: () => resolve(),
      });
    });

  let running = false;
  const sequence = async (): Promise<void> => {
    if (running) return;
    running = true;
    rect.set({ left: 60, top: 60, angle: 0, scaleX: 1, scaleY: 1 });
    const steps: [string, Record<string, number>, number][] = [
      ['1: right', { left: 300 }, 700],
      ['2: down and turn', { top: 180, angle: 90 }, 700],
      ['3: grow', { scaleX: 1.8, scaleY: 1.8 }, 500],
      ['4: left', { left: 60 }, 800],
      ['5: back up', { top: 60, angle: 360, scaleX: 1, scaleY: 1 }, 800],
    ];
    for (const [name, props, ms] of steps) {
      if (stage.disposed) return;
      say(name);
      await step(props, ms);
    }
    say('done');
    running = false;
  };

  void sequence();
  if (stage.preview) stage.every(5000, () => void sequence());
  else button(stage.bar!, 'Play sequence', () => void sequence());

  return stage.dispose;
};

export default mount;
