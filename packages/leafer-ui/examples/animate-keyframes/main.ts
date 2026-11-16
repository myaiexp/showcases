// Fun: keyframes with durations, delay, easing, loop and join
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'One loop of four keyframes: bulge, settle, bounce across, spin back.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const rect = new Rect({
    x: u(50),
    y: u(100),
    width: u(100),
    height: u(100),
    cornerRadius: u(50),
    fill: '#32cd79',
    around: 'center',
    animation: {
      keyframes: [
        { style: { x: u(150), scaleX: 2, fill: '#ffcd00' }, duration: 0.5 }, // animate keyframe
        { style: { x: u(50), scaleX: 1, fill: '#ffcd00' }, duration: 0.2 },
        { style: { x: stage.preview ? 200 : 550, cornerRadius: 0, fill: '#ffcd00' }, delay: 0.1, easing: 'bounce-out' },
        { x: u(50), rotation: -720, cornerRadius: u(50) }, // style keyframe
      ],
      duration: 3, // the rest (3 - 0.5 - 0.2 - 0.1) is shared by the keyframes without a duration
      loop: true,
      join: true, // the element's state before the animation joins as the "from" keyframe
    },
  });
  leafer.add(rect);

  return stage.dispose;
};

export default mount;
