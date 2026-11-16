// Animation: keyframe-level swing, loop, easing and autoDuration weights
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Keyframe 1 swings twice, 2 has weight 3 (a third of the rest), 3 loops twice with a bounce.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 50 : 80;
  const far = stage.width - s - 20;
  leafer.add(
    new Rect({
      x: 20,
      y: (stage.height - s) / 2,
      width: s,
      height: s,
      cornerRadius: s / 2,
      fill: GREEN,
      around: 'center',
      animation: {
        keyframes: [
          { style: { x: 20 + far / 3 + s / 2, fill: '#feb027' }, swing: 2, duration: 0.4 },
          { style: { x: 20 + far / 2, scale: 1.6 }, autoDuration: 3, easing: 'back-out' },
          { style: { x: far, scale: 1, rotation: 90 }, loop: 2, easing: 'bounce-out' },
          { x: 20 + s / 2, rotation: 0, fill: GREEN },
        ],
        duration: 6,
        loop: true,
        join: true,
      },
    }),
  );
  return stage.dispose;
};

export default mount;
