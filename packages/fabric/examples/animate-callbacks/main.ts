// Animation: onStart, onChange and onComplete, plus delay and startValue
import { Canvas, Circle, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'onChange gets (value, valueProgress, durationProgress). With an easing that overshoots, the two progress numbers differ.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'idle');

  const ball = new Circle({ left: 50, top: 120, radius: 22, fill: '#2e9e5b' });
  canvas.add(ball);
  let delay = 400;

  const play = (): void => {
    const from = 50, to = 310;
    ball.set({ left: from, fill: '#2e9e5b' });
    ball.animate(
      { left: to },
      {
        startValue: from, // where to start from; the current value is the default
        duration: 1300,
        delay,
        easing: util.ease.easeOutBack,
        onStart: () => say('onStart: the delay is over'),
        onChange: (value, valueProgress, durationProgress) => {
          say(`onChange: value ${value.toFixed(0)}  value% ${(valueProgress * 100).toFixed(0)}  time% ${(durationProgress * 100).toFixed(0)}`);
          canvas.requestRenderAll();
        },
        onComplete: (value) => {
          ball.set('fill', '#e94b3c');
          canvas.requestRenderAll();
          say(`onComplete: ended at ${value}`);
        },
      },
    );
    say(`started, waiting ${delay} ms`);
  };

  play();
  if (stage.preview) stage.every(2600, play);
  else {
    slider(stage.bar!, 'delay', 0, 1500, 100, delay, (v) => (delay = v), (v) => `${v} ms`);
    button(stage.bar!, 'Play', play);
  }

  return stage.dispose;
};

export default mount;
