// Animate: AnimateEasing.register adds an easing the { name, value } form can use
import { Leafer } from 'leafer-ui';
import { AnimateEasing } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, replay, runner } from '../../shared/event-kit.ts';
import { plot } from '../../shared/animate-kit.ts';

const NAME = 'showcase-wobble'; // the registry is page-wide: a name of this example's own

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The second lane uses an easing the example registered: ease-out plus a decaying sine wobble of size 0.12.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  // A factory: it gets the value from { name, value } and returns the easing function (t) => number
  AnimateEasing.register(NAME, (size: number) => (t: number) => 1 - (1 - t) ** 3 + Math.sin(t * Math.PI * 6) * (1 - t) * size);
  stage.onDispose(() => delete (AnimateEasing.list as Record<string, unknown>)[NAME]);
  const wobble = { name: NAME, value: 0.12 };

  const l = lanes(stage, leafer, ['ease-out', NAME]);
  const squares = [runner(l, 0), runner(l, 1)];
  leafer.add(squares);
  const w = stage.preview ? 70 : 130;
  const h = stage.preview ? 44 : 90;
  plot(leafer, AnimateEasing.get('ease-out'), { x: stage.width / 2 - w - 8, y: 14, w, h }, '#8a8a8a');
  plot(leafer, AnimateEasing.get(wobble), { x: stage.width / 2 + 8, y: 14, w, h });

  replay(stage, 2800, () => {
    squares.forEach((square, i) => {
      square.killAnimate();
      square.x = l.left;
      square.animate({ x: l.right }, { duration: 1.8, easing: i ? wobble : 'ease-out' });
    });
  });
  return stage.dispose;
};

export default mount;
