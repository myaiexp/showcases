// Animate: autoplay false, then play() when the square is tapped
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import { Animate } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { lanes, runner } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap a square: its animation was built with autoplay: false and plays now.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const l = lanes(stage, leafer, ['rect.animate()', 'new Animate']);
  const [a, b] = [runner(l, 0, { cursor: 'pointer' }), runner(l, 1, { cursor: 'pointer' })] as [Rect, Rect];
  leafer.add([a, b]);

  const options = { duration: 1.5, autoplay: false } as const; // not played until play()
  let animateA: ReturnType<Rect['animate']> | undefined;
  let animateB: Animate | undefined;
  stage.onDispose(() => animateB?.destroy());
  const build = (): void => {
    a.killAnimate();
    animateB?.destroy();
    a.x = b.x = l.left;
    animateA = a.animate({ x: l.right }, options);
    animateB = new Animate(b, { x: l.right }, options);
  };
  build();
  a.on(PointerEvent.TAP, () => animateA?.play());
  b.on(PointerEvent.TAP, () => animateB?.play());

  if (stage.bar) stage.every(7000, build);
  else {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      build();
      await stage.wait(700);
      await ghost.tap(l.left + l.s / 2, l.y(0) + l.s / 2);
      await stage.wait(1900);
      await ghost.tap(l.left + l.s / 2, l.y(1) + l.s / 2);
      await stage.wait(2000);
    });
  }
  return stage.dispose;
};

export default mount;
