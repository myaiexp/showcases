// Animation: util.animate on a plain number drives many objects at once
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'util.animate is not tied to an object: it counts from startValue to endValue and onChange spreads the number over every bar.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, '');

  const bars = Array.from({ length: 12 }, (_, i) => {
    const bar = new Rect({ left: 30 + i * 27.3, top: 120, width: 18, height: 40, fill: `hsl(${i * 28},70%,52%)`, selectable: false });
    canvas.add(bar);
    return bar;
  });

  let duration = 2400;
  let current: ReturnType<typeof util.animate> | undefined;
  const run = (): void => {
    current = util.animate({
      startValue: 0,
      endValue: Math.PI * 2,
      duration,
      easing: (t, b, c, d) => b + (c * t) / d, // linear
      onChange: (phase) => {
        // a number goes in, twelve heights come out
        bars.forEach((bar, i) => bar.set({ height: 130 + Math.sin(phase * 2 + i * 0.6) * 100 }));
        canvas.requestRenderAll();
        say(`phase ${phase.toFixed(2)}`);
      },
      onComplete: run,
    });
  };
  run();
  // no target here, so the canvas cannot cancel it: stop it with the stage
  stage.onDispose(() => current?.abort());
  if (!stage.preview) {
    slider(stage.bar!, 'duration', 600, 6000, 200, duration, (v) => (duration = v), (v) => `${v} ms`);
  }

  return stage.dispose;
};

export default mount;
