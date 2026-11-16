// Animation: object.animate() tweens one property and returns its context
import { Canvas, Rect, util } from 'fabric';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { status } from '../../shared/status.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    scene: [360, 240],
    hint: 'animate() changes the value only: onChange has to ask the canvas to redraw each frame.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const say = status(stage, 'left 70');

  const rect = new Rect({ left: 70, top: 120, width: 70, height: 70, fill: '#e94b3c' });
  canvas.add(rect);

  // animate({ property: endValue }, options) starts from the current value and returns { property: context }
  const slide = (): void => {
    const to = rect.left < 180 ? 290 : 70;
    const { left } = rect.animate(
      { left: to },
      {
        duration: 900,
        easing: util.ease.easeInOutCubic,
        onChange: (value) => {
          say(`left ${value.toFixed(0)}`);
          canvas.requestRenderAll();
        },
      },
    );
    say(`left -> ${to}, state: ${left?.state}`);
  };

  slide();
  if (stage.preview) stage.every(1500, slide);
  else button(stage.bar!, 'Animate left', slide);

  return stage.dispose;
};

export default mount;
