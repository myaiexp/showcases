// Animation: an array of animations that run together on one element
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three animations stack on one rect: x, fill and rotation each loop at their own pace.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 60 : 90;
  leafer.add(
    new Rect({
      x: 24,
      y: (stage.height - s) / 2,
      width: s,
      height: s,
      around: 'center',
      fill: GREEN,
      cornerRadius: 12,
      animation: [
        { style: { x: stage.width - s - 24 + s / 2 }, duration: 1.6, swing: true, easing: 'sine-in-out' },
        { style: { fill: '#feb027' }, duration: 0.7, swing: true },
        { style: { rotation: 360 }, duration: 2.4, loop: true, easing: 'linear' },
      ],
    }),
  );
  return stage.dispose;
};

export default mount;
