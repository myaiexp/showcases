// Animate: jump to the first frame before the delay
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, replay, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both lanes wait 1.5 s. With jump: true the square is already at the first keyframe while it waits.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const l = lanes(stage, leafer, ['jump: false', 'jump: true']);
  const [off, on] = [runner(l, 0), runner(l, 1)];
  leafer.add([off, on]);
  const mid = Math.round((l.left + l.right) / 2);

  replay(stage, 4800, () => {
    off.killAnimate();
    on.killAnimate();
    off.x = on.x = l.left;
    off.animate([{ x: mid }, { x: l.right }], { duration: 1.5, delay: 1.5, jump: false });
    on.animate([{ x: mid }, { x: l.right }], { duration: 1.5, delay: 1.5, jump: true }); // to the first frame at once, then wait
  });
  return stage.dispose;
};

export default mount;
