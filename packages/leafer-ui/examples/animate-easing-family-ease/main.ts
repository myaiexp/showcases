// Animate: the documented ease easing names run side by side
import { Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { lanes, runner } from '../../shared/event-kit.ts';

const EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Five lanes swing with the same duration: only the easing name changes.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const l = lanes(stage, leafer, EASINGS);
  const squares = EASINGS.map((_, i) => runner(l, i));
  leafer.add(squares);
  // The same slide for every lane; only the easing differs. swing runs it there and back for ever.
  squares.forEach((square, i) => {
    square.animate({ x: l.right }, { easing: EASINGS[i], duration: 1.6, swing: true, loopDelay: 0.25 });
  });
  return stage.dispose;
};

export default mount;
