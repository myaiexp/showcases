// Layout: move with a transition
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { transitionDemo } from '../../shared/transition-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'move(x, y, transition) animates the shift. Pick the transition argument, then press run.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const at = mid(stage, S, S);
  const home = { x: at.x, y: at.y - 14, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0 };
  const rect = new Rect({ ...home, width: S, height: S, fill: '#32cd79', cornerRadius: 8 });
  leafer.add(new Rect({ ...home, width: S, height: S, stroke: '#bbb', dashPattern: [5, 4], hittable: false }));
  leafer.add(rect);
  transitionDemo(
    stage,
    leafer,
    (arg) => `rect.move(S, 20${arg})`,
    (t) => rect.move(S * 0.8, 20, t),
    () => rect.set(home),
  );

  return stage.dispose;
};

export default mount;
