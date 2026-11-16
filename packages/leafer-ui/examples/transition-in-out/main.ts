// Transition: a quick way into the hover state and a bouncy way out
import { Leafer, Box } from 'leafer-ui';
import '@leafer-in/state'; // the interaction state plugin
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { hoverLoop } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the box and leave it: the way in is quick and linear, the way out bounces.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = stage.preview ? 80 : 120;
  const cx = stage.width / 2;
  const cy = stage.height / 2;
  const box = new Box({
    x: cx - s / 2,
    y: cy - s / 2,
    width: s,
    height: s,
    fill: GREEN,
    cornerRadius: 10,
    origin: 'center',
    hoverStyle: {
      fill: '#FF4B4B',
      scale: 1.4,
      cornerRadius: 40,
      transition: { duration: 0.15, easing: 'linear' }, // into the state
      transitionOut: { duration: 0.9, easing: 'bounce-out' }, // out of the state
    },
  });
  leafer.add(box);
  hoverLoop(stage, leafer, { x: cx, y: cy }, 1000);
  return stage.dispose;
};

export default mount;
