// Animate: join false and true on a list of keyframes
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, replay, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both lanes get the keyframes [far right, middle]. Only join: true starts from the left.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const l = lanes(stage, leafer, ['join: false', 'join: true']);
  const [off, on] = [runner(l, 0), runner(l, 1)];
  leafer.add([off, on]);
  const mid = Math.round((l.left + l.right) / 2);

  replay(stage, 3800, () => {
    off.killAnimate();
    on.killAnimate();
    off.x = on.x = l.left;
    off.animate([{ x: l.right }, { x: mid }], { duration: 2.4, join: false }); // jumps to the first keyframe
    on.animate([{ x: l.right }, { x: mid }], { duration: 2.4, join: true }); // starts from the element's own x
  });
  return stage.dispose;
};

export default mount;
