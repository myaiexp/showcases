// Data: set() with a transition animates the change
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { transitionDemo } from '../../shared/transition-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Choose how set() is called: no transition, true, a number of seconds, or an options object. Press run.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const rect = Rect.one({ fill: '#32cd79' }, 20, 20, S, S);
  leafer.add(rect);
  const far = { x: stage.width - S - 20, y: stage.height - S - 50 };
  transitionDemo(
    stage,
    leafer,
    (arg) => `rect.set({ x: ${Math.round(far.x)}, y: ${Math.round(far.y)} }${arg})`,
    (t) => rect.set(far, t),
    () => rect.set({ x: 20, y: 20 }),
  );

  return stage.dispose;
};

export default mount;
